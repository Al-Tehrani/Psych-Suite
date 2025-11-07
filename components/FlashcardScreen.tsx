
import React, { useState, useMemo, useEffect } from 'react';
import { dsm5Data } from '../data/dsm5Data';
import { big5Data } from '../data/big5Data';
import { useLeitnerSystem } from '../hooks/useLeitnerSystem';
import { Flashcard } from '../types';
import Spinner from './Spinner';

const deckNames = [...Object.keys(dsm5Data), ...Object.keys(big5Data)];

const FlashcardScreen: React.FC = () => {
    const [activeDeck, setActiveDeck] = useState<string | null>(null);
    const [sessionCards, setSessionCards] = useState<Flashcard[]>([]);
    const { getDeckStats, generateNewCardsForDeck, getStudySession, isLoading, allDecks } = useLeitnerSystem();
    
    const handleStartSession = (deckName: string) => {
        const stats = getDeckStats(deckName);
        if (stats.total === 0) {
            // If deck is empty, generate cards first, then start session
            generateNewCardsForDeck(deckName).then(() => {
                 setActiveDeck(deckName);
            });
        } else {
            setActiveDeck(deckName);
        }
    };

    useEffect(() => {
        if(activeDeck){
             setSessionCards(getStudySession(activeDeck));
        }
    }, [activeDeck, getStudySession, allDecks])


    if (activeDeck) {
        return (
            <FlashcardPlayer 
                deckName={activeDeck}
                initialCards={sessionCards}
                onExit={() => setActiveDeck(null)}
            />
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Flashcard Decks</h1>
                    <p className="text-gray-600 mt-2">Select a deck to begin a spaced repetition session. The Leitner system helps you study more efficiently by showing you cards right before you're about to forget them.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deckNames.map(deckName => {
                        const stats = getDeckStats(deckName);
                        const hasDueCards = stats.dueCount > 0 || stats.newCount > 0;
                        return (
                            <div key={deckName} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between transition hover:shadow-xl hover:scale-105">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{deckName}</h2>
                                    <div className="text-sm text-gray-500 mt-4 space-y-1">
                                        <p>Total Cards: <span className="font-semibold">{stats.total}</span></p>
                                        <p>Learned: <span className="font-semibold text-green-600">{stats.learnedCount}</span></p>
                                        <p>Due for Review: <span className="font-semibold text-amber-600">{stats.dueCount}</span></p>
                                        <p>New: <span className="font-semibold text-blue-600">{stats.newCount}</span></p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleStartSession(deckName)}
                                    disabled={isLoading}
                                    className={`mt-6 w-full flex justify-center items-center gap-2 font-bold py-2 px-4 rounded-lg shadow-md transition ${!hasDueCards && stats.total > 0 ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                >
                                    {isLoading && <Spinner/>}
                                    {stats.total === 0 ? 'Generate & Study' : (hasDueCards ? 'Start Studying' : 'All Done!')}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

interface FlashcardPlayerProps {
    deckName: string;
    initialCards: Flashcard[];
    onExit: () => void;
}

const FlashcardPlayer: React.FC<FlashcardPlayerProps> = ({ deckName, initialCards, onExit }) => {
    const { updateCardProgress, generateNewCardsForDeck, isLoading } = useLeitnerSystem();
    const [cards, setCards] = useState(initialCards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');

    useEffect(() => {
        setCards(initialCards);
        // Reset state when the deck/cards change to avoid stale state from a previous session
        setCurrentIndex(0);
        setIsFlipped(false);
        setUserAnswer('');
    }, [initialCards]);

    const currentCard = cards[currentIndex];

    const handleNextCard = () => {
        setIsFlipped(false);
        setUserAnswer('');
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
             // End of session by going one index past the end
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handleFeedback = (wasCorrect: boolean) => {
        if(currentCard) {
            updateCardProgress(currentCard.id, wasCorrect);
        }
        handleNextCard();
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-full"><Spinner /> <p className="ml-4 text-lg">Generating new cards...</p></div>;
    }

    // Session is complete when the index is out of bounds and we had cards to begin with
    if (currentIndex >= cards.length && cards.length > 0) {
         return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h2 className="text-3xl font-bold text-gray-800">Session Complete!</h2>
                <p className="text-gray-600 mt-2">You've reviewed all available cards for this deck.</p>
                <button onClick={onExit} className="mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700">
                    Back to Decks
                </button>
            </div>
        );
    }

    // There are no cards to study in this session at all
    if (cards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h2 className="text-2xl font-bold text-gray-800">No Cards to Study</h2>
                <p className="text-gray-600 mt-2">Generate some cards to get started or check back later.</p>
                 <button onClick={() => generateNewCardsForDeck(deckName)} className="mt-6 bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700">
                    Generate 5 Cards
                </button>
                <button onClick={onExit} className="mt-4 text-sm text-gray-600 hover:underline">
                    Back to Decks
                </button>
            </div>
        )
    }

    // This handles the brief moment where cards have been loaded but the currentCard isn't set.
    if (!currentCard) {
        return (
            <div className="flex items-center justify-center h-full">
                <Spinner />
                <p className="ml-4 text-lg">Loading session...</p>
            </div>
        );
    }


    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-100">
            <div className="w-full max-w-2xl mb-4">
                <button onClick={onExit} className="text-sm text-gray-600 hover:underline">← Back to Decks</button>
                 <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(currentIndex / cards.length) * 100}%` }}></div>
                </div>
            </div>

            <div className="w-full max-w-2xl h-[500px]" style={{ perspective: '1000px' }}>
                <div 
                    className="relative w-full h-full transition-transform duration-700"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                    {/* Front of Card */}
                    <div className="absolute w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
                        <div>
                            <p className="text-sm font-semibold text-blue-600">{deckName}</p>
                            <p className="mt-4 text-2xl font-semibold text-gray-800 leading-snug">{currentCard.front}</p>
                        </div>
                        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                           {currentCard.imageUrl ? <img src={currentCard.imageUrl} alt={currentCard.imagePrompt} className="w-full h-full object-cover" /> : <p className="text-gray-400">No image</p>}
                        </div>
                        <div className="flex gap-4">
                             <input 
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                className="flex-grow p-3 border border-gray-300 rounded-lg"
                             />
                            <button onClick={() => setIsFlipped(true)} className="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg">Check Answer</button>
                        </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <div>
                            <p className="text-sm font-semibold text-blue-600">Answer</p>
                            <p className="mt-4 text-2xl font-semibold text-gray-800">{currentCard.back}</p>
                            <hr className="my-6" />
                            <p className="text-sm text-gray-500">Your Answer:</p>
                            <p className="text-lg text-gray-700 italic">{userAnswer || "You didn't enter an answer."}</p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => handleFeedback(false)} className="flex-grow bg-rose-500 text-white font-bold py-3 rounded-lg">I was wrong</button>
                            <button onClick={() => handleFeedback(true)} className="flex-grow bg-teal-500 text-white font-bold py-3 rounded-lg">I was right</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FlashcardScreen;
