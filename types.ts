import { SCREENS } from "./constants";

export type Screen = typeof SCREENS[keyof typeof SCREENS];

export interface Criterion {
    text: string;
    key: string;
    highlight?: number;
}

export interface Disorder {
    description: string;
    criteria: Criterion[];
}

export interface Big5Trait {
    description: string;
    positive_correlations: string[];
    negative_correlations: string[];
    comparison_points: {
        [key: string]: string;
    };
}

export interface DSMPracticeQuestion {
    id: number;
    patientDescription: string;
    cues: string[];
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export interface Big5PracticeQuestion {
    prompt: string;
    trait: string;
    correlation: 'positive' | 'negative';
    cues: string[];
}

export interface GeminiFeedback {
    score: number;
    summary: string;
    correctlyRecalled: {
        userText: string;
        officialCriterion: string;
    }[];
    missedCriteria: string[];
    incorrectPoints: string[];
}

export interface Big5GeminiFeedback {
    score: number;
    summary: string;
    correctlyRecalled: {
        userText: string;
        officialConcept: string;
    }[];
    missedConcepts: string[];
    incorrectPoints: string[];
}

export interface Flashcard {
    id: string; 
    deck: string;
    front: string;
    back: string;
    imagePrompt: string;
    imageUrl?: string;
}

export interface CardUserData {
    box: number;
    nextReviewDate: string;
}

export interface AllFlashcardUserData {
    [cardId: string]: CardUserData;
}

export interface AllDecks {
    [deckName: string]: Flashcard[];
}