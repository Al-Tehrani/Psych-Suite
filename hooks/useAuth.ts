import { useState, useEffect, useCallback } from 'react';

export interface User {
    username: string;
    passwordHash: string;
}

interface UsersData {
    [username: string]: {
        passwordHash: string;
    };
}

// Simple hash function (in production, use a proper hashing library)
const hashPassword = (password: string): string => {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
};

const getUsersData = (): UsersData => {
    try {
        const item = window.localStorage.getItem('users');
        return item ? JSON.parse(item) : {};
    } catch (error) {
        console.error(error);
        return {};
    }
};

const saveUsersData = (users: UsersData) => {
    try {
        window.localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error('Failed to save users data:', error);
    }
};

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<string | null>(() => {
        // Check if user is already logged in
        try {
            const storedUser = window.localStorage.getItem('currentUser');
            return storedUser || null;
        } catch (error) {
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Listen for storage changes to update current user (for cross-tab updates)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'currentUser') {
                setCurrentUser(e.newValue || null);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const signUp = useCallback((username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        
        return new Promise((resolve) => {
            try {
                const users = getUsersData();
                
                // Check if username already exists
                if (users[username]) {
                    setError('Username already exists. Please choose a different one.');
                    setIsLoading(false);
                    resolve(false);
                    return;
                }

                // Validate username and password
                if (username.length < 3) {
                    setError('Username must be at least 3 characters long.');
                    setIsLoading(false);
                    resolve(false);
                    return;
                }

                if (password.length < 6) {
                    setError('Password must be at least 6 characters long.');
                    setIsLoading(false);
                    resolve(false);
                    return;
                }

                // Create new user
                const passwordHash = hashPassword(password);
                users[username] = { passwordHash };
                saveUsersData(users);

                // Log in the new user - set both localStorage and state
                window.localStorage.setItem('currentUser', username);
                setCurrentUser(username);
                setIsLoading(false);
                resolve(true);
            } catch (err) {
                setError('Failed to create account. Please try again.');
                setIsLoading(false);
                resolve(false);
            }
        });
    }, []);

    const signIn = useCallback((username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        
        return new Promise((resolve) => {
            try {
                const users = getUsersData();
                const user = users[username];

                if (!user) {
                    setError('Username not found. Please check your username or sign up.');
                    setIsLoading(false);
                    resolve(false);
                    return;
                }

                const passwordHash = hashPassword(password);
                if (user.passwordHash !== passwordHash) {
                    setError('Incorrect password. Please try again.');
                    setIsLoading(false);
                    resolve(false);
                    return;
                }

                // Log in the user - set both localStorage and state
                window.localStorage.setItem('currentUser', username);
                setCurrentUser(username);
                setIsLoading(false);
                resolve(true);
            } catch (err) {
                setError('Failed to sign in. Please try again.');
                setIsLoading(false);
                resolve(false);
            }
        });
    }, []);

    const signOut = useCallback(() => {
        window.localStorage.removeItem('currentUser');
        setCurrentUser(null);
    }, []);

    return {
        currentUser,
        isLoading,
        error,
        signUp,
        signIn,
        signOut,
        setError
    };
};

