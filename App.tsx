
import React, { useState } from 'react';
import { Screen } from './types';
import { SCREENS } from './constants';
import Sidebar from './components/Sidebar';
import DSMLearnScreen from './components/DSMLearnScreen';
import DSMPracticeScreen from './components/DSMPracticeScreen';
import Big5LearnScreen from './components/Big5LearnScreen';
import Big5PracticeScreen from './components/Big5PracticeScreen';
import DSMRetrievalScreen from './components/DSMRetrievalScreen';
import Big5RetrievalScreen from './components/Big5RetrievalScreen';
import FlashcardScreen from './components/FlashcardScreen';

const App: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState<Screen>(SCREENS.DSM_LEARN);

    const renderScreen = () => {
        switch (activeScreen) {
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
            case SCREENS.FLASHCARDS:
                return <FlashcardScreen />;
            default:
                return <DSMLearnScreen />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            <main className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
                {renderScreen()}
            </main>
        </div>
    );
};

export default App;