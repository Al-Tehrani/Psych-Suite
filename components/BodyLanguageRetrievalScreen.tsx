import React, { useState } from 'react';
import { bodyLanguageConcepts } from '../data/bodyLanguageData';
import { Big5GeminiFeedback } from '../types';
import { evaluateBig5RetrievalPractice } from '../services/geminiService';
import Spinner from './Spinner';

const BodyLanguageRetrievalScreen: React.FC = () => {
    const [selectedConcept, setSelectedConcept] = useState<string>(Object.keys(bodyLanguageConcepts)[0]);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<Big5GeminiFeedback | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!userInput.trim() || !selectedConcept) return;
        setIsLoading(true);
        setError(null);
        setFeedback(null);
        try {
            const conceptData = bodyLanguageConcepts[selectedConcept];
            // Convert concept data to a format similar to Big5Trait for the evaluation function
            const traitData = {
                description: conceptData.description,
                positive_correlations: conceptData.keyPoints,
                negative_correlations: [],
                comparison_points: {
                    'Key Points': conceptData.keyPoints.join(' '),
                    'Examples': conceptData.examples.join(' ')
                }
            };
            const result = await evaluateBig5RetrievalPractice(selectedConcept, traitData, userInput);
            setFeedback(result);
        } catch (err) {
            setError('An error occurred while getting feedback. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-900">Retrieval Practice: Body Language</h1>
                    <p className="text-gray-600 mt-2">Strengthen your memory by actively recalling body language concepts. Select a concept, type everything you can remember about it, and get instant AI-powered feedback.</p>

                    <div className="mt-6">
                        <label htmlFor="concept-select" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Body Language Concept
                        </label>
                        <select
                            id="concept-select"
                            value={selectedConcept}
                            onChange={(e) => {
                                setSelectedConcept(e.target.value);
                                setFeedback(null);
                                setUserInput('');
                                setError(null);
                            }}
                            className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-semibold transition-colors duration-200"
                        >
                            {Object.keys(bodyLanguageConcepts).map(concept => (
                                <option key={concept} value={concept}>{concept}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="concept-input" className="block text-sm font-medium text-gray-700 mb-2">
                            Recall Concept Details
                        </label>
                        <textarea
                            id="concept-input"
                            rows={8}
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder={`e.g., "Facial expressions reveal true emotions. Microexpressions last very briefly and show concealed feelings..."`}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || !userInput.trim()}
                            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <><Spinner /> Evaluating...</> : 'Get Feedback'}
                        </button>
                    </div>
                </div>

                {error && <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg border border-red-300">{error}</div>}
                
                {feedback && (
                    <div className="mt-6 bg-white p-6 rounded-xl shadow-lg animate-fadeIn">
                        <h2 className="text-2xl font-bold text-gray-800">Feedback Report</h2>
                        
                        <div className="mt-4 text-center">
                            <p className="text-lg text-gray-600">Overall Score</p>
                            <p className="text-6xl font-extrabold text-blue-600">{feedback.score}<span className="text-3xl">%</span></p>
                            <p className="mt-2 text-gray-700 font-medium">{feedback.summary}</p>
                        </div>
                        
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-semibold text-teal-700 mb-3">Correctly Recalled</h3>
                                <ul className="space-y-3">
                                    {feedback.correctlyRecalled.map((item, i) => (
                                        <li key={i} className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                                            <p className="font-semibold text-teal-900">You mentioned:</p>
                                            <p className="text-sm text-gray-700 italic">"{item.userText}"</p>
                                            <p className="mt-1 text-xs text-gray-500">Matches: "{item.officialConcept}"</p>
                                        </li>
                                    ))}
                                    {feedback.correctlyRecalled.length === 0 && <p className="text-gray-500 text-sm">No concepts were correctly identified.</p>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-rose-700 mb-3">Missed Concepts</h3>
                                <ul className="space-y-3">
                                    {feedback.missedConcepts.map((item, i) => (
                                        <li key={i} className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-rose-900">{item}</li>
                                    ))}
                                    {feedback.missedConcepts.length === 0 && <p className="text-gray-500 text-sm">Great job, you didn't miss any key concepts!</p>}
                                </ul>
                            </div>
                        </div>

                        {feedback.incorrectPoints.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold text-amber-700 mb-3">Points to Review</h3>
                                <ul className="space-y-3">
                                    {feedback.incorrectPoints.map((item, i) => (
                                        <li key={i} className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BodyLanguageRetrievalScreen;

