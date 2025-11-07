import React, { useState } from 'react';
import { big5PrewrittenGameData } from '../data/quizData';
import { Big5PracticeQuestion } from '../types';

type GameState = 'start' | 'playing' | 'feedback' | 'end';

const Big5PracticeScreen: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('start');
    const [score, setScore] = useState(0);
    const [levelIndex, setLevelIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<{ trait: string; correlation: string } | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [hintUsed, setHintUsed] = useState(false);
    const [showHintText, setShowHintText] = useState(false);

    const currentLevel: Big5PracticeQuestion = big5PrewrittenGameData[levelIndex];
    const traits = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];

    const startGame = () => {
        setScore(0);
        setLevelIndex(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setHintUsed(false);
        setShowHintText(false);
        setGameState('playing');
    };
    
    const handleAnswerSelect = (trait: string, correlation: 'positive' | 'negative') => {
        if (gameState === 'playing') {
            setSelectedAnswer({ trait, correlation });
        }
    };
    
    const handleSubmit = () => {
        if (!selectedAnswer) return;
        const correct = selectedAnswer.trait === currentLevel.trait && selectedAnswer.correlation === currentLevel.correlation;
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
        if (levelIndex + 1 < big5PrewrittenGameData.length) {
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
        if (!showHintText) return currentLevel.prompt;
        let descHTML = currentLevel.prompt;
        currentLevel.cues.forEach(cue => {
            const regex = new RegExp(`(${cue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            descHTML = descHTML.replace(regex, `<strong class="bg-yellow-200 px-1 rounded">$1</strong>`);
        });
        return descHTML;
    };

    if (gameState === 'start') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Big-5 Personality Challenge</h1>
                <p className="text-gray-600 mb-8 max-w-md">Test your ability to identify personality traits from behavioral prompts.</p>
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
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6 md:p-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Behavior {levelIndex + 1}</h2>
                    <div className="text-lg font-semibold text-blue-600">Score: {score}</div>
                </div>
                <div className="bg-gray-50/70 p-6 rounded-lg mb-6 border text-center">
                    <p className="text-xl italic text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightedDescription() }}></p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                    {traits.map(trait => (
                        <div key={trait} className="flex flex-col items-center space-y-2">
                            <button
                                onClick={() => handleAnswerSelect(trait, 'positive')}
                                disabled={gameState === 'feedback'}
                                className={`w-16 h-16 rounded-full text-3xl font-bold flex items-center justify-center transition ${selectedAnswer?.trait === trait && selectedAnswer.correlation === 'positive' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                            >+</button>
                            <span className="font-bold text-lg">{trait}</span>
                            <button
                                onClick={() => handleAnswerSelect(trait, 'negative')}
                                disabled={gameState === 'feedback'}
                                className={`w-16 h-16 rounded-full text-3xl font-bold flex items-center justify-center transition ${selectedAnswer?.trait === trait && selectedAnswer.correlation === 'negative' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                            >-</button>
                        </div>
                    ))}
                </div>
                
                {gameState === 'playing' && (
                     <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <button onClick={handleUseHint} className="w-full md:w-auto bg-yellow-400 text-yellow-900 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-yellow-500 disabled:opacity-50" disabled={showHintText}>Show Hint</button>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button onClick={() => setGameState('start')} className="w-full md:w-auto bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600">Quit</button>
                            <button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full md:w-auto bg-green-600 text-white font-bold py-2 px-10 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50">Submit</button>
                        </div>
                    </div>
                )}
               
                {gameState === 'feedback' && (
                    <div className={`p-4 rounded-lg mt-4 animate-fadeIn ${isCorrect ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}>
                        <h4 className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{isCorrect ? 'Correct!' : 'Not Quite.'}</h4>
                        <p className={`mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            This behavior shows a <strong>{currentLevel.correlation}</strong> correlation with <strong>{currentLevel.trait}</strong>.
                        </p>
                        <button onClick={handleNextLevel} className="w-full bg-blue-600 text-white font-bold py-2 px-10 rounded-lg shadow-md hover:bg-blue-700 mt-4">
                            {levelIndex + 1 < big5PrewrittenGameData.length ? 'Next Prompt' : 'Finish'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Big5PracticeScreen;