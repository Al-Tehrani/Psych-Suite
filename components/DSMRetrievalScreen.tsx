import React, { useState } from 'react';
import { dsm5Data } from '../data/dsm5Data';
import { GeminiFeedback } from '../types';
import { evaluateRetrievalPractice } from '../services/geminiService';
import Spinner from './Spinner';

const DSMRetrievalScreen: React.FC = () => {
    const [selectedDisorder, setSelectedDisorder] = useState<string>(Object.keys(dsm5Data)[0]);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<GeminiFeedback | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!userInput.trim() || !selectedDisorder) return;
        setIsLoading(true);
        setError(null);
        setFeedback(null);
        try {
            const disorderData = dsm5Data[selectedDisorder];
            const result = await evaluateRetrievalPractice(selectedDisorder, disorderData, userInput);
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
                    <h1 className="text-3xl font-bold text-gray-900">Retrieval Practice: DSM-5</h1>
                    <p className="text-gray-600 mt-2">Strengthen your memory by actively recalling diagnostic criteria. Select a disorder, type everything you can remember about its criteria, and get instant AI-powered feedback.</p>

                    <div className="mt-6">
                        <label htmlFor="disorder-select" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Disorder
                        </label>
                        <select
                            id="disorder-select"
                            value={selectedDisorder}
                            onChange={(e) => {
                                setSelectedDisorder(e.target.value);
                                setFeedback(null);
                                setUserInput('');
                                setError(null);
                            }}
                            className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-semibold transition-colors duration-200"
                        >
                            {Object.keys(dsm5Data).map(disorder => (
                                <option key={disorder} value={disorder}>{disorder}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="criteria-input" className="block text-sm font-medium text-gray-700 mb-2">
                            Recall Diagnostic Criteria
                        </label>
                        <textarea
                            id="criteria-input"
                            rows={8}
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder={`e.g., "Patient must show at least two symptoms like delusions or hallucinations for one month..."`}
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
                                            <p className="mt-1 text-xs text-gray-500">Matches: "{item.officialCriterion}"</p>
                                        </li>
                                    ))}
                                    {feedback.correctlyRecalled.length === 0 && <p className="text-gray-500 text-sm">No criteria were correctly identified.</p>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-rose-700 mb-3">Missed Criteria</h3>
                                <ul className="space-y-3">
                                    {feedback.missedCriteria.map((item, i) => (
                                        <li key={i} className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-rose-900">{item}</li>
                                    ))}
                                    {feedback.missedCriteria.length === 0 && <p className="text-gray-500 text-sm">Great job, you didn't miss any key criteria!</p>}
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

export default DSMRetrievalScreen;