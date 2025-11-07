
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';
import { SCREENS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
    activeScreen: Screen;
    setActiveScreen: (screen: Screen) => void;
}

const NavLink: React.FC<{
    screen: Screen;
    title: string;
    iconUrl?: string;
    activeScreen: Screen;
    onClick: () => void;
    isSubItem?: boolean;
}> = ({ screen, title, iconUrl, activeScreen, onClick, isSubItem = false }) => {
    const isActive = activeScreen === screen;
    return (
        <a
            href={`#${screen}`}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`flex items-center p-3 md:p-2 my-1 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${isActive ? 'bg-gray-700 text-white' : ''} ${isSubItem ? 'ml-8 md:ml-12' : ''}`}
        >
            {iconUrl && (
                <img src={iconUrl} alt={title} className={`h-6 w-6 transition-all duration-200 ease-in-out ${isActive ? 'grayscale-0 brightness-100' : 'grayscale brightness-200'}`} />
            )}
            <span className={`${iconUrl ? 'ml-4' : ''} font-semibold hidden md:inline ${isSubItem ? 'text-sm' : ''}`}>{title}</span>
        </a>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, setActiveScreen }) => {
    const { currentUser, signOut } = useAuth();
    const [expandedSection, setExpandedSection] = useState<string | null>(() => {
        // Auto-expand the section that contains the active screen
        if (activeScreen === SCREENS.DSM_LEARN || activeScreen === SCREENS.BIG5_LEARN || activeScreen === SCREENS.BODY_LANGUAGE_LEARN) return 'learn';
        if (activeScreen === SCREENS.DSM_PRACTICE || activeScreen === SCREENS.BIG5_PRACTICE || activeScreen === SCREENS.BODY_LANGUAGE_PRACTICE) return 'practice';
        if (activeScreen === SCREENS.DSM_RETRIEVAL || activeScreen === SCREENS.BIG5_RETRIEVAL || activeScreen === SCREENS.BODY_LANGUAGE_RETRIEVAL) return 'retrieval';
        return null;
    });

    const icons = {
        learn: "https://img.icons8.com/ios-filled/50/FFFFFF/book.png",
        practice: "https://img.icons8.com/ios-filled/50/FFFFFF/questions.png",
        retrieval: "https://img.icons8.com/ios-filled/50/FFFFFF/brain.png",
        flashcards: "https://img.icons8.com/ios-filled/50/FFFFFF/stack-of-photos.png"
    };

    // Update expanded section when activeScreen changes
    useEffect(() => {
        if (activeScreen === SCREENS.DSM_LEARN || activeScreen === SCREENS.BIG5_LEARN || activeScreen === SCREENS.BODY_LANGUAGE_LEARN) {
            setExpandedSection('learn');
        } else if (activeScreen === SCREENS.DSM_PRACTICE || activeScreen === SCREENS.BIG5_PRACTICE || activeScreen === SCREENS.BODY_LANGUAGE_PRACTICE) {
            setExpandedSection('practice');
        } else if (activeScreen === SCREENS.DSM_RETRIEVAL || activeScreen === SCREENS.BIG5_RETRIEVAL || activeScreen === SCREENS.BODY_LANGUAGE_RETRIEVAL) {
            setExpandedSection('retrieval');
        }
    }, [activeScreen]);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const isSectionExpanded = (section: string) => expandedSection === section;

    return (
        <aside className="w-20 md:w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
            <div className="h-20 flex items-center justify-center border-b border-gray-700 px-4">
                <button
                    onClick={() => setActiveScreen(SCREENS.WELCOME)}
                    className={`flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer w-full ${
                        activeScreen === SCREENS.WELCOME ? 'opacity-100' : 'opacity-90'
                    }`}
                >
                    <h1 className={`text-xl font-bold hidden md:block ${activeScreen === SCREENS.WELCOME ? 'text-white' : 'text-gray-300'}`}>Psych Suite</h1>
                    <img 
                        src="https://img.icons8.com/fluency/48/brain.png" 
                        alt="Logo" 
                        className={`md:hidden h-10 w-10 ${activeScreen === SCREENS.WELCOME ? 'opacity-100' : 'opacity-75'}`}
                    />
                </button>
            </div>
            <nav className="flex-1 px-2 md:px-4 py-4 overflow-y-auto">
                {/* Learn Section */}
                <div>
                    <button
                        onClick={() => toggleSection('learn')}
                        className={`w-full flex items-center justify-between p-3 md:p-2 my-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${(activeScreen === SCREENS.DSM_LEARN || activeScreen === SCREENS.BIG5_LEARN || activeScreen === SCREENS.BODY_LANGUAGE_LEARN) ? 'bg-gray-700 text-white' : ''
                            }`}
                    >
                        <div className="flex items-center">
                            <img
                                src={icons.learn}
                                alt="Learn"
                                className={`h-6 w-6 transition-all duration-200 ease-in-out ${(activeScreen === SCREENS.DSM_LEARN || activeScreen === SCREENS.BIG5_LEARN || activeScreen === SCREENS.BODY_LANGUAGE_LEARN)
                                    ? 'grayscale-0 brightness-100'
                                    : 'grayscale brightness-200'
                                    }`}
                            />
                            <span className="ml-4 font-semibold hidden md:inline">Learn</span>
                        </div>
                        <svg
                            className={`h-4 w-4 transition-transform hidden md:inline ${isSectionExpanded('learn') ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    {isSectionExpanded('learn') && (
                        <div className="ml-0 md:ml-4">
                            <NavLink
                                screen={SCREENS.DSM_LEARN}
                                title="DSM-5"
                                activeScreen={activeScreen}
                                onClick={() => setActiveScreen(SCREENS.DSM_LEARN)}
                                isSubItem={true}
                            />
                            <NavLink
                                screen={SCREENS.BIG5_LEARN}
                                title="Big-5"
                                activeScreen={activeScreen}
                                onClick={() => setActiveScreen(SCREENS.BIG5_LEARN)}
                                isSubItem={true}
                            />
                            <NavLink
                                screen={SCREENS.BODY_LANGUAGE_LEARN}
                                title="Body Language"
                                activeScreen={activeScreen}
                                onClick={() => setActiveScreen(SCREENS.BODY_LANGUAGE_LEARN)}
                                isSubItem={true}
                            />
                        </div>
                    )}
                </div>

                {/* Practice Section */}
                <div>
                    <button
                        onClick={() => toggleSection('practice')}
                        className={`w-full flex items-center justify-between p-3 md:p-2 my-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${(activeScreen === SCREENS.DSM_PRACTICE || activeScreen === SCREENS.BIG5_PRACTICE || activeScreen === SCREENS.BODY_LANGUAGE_PRACTICE) ? 'bg-gray-700 text-white' : ''
                            }`}
                    >
                        <div className="flex items-center">
                            <img
                                src={icons.practice}
                                alt="Practice"
                                className={`h-6 w-6 transition-all duration-200 ease-in-out ${(activeScreen === SCREENS.DSM_PRACTICE || activeScreen === SCREENS.BIG5_PRACTICE || activeScreen === SCREENS.BODY_LANGUAGE_PRACTICE)
                                    ? 'grayscale-0 brightness-100'
                                    : 'grayscale brightness-200'
                                    }`}
                            />
                            <span className="ml-4 font-semibold hidden md:inline">Practice</span>
                        </div>
                        <svg
                            className={`h-4 w-4 transition-transform hidden md:inline ${isSectionExpanded('practice') ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    {isSectionExpanded('practice') && (
                        <div className="ml-0 md:ml-4">
                            <NavLink
                                screen={SCREENS.DSM_PRACTICE}
                                title="DSM-5"
                                activeScreen={activeScreen}
                                onClick={() => setActiveScreen(SCREENS.DSM_PRACTICE)}
                                isSubItem={true}
                            />
                            <NavLink
                                screen={SCREENS.BIG5_PRACTICE}
                                title="Big-5"
                                activeScreen={activeScreen}
                                onClick={() => setActiveScreen(SCREENS.BIG5_PRACTICE)}
                                isSubItem={true}
                            />
                            <NavLink
                                screen={SCREENS.BODY_LANGUAGE_PRACTICE}
                                title="Body Language"
                                activeScreen={activeScreen}
                                onClick={() => setActiveScreen(SCREENS.BODY_LANGUAGE_PRACTICE)}
                                isSubItem={true}
                            />
                        </div>
                    )}
                </div>

                {/* Retrieval Section */}
                <div>
                    <button
                        onClick={() => toggleSection('retrieval')}
                        className={`w-full flex items-center justify-between p-3 md:p-2 my-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${(activeScreen === SCREENS.DSM_RETRIEVAL || activeScreen === SCREENS.BIG5_RETRIEVAL || activeScreen === SCREENS.BODY_LANGUAGE_RETRIEVAL) ? 'bg-gray-700 text-white' : ''
                            }`}
                    >
                        <div className="flex items-center">
                            <img
                                src={icons.retrieval}
                                alt="Retrieval"
                                className={`h-6 w-6 transition-all duration-200 ease-in-out ${(activeScreen === SCREENS.DSM_RETRIEVAL || activeScreen === SCREENS.BIG5_RETRIEVAL || activeScreen === SCREENS.BODY_LANGUAGE_RETRIEVAL)
                                    ? 'grayscale-0 brightness-100'
                                    : 'grayscale brightness-200'
                                    }`}
                            />
                            <span className="ml-4 font-semibold hidden md:inline">Retrieval</span>
                        </div>
                        <svg
                            className={`h-4 w-4 transition-transform hidden md:inline ${isSectionExpanded('retrieval') ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    {isSectionExpanded('retrieval') && (
                        <div className="ml-0 md:ml-4">
                            <NavLink
                                screen={SCREENS.DSM_RETRIEVAL}
                                title="DSM-5"
                                activeScreen={activeScreen}
                                onClick={() => setActiveScreen(SCREENS.DSM_RETRIEVAL)}
                                isSubItem={true}
                            />
                            <NavLink
                                screen={SCREENS.BIG5_RETRIEVAL}
                                title="Big-5"
                                activeScreen={activeScreen}
                                onClick={() => setActiveScreen(SCREENS.BIG5_RETRIEVAL)}
                                isSubItem={true}
                            />
                            <NavLink
                                screen={SCREENS.BODY_LANGUAGE_RETRIEVAL}
                                title="Body Language"
                                activeScreen={activeScreen}
                                onClick={() => setActiveScreen(SCREENS.BODY_LANGUAGE_RETRIEVAL)}
                                isSubItem={true}
                            />
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-700 my-4"></div>

                {/* Flashcards */}
                <NavLink
                    screen={SCREENS.FLASHCARDS}
                    title="Flashcards"
                    iconUrl={icons.flashcards}
                    activeScreen={activeScreen}
                    onClick={() => setActiveScreen(SCREENS.FLASHCARDS)}
                />
            </nav>

            {/* User Info and Sign Out */}
            <div className="border-t border-gray-700 p-4">
                <div className="mb-3">
                    <p className="text-xs text-gray-400 hidden md:block">Logged in as</p>
                    <p className="text-sm font-semibold text-white hidden md:block">{currentUser}</p>
                </div>
                <button
                    onClick={signOut}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden md:inline">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;