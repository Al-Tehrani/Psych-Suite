
import React from 'react';
import { Screen } from '../types';
import { SCREENS } from '../constants';

interface WelcomeScreenProps {
    setActiveScreen: (screen: Screen) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setActiveScreen }) => {
    const features = [
        {
            icon: "📚",
            title: "Learn",
            description: "Study DSM-5 disorders, Big Five personality traits, and body language concepts with detailed explanations and examples.",
            screens: [SCREENS.DSM_LEARN, SCREENS.BIG5_LEARN, SCREENS.BODY_LANGUAGE_LEARN]
        },
        {
            icon: "✏️",
            title: "Practice",
            description: "Test your knowledge with interactive practice questions. Get AI-powered feedback to improve your understanding.",
            screens: [SCREENS.DSM_PRACTICE, SCREENS.BIG5_PRACTICE, SCREENS.BODY_LANGUAGE_PRACTICE]
        },
        {
            icon: "🧠",
            title: "Retrieval Practice",
            description: "Strengthen your memory through active recall. Practice retrieving information without prompts to enhance long-term retention.",
            screens: [SCREENS.DSM_RETRIEVAL, SCREENS.BIG5_RETRIEVAL, SCREENS.BODY_LANGUAGE_RETRIEVAL]
        },
        {
            icon: "🃏",
            title: "Flashcards",
            description: "Use spaced repetition flashcards to memorize key concepts efficiently. Review cards based on your performance.",
            screens: [SCREENS.FLASHCARDS]
        }
    ];

    const quickStartButtons = [
        { screen: SCREENS.DSM_LEARN, label: "DSM-5 Learning", color: "bg-blue-600 hover:bg-blue-700" },
        { screen: SCREENS.BIG5_LEARN, label: "Big Five Traits", color: "bg-green-600 hover:bg-green-700" },
        { screen: SCREENS.BODY_LANGUAGE_LEARN, label: "Body Language", color: "bg-purple-600 hover:bg-purple-700" },
        { screen: SCREENS.FLASHCARDS, label: "Flashcards", color: "bg-orange-600 hover:bg-orange-700" }
    ];

    return (
        <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                    <img
                        src="https://img.icons8.com/fluency/96/brain.png"
                        alt="Brain Icon"
                        className="h-20 w-20 md:h-24 md:w-24"
                    />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Welcome to Psychopathology Learning Suite
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                    Your comprehensive platform for mastering psychopathology, personality psychology, and non-verbal communication
                </p>
            </div>

            {/* How It Works Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
                    <div className="space-y-4 text-gray-700">
                        <p className="text-lg">
                            This application uses evidence-based learning techniques to help you master complex psychological concepts:
                        </p>
                        <ul className="space-y-3 list-disc list-inside">
                            <li className="text-base">
                                <strong>Active Learning:</strong> Engage with content through interactive exercises rather than passive reading
                            </li>
                            <li className="text-base">
                                <strong>Spaced Repetition:</strong> Review material at optimal intervals to maximize retention
                            </li>
                            <li className="text-base">
                                <strong>Retrieval Practice:</strong> Strengthen memory by actively recalling information without prompts
                            </li>
                            <li className="text-base">
                                <strong>AI-Powered Feedback:</strong> Get personalized feedback on your practice attempts to identify areas for improvement
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-start mb-4">
                                <span className="text-4xl mr-4">{feature.icon}</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Start Section */}
            <div className="max-w-4xl mx-auto mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Quick Start</h2>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <p className="text-gray-700 text-lg mb-6 text-center">
                        Ready to begin? Choose a section to start learning:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {quickStartButtons.map((button, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveScreen(button.screen)}
                                className={`${button.color} text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg`}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation Hint */}
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-gray-500 text-sm">
                    💡 Use the sidebar on the left to navigate between all available sections at any time
                </p>
            </div>
        </div>
    );
};

export default WelcomeScreen;

