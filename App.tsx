
import React, { useState, useEffect, useRef } from 'react';
import { Screen } from './types';
import { SCREENS } from './constants';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import DSMLearnScreen from './components/DSMLearnScreen';
import DSMPracticeScreen from './components/DSMPracticeScreen';
import Big5LearnScreen from './components/Big5LearnScreen';
import Big5PracticeScreen from './components/Big5PracticeScreen';
import DSMRetrievalScreen from './components/DSMRetrievalScreen';
import Big5RetrievalScreen from './components/Big5RetrievalScreen';
import BodyLanguageLearnScreen from './components/BodyLanguageLearnScreen';
import BodyLanguagePracticeScreen from './components/BodyLanguagePracticeScreen';
import BodyLanguageRetrievalScreen from './components/BodyLanguageRetrievalScreen';
import FlashcardScreen from './components/FlashcardScreen';

const AppContent: React.FC = () => {
    const { currentUser } = useAuth();
    const [activeScreen, setActiveScreen] = useState<Screen>(SCREENS.WELCOME);
    const prevUserRef = useRef<string | null>(null);

    // Reset to welcome screen whenever user signs in (when currentUser changes from null to a value)
    useEffect(() => {
        if (currentUser && !prevUserRef.current) {
            setActiveScreen(SCREENS.WELCOME);
        }
        prevUserRef.current = currentUser;
    }, [currentUser]);

    const renderScreen = () => {
        switch (activeScreen) {
            case SCREENS.WELCOME:
                return <WelcomeScreen setActiveScreen={setActiveScreen} />;
            case SCREENS.DSM_LEARN:
                return <DSMLearnScreen />;
            case SCREENS.DSM_PRACTICE:
                return <DSMPracticeScreen />;
            case SCREENS.DSM_RETRIEVAL:
                return <DSMRetrievalScreen />;
            case SCREENS.BIG5_LEARN:
                return <Big5LearnScreen />;
            case SCREENS.BIG5_PRACTICE:
                return <Big5PracticeScreen />;
            case SCREENS.BIG5_RETRIEVAL:
                return <Big5RetrievalScreen />;
            case SCREENS.BODY_LANGUAGE_LEARN:
                return <BodyLanguageLearnScreen />;
            case SCREENS.BODY_LANGUAGE_PRACTICE:
                return <BodyLanguagePracticeScreen />;
            case SCREENS.BODY_LANGUAGE_RETRIEVAL:
                return <BodyLanguageRetrievalScreen />;
            case SCREENS.FLASHCARDS:
                return <FlashcardScreen />;
            default:
                return <WelcomeScreen setActiveScreen={setActiveScreen} />;
        }
    };

    // Show login screen if user is not authenticated
    if (!currentUser) {
        return <LoginScreen />;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            <main className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
                {renderScreen()}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;