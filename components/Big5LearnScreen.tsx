
import React, { useState } from 'react';
import { big5Data } from '../data/big5Data';

const Big5LearnScreen: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">The Big Five Personality Traits (OCEAN)</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {Object.entries(big5Data).map(([trait, data]) => (
                    <div key={trait} className="bg-white p-6 rounded-lg shadow-md flex flex-col transition hover:shadow-xl hover:scale-105">
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">{trait}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">{data.description}</p>
                        <div>
                            <h4 className="font-semibold text-green-600">High Scorers Are:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                                {data.positive_correlations.map(c => <li key={c}>{c}</li>)}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-red-600">Low Scorers Are:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                                {data.negative_correlations.map(c => <li key={c}>{c}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Big5LearnScreen;
