import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
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

interface AuthContextType {
    currentUser: string | null;
    isLoading: boolean;
    error: string | null;
    signUp: (username: string, password: string) => Promise<boolean>;
    signIn: (username: string, password: string) => Promise<boolean>;
    signOut: () => void;
    setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<string | null>(() => {
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

    const signUp = useCallback(async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        
        try {
            const users = getUsersData();
            
            // Check if username already exists
            if (users[username]) {
                setError('Username already exists. Please choose a different one.');
                setIsLoading(false);
                return false;
            }

            // Validate username and password
            if (username.length < 3) {
                setError('Username must be at least 3 characters long.');
                setIsLoading(false);
                return false;
            }

            if (password.length < 6) {
                setError('Password must be at least 6 characters long.');
                setIsLoading(false);
                return false;
            }

            // Create new user
            const passwordHash = hashPassword(password);
            users[username] = { passwordHash };
            saveUsersData(users);

            // Log in the new user
            window.localStorage.setItem('currentUser', username);
            setCurrentUser(username);
            setIsLoading(false);
            return true;
        } catch (err) {
            setError('Failed to create account. Please try again.');
            setIsLoading(false);
            return false;
        }
    }, []);

    const signIn = useCallback(async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        
        try {
            const users = getUsersData();
            const user = users[username];

            if (!user) {
                setError('Username not found. Please check your username or sign up.');
                setIsLoading(false);
                return false;
            }

            const passwordHash = hashPassword(password);
            if (user.passwordHash !== passwordHash) {
                setError('Incorrect password. Please try again.');
                setIsLoading(false);
                return false;
            }

            // Log in the user
            window.localStorage.setItem('currentUser', username);
            setCurrentUser(username);
            setIsLoading(false);
            return true;
        } catch (err) {
            setError('Failed to sign in. Please try again.');
            setIsLoading(false);
            return false;
        }
    }, []);

    const signOut = useCallback(() => {
        window.localStorage.removeItem('currentUser');
        setCurrentUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoading,
                error,
                signUp,
                signIn,
                signOut,
                setError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

