
import React, { useState, useEffect } from 'react';
import { dsmPrewrittenGameData } from '../data/quizData';
import { DSMPracticeQuestion } from '../types';

type GameState = 'start' | 'playing' | 'feedback' | 'end';

const DSMPracticeScreen: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('start');
    const [score, setScore] = useState(0);
    const [levelIndex, setLevelIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [hintUsed, setHintUsed] = useState(false);
    const [showHintText, setShowHintText] = useState(false);

    const currentLevel: DSMPracticeQuestion = dsmPrewrittenGameData[levelIndex];

    const startGame = () => {
        setScore(0);
        setLevelIndex(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setHintUsed(false);
        setShowHintText(false);
        setGameState('playing');
    };

    const handleAnswerSelect = (answer: string) => {
        if (gameState === 'playing') {
            setSelectedAnswer(answer);
        }
    };
    
    const handleSubmit = () => {
        if (!selectedAnswer) return;
        const correct = selectedAnswer === currentLevel.correctAnswer;
        setIsCorrect(correct);
        if (correct) {
            setScore(prev => prev + (hintUsed ? 5 : 10));
        }
        setGameState('feedback');
    };

    const handleNextLevel = () => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        setHintUsed(false);
        setShowHintText(false);
        if (levelIndex + 1 < dsmPrewrittenGameData.length) {
            setLevelIndex(prev => prev + 1);
            setGameState('playing');
        } else {
            setGameState('end');
        }
    };
    
    const handleUseHint = () => {
        if (!hintUsed) {
            setHintUsed(true);
        }
        setShowHintText(true);
    };

    const highlightedDescription = () => {
        if (!showHintText) return currentLevel.patientDescription;
        let descHTML = currentLevel.patientDescription;
        currentLevel.cues.forEach(cue => {
            const regex = new RegExp(`(${cue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            descHTML = descHTML.replace(regex, `<strong class="bg-yellow-200 px-1 rounded">$1</strong>`);
        });
        return descHTML;
    };
    
    if (gameState === 'start') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">DSM-5 Psychopathology Challenge</h1>
                <p className="text-gray-600 mb-8 max-w-md">Test your diagnostic skills with challenging case vignettes.</p>
                <button onClick={startGame} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                    Start Challenge
                </button>
            </div>
        );
    }

    if (gameState === 'end') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Challenge Complete!</h1>
                <p className="text-xl text-gray-700 mb-6">Your final score is:</p>
                <div className="text-6xl font-extrabold text-blue-600 mb-8">{score}</div>
                <button onClick={startGame} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700">
                    Play Again
                </button>
            </div>
        );
    }
    
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6 md:p-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Case Study {levelIndex + 1}</h2>
                    <div className="text-lg font-semibold text-blue-600">Score: {score}</div>
                </div>
                <div className="bg-gray-50/70 p-6 rounded-lg mb-6 border">
                    <h3 className="text-lg font-semibold mb-2">Patient Description</h3>
                    <p dangerouslySetInnerHTML={{ __html: highlightedDescription() }} className="text-gray-700 leading-relaxed"></p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {currentLevel.options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleAnswerSelect(option)}
                            className={`w-full text-left p-4 rounded-lg bg-white shadow-md font-medium text-gray-700 border-2 transition-all ${selectedAnswer === option ? 'border-blue-500 bg-blue-50' : 'border-transparent'}`}
                            disabled={gameState === 'feedback'}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                
                {gameState === 'playing' && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                         <button onClick={handleUseHint} className="w-full md:w-auto bg-yellow-400 text-yellow-900 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-yellow-500 disabled:opacity-50" disabled={showHintText}>Show Hint</button>
                         <button onClick={() => setGameState('start')} className="w-full md:w-auto bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600">Quit</button>
                         <button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full md:w-auto bg-green-600 text-white font-bold py-2 px-10 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                    </div>
                )}
                
                {gameState === 'feedback' && (
                    <div className={`p-4 rounded-lg mt-4 animate-fadeIn ${isCorrect ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}>
                        <h4 className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{isCorrect ? 'Correct!' : 'Not Quite.'}</h4>
                        {!isCorrect && <p className="font-semibold text-red-700 mt-1">Correct diagnosis: {currentLevel.correctAnswer}</p>}
                        <p className="mt-2 text-gray-700">{currentLevel.explanation}</p>
                        <button onClick={handleNextLevel} className="w-full bg-blue-600 text-white font-bold py-2 px-10 rounded-lg shadow-md hover:bg-blue-700 mt-4">
                           {levelIndex + 1 < dsmPrewrittenGameData.length ? 'Continue' : 'Finish'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DSMPracticeScreen;
