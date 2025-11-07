
import React, { useState, useMemo } from 'react';
import { dsm5Data } from '../data/dsm5Data';

const DSMLearnScreen: React.FC = () => {
    const [compareMode, setCompareMode] = useState(false);
    const [selectedDisorders, setSelectedDisorders] = useState<string[]>([]);

    const handleDisorderSelect = (disorderName: string) => {
        if (compareMode) {
            setSelectedDisorders(prev =>
                prev.includes(disorderName)
                    ? prev.filter(d => d !== disorderName)
                    : [...prev, disorderName]
            );
        } else {
            setSelectedDisorders(prev => (prev[0] === disorderName ? [] : [disorderName]));
        }
    };

    const toggleCompareMode = () => {
        setCompareMode(prev => !prev);
        setSelectedDisorders([]);
    };

    const renderExpandedView = () => {
        if (selectedDisorders.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <img src="https://img.icons8.com/ios/100/d1d5db/search-property.png" alt="Select" className="h-24 w-24 mb-4" />
                    <h3 className="text-xl font-semibold">Select a disorder to learn more.</h3>
                    <p className="mt-2 max-w-sm">Toggle 'Compare Mode' on to view multiple disorders side-by-side.</p>
                </div>
            );
        }

        if (compareMode) {
            return <ComparisonView disorders={selectedDisorders} />;
        } else {
            return <SingleView disorderName={selectedDisorders[0]} />;
        }
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            <div className="w-1/3 xl:w-1/4 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Disorders</h2>
                    <div className="mt-4 flex items-center justify-between bg-gray-100 rounded-lg p-2">
                        <label htmlFor="dsm-compare-toggle" className="font-semibold text-gray-700 text-sm md:text-base">Compare Mode</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="dsm-compare-toggle" className="sr-only peer" checked={compareMode} onChange={toggleCompareMode} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
                <div className="overflow-y-auto p-4 space-y-3">
                    {Object.keys(dsm5Data).map(disorderName => (
                        <DisorderCard
                            key={disorderName}
                            name={disorderName}
                            description={dsm5Data[disorderName].description}
                            isActive={selectedDisorders.includes(disorderName)}
                            onClick={() => handleDisorderSelect(disorderName)}
                        />
                    ))}
                </div>
            </div>
            <div className="flex-1 bg-gray-50 overflow-y-auto p-6 md:p-8">
                <div className="h-full">
                    {renderExpandedView()}
                </div>
            </div>
        </div>
    );
};

const DisorderCard: React.FC<{ name: string; description: string; isActive: boolean; onClick: () => void; }> = ({ name, description, isActive, onClick }) => {
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

const SingleView: React.FC<{ disorderName: string }> = ({ disorderName }) => {
    const disorder = dsm5Data[disorderName];
    if (!disorder) return null;
    return (
        <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{disorderName}</h2>
            <p className="text-gray-600 mb-6">{disorder.description}</p>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Diagnostic Criteria (DSM-5)</h3>
            <ul className="space-y-3 text-gray-700">
                {disorder.criteria.map((c, i) => (
                    <li key={i} className="p-3 bg-gray-50 rounded-md border border-gray-200">{c.text}</li>
                ))}
            </ul>
        </div>
    );
};

const ComparisonView: React.FC<{ disorders: string[] }> = ({ disorders: selectedDisorderNames }) => {
    const disorders = useMemo(() => selectedDisorderNames.map(name => ({ name, ...dsm5Data[name] })), [selectedDisorderNames]);
    const allKeys = useMemo(() => {
        const keySet = new Set(disorders.flatMap(d => d.criteria.map(c => c.key).filter(Boolean)));
        return Array.from(keySet);
    }, [disorders]);

    if (disorders.length === 0) return null;

    const gridColsClass = `grid-cols-${disorders.length}`;

    return (
        <div className="space-y-4 animate-fadeIn">
            <div className={`sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 py-4`}>
                <div className={`grid ${gridColsClass} bg-gray-200 rounded-lg shadow-md`}>
                    {disorders.map(d => <div key={d.name} className="p-3 text-xl font-bold text-center">{d.name}</div>)}
                </div>
            </div>
            {allKeys.map(key => {
                let hasHighlight = false;
                let highlightClass = '';
                const cells = disorders.map(disorder => {
                    const criterion = disorder.criteria.find(c => c.key === key);
                    if (criterion?.highlight) {
                        hasHighlight = true;
                        highlightClass = `bg-yellow-100`; // Simplified highlight
                    }
                    return (
                        <div key={`${disorder.name}-${key}`} className="p-3 border-t border-gray-200">
                            {criterion ? criterion.text : <span className="text-gray-400 italic">Not specified</span>}
                        </div>
                    );
                });
                return (
                    <div key={key} className={`grid ${gridColsClass} ${hasHighlight ? highlightClass : 'bg-white'} rounded-md my-2 shadow-sm`}>
                        {cells}
                    </div>
                );
            })}
        </div>
    );
};

export default DSMLearnScreen;
