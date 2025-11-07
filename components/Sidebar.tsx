
import React from 'react';
import { Screen } from '../types';
import { SCREENS } from '../constants';

interface SidebarProps {
    activeScreen: Screen;
    setActiveScreen: (screen: Screen) => void;
}

const NavLink: React.FC<{
    screen: Screen;
    title: string;
    iconUrl: string;
    activeScreen: Screen;
    onClick: () => void;
}> = ({ screen, title, iconUrl, activeScreen, onClick }) => {
    const isActive = activeScreen === screen;
    return (
        <a
            href={`#${screen}`}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`flex items-center p-3 md:p-2 my-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${isActive ? 'bg-gray-700 text-white' : ''}`}
        >
            <img src={iconUrl} alt={title} className={`h-6 w-6 transition-all duration-200 ease-in-out ${isActive ? 'grayscale-0 brightness-100' : 'grayscale brightness-200'}`} />
            <span className="ml-4 font-semibold hidden md:inline">{title}</span>
        </a>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, setActiveScreen }) => {
    const icons = {
        learn: "https://img.icons8.com/ios-filled/50/FFFFFF/book.png",
        practice: "https://img.icons8.com/ios-filled/50/FFFFFF/questions.png",
        retrieval: "https://img.icons8.com/ios-filled/50/FFFFFF/brain.png",
        flashcards: "https://img.icons8.com/ios-filled/50/FFFFFF/stack-of-photos.png"
    };
    
    return (
        <aside className="w-20 md:w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
            <div className="h-20 flex items-center justify-center border-b border-gray-700 px-4">
                <h1 className="text-xl font-bold hidden md:block">Psychopathology Suite</h1>
                <img src="https://img.icons8.com/fluency/48/brain.png" alt="Logo" className="md:hidden h-10 w-10"></img>
            </div>
            <nav className="flex-1 px-2 md:px-4 py-4">
                <NavLink screen={SCREENS.DSM_LEARN} title="DSM-5 Learn" iconUrl={icons.learn} activeScreen={activeScreen} onClick={() => setActiveScreen(SCREENS.DSM_LEARN)} />
                <NavLink screen={SCREENS.DSM_PRACTICE} title="DSM-5 Practice" iconUrl={icons.practice} activeScreen={activeScreen} onClick={() => setActiveScreen(SCREENS.DSM_PRACTICE)} />
                <NavLink screen={SCREENS.DSM_RETRIEVAL} title="DSM-5 Retrieval" iconUrl={icons.retrieval} activeScreen={activeScreen} onClick={() => setActiveScreen(SCREENS.DSM_RETRIEVAL)} />
                <div className="border-t border-gray-700 my-4"></div>
                <NavLink screen={SCREENS.BIG5_LEARN} title="Big-5 Learn" iconUrl={icons.learn} activeScreen={activeScreen} onClick={() => setActiveScreen(SCREENS.BIG5_LEARN)} />
                <NavLink screen={SCREENS.BIG5_PRACTICE} title="Big-5 Practice" iconUrl={icons.practice} activeScreen={activeScreen} onClick={() => setActiveScreen(SCREENS.BIG5_PRACTICE)} />
                <NavLink screen={SCREENS.BIG5_RETRIEVAL} title="Big-5 Retrieval" iconUrl={icons.retrieval} activeScreen={activeScreen} onClick={() => setActiveScreen(SCREENS.BIG5_RETRIEVAL)} />
                <div className="border-t border-gray-700 my-4"></div>
                <NavLink screen={SCREENS.FLASHCARDS} title="Flashcards" iconUrl={icons.flashcards} activeScreen={activeScreen} onClick={() => setActiveScreen(SCREENS.FLASHCARDS)} />

            </nav>
        </aside>
    );
};

export default Sidebar;