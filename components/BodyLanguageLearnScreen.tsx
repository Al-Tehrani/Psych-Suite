import React, { useState } from 'react';
import { bodyLanguageData, bodyLanguageConcepts } from '../data/bodyLanguageData';

const BodyLanguageLearnScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

    return (
        <div className="flex-1 flex overflow-hidden">
            <div className="w-1/3 xl:w-1/4 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Body Language</h2>
                </div>
                <div className="overflow-y-auto p-4 space-y-3">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">By Category</h3>
                        {bodyLanguageData.map(category => (
                            <CategoryCard
                                key={category.category}
                                name={category.category}
                                description={category.description}
                                isActive={selectedCategory === category.category}
                                onClick={() => {
                                    setSelectedCategory(category.category);
                                    setSelectedConcept(null);
                                }}
                            />
                        ))}
                    </div>
                    <div className="border-t pt-4 mt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Key Concepts</h3>
                        {Object.keys(bodyLanguageConcepts).map(concept => (
                            <ConceptCard
                                key={concept}
                                name={concept}
                                isActive={selectedConcept === concept}
                                onClick={() => {
                                    setSelectedConcept(concept);
                                    setSelectedCategory(null);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-gray-50 overflow-y-auto p-6 md:p-8">
                {selectedCategory && (
                    <CategoryView categoryName={selectedCategory} />
                )}
                {selectedConcept && (
                    <ConceptView conceptName={selectedConcept} />
                )}
                {!selectedCategory && !selectedConcept && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <img src="https://img.icons8.com/ios/100/d1d5db/body-language.png" alt="Select" className="h-24 w-24 mb-4" />
                        <h3 className="text-xl font-semibold">Select a category or concept to learn more.</h3>
                        <p className="mt-2 max-w-sm">Explore different aspects of body language and non-verbal communication.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const CategoryCard: React.FC<{ name: string; description: string; isActive: boolean; onClick: () => void }> = ({ name, description, isActive, onClick }) => {
    const activeClasses = 'border-blue-500 bg-blue-50 transform scale-[1.02]';
    return (
        <div
            className={`p-4 border-2 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md transition-all ${isActive ? activeClasses : 'border-transparent'}`}
            onClick={onClick}
        >
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600 mt-1">{description.substring(0, 70)}...</p>
        </div>
    );
};

const ConceptCard: React.FC<{ name: string; isActive: boolean; onClick: () => void }> = ({ name, isActive, onClick }) => {
    const activeClasses = 'border-green-500 bg-green-50 transform scale-[1.02]';
    return (
        <div
            className={`p-3 border-2 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md transition-all ${isActive ? activeClasses : 'border-transparent'}`}
            onClick={onClick}
        >
            <h3 className="font-semibold text-base text-gray-800">{name}</h3>
        </div>
    );
};

const CategoryView: React.FC<{ categoryName: string }> = ({ categoryName }) => {
    const category = bodyLanguageData.find(c => c.category === categoryName);
    if (!category) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{category.category}</h2>
            <p className="text-gray-600 mb-6">{category.description}</p>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Body Language Signals</h3>
            <div className="space-y-6">
                {category.signals.map((signal, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">{signal.name}</h4>
                        <p className="text-gray-700 mb-3">{signal.description}</p>
                        <div className="mb-3">
                            <span className="font-semibold text-blue-600">Meaning: </span>
                            <span className="text-gray-700">{signal.meaning}</span>
                        </div>
                        <div className="mb-3">
                            <span className="font-semibold text-green-600">Context: </span>
                            <span className="text-gray-700">{signal.context.join(', ')}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-purple-600">Examples: </span>
                            <ul className="list-disc list-inside text-gray-700 mt-1">
                                {signal.examples.map((example, idx) => (
                                    <li key={idx}>{example}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ConceptView: React.FC<{ conceptName: string }> = ({ conceptName }) => {
    const concept = bodyLanguageConcepts[conceptName];
    if (!concept) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{conceptName}</h2>
            <p className="text-gray-600 mb-6">{concept.description}</p>
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Key Points</h3>
                <ul className="space-y-2">
                    {concept.keyPoints.map((point, i) => (
                        <li key={i} className="p-3 bg-blue-50 rounded-md border-l-4 border-blue-500 text-gray-700">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Examples</h3>
                <ul className="space-y-2">
                    {concept.examples.map((example, i) => (
                        <li key={i} className="p-3 bg-green-50 rounded-md border-l-4 border-green-500 text-gray-700">
                            {example}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BodyLanguageLearnScreen;

