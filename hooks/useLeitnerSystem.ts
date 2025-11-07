
import { useState, useEffect, useCallback } from 'react';
import { AllDecks, AllFlashcardUserData, Flashcard } from '../types';
import { generateFlashcardsForTopic, generateImageForFlashcard } from '../services/geminiService';

const getInitialState = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(error);
        return defaultValue;
    }
};

const reviewIntervals: { [box: number]: number } = {
    1: 1,  // 1 day
    2: 3,  // 3 days
    3: 7,  // 1 week
    4: 14, // 2 weeks
    5: 30, // 1 month
};

const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const addDays = (dateStr: string, days: number): string => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
};

export const useLeitnerSystem = () => {
    const [allDecks, setAllDecks] = useState<AllDecks>(() => getInitialState('allDecks', {}));
    const [userProgress, setUserProgress] = useState<AllFlashcardUserData>(() => getInitialState('userProgress', {}));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.localStorage.setItem('allDecks', JSON.stringify(allDecks));
    }, [allDecks]);

    useEffect(() => {
        window.localStorage.setItem('userProgress', JSON.stringify(userProgress));
    }, [userProgress]);

    const getDeckStats = useCallback((deckName: string) => {
        const cards = allDecks[deckName] || [];
        const today = getTodayDateString();
        
        let dueCount = 0;
        let learnedCount = 0;
        const newCount = cards.filter(card => !userProgress[card.id]).length;

        cards.forEach(card => {
            const progress = userProgress[card.id];
            if (progress) {
                if (progress.box > 1) {
                    learnedCount++;
                }
                if (progress.nextReviewDate <= today) {
                    dueCount++;
                }
            }
        });

        return {
            total: cards.length,
            newCount,
            dueCount,
            learnedCount
        };
    }, [allDecks, userProgress]);
    
    const generateNewCardsForDeck = useCallback(async (deckName: string) => {
        setIsLoading(true);
        try {
            const existingCards = allDecks[deckName] || [];
            const existingCardIds = existingCards.map(c => c.id);
            const newCardStubs = await generateFlashcardsForTopic(deckName, existingCardIds);

            const newCards: Flashcard[] = await Promise.all(
                newCardStubs.map(async (stub) => {
                    const base64Image = await generateImageForFlashcard(stub.imagePrompt);
                    return {
                        ...stub,
                        deck: deckName,
                        imageUrl: base64Image ? `data:image/png;base64,${base64Image}` : undefined,
                    };
                })
            );
            
            setAllDecks(prev => ({
                ...prev,
                [deckName]: [...(prev[deckName] || []), ...newCards]
            }));
        } catch (error) {
            console.error("Failed to generate new cards:", error);
        } finally {
            setIsLoading(false);
        }
    }, [allDecks]);
    
    const getStudySession = useCallback((deckName: string): Flashcard[] => {
        const cards = allDecks[deckName] || [];
        const today = getTodayDateString();

        const dueCards = cards.filter(card => {
            const progress = userProgress[card.id];
            return progress && progress.nextReviewDate <= today;
        });
        
        const newCards = cards.filter(card => !userProgress[card.id]);

        // Prioritize due cards, then new cards. Limit session size.
        return [...dueCards.sort((a,b) => userProgress[a.id].box - userProgress[b.id].box), ...newCards].slice(0, 10);
        
    }, [allDecks, userProgress]);

    const updateCardProgress = useCallback((cardId: string, wasCorrect: boolean) => {
        setUserProgress(prev => {
            const currentProgress = prev[cardId];
            const currentBox = currentProgress?.box || 0;
            const newBox = wasCorrect ? Math.min(currentBox + 1, 5) : 1;
            
            const reviewInterval = reviewIntervals[newBox];
            const nextReviewDate = addDays(getTodayDateString(), reviewInterval);

            return {
                ...prev,
                [cardId]: {
                    box: newBox,
                    nextReviewDate
                }
            };
        });
    }, []);

    return {
        allDecks,
        userProgress,
        isLoading,
        getDeckStats,
        generateNewCardsForDeck,
        getStudySession,
        updateCardProgress
    };
};
