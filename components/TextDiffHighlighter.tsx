"use client";
import React, { useState, useEffect } from 'react';
import { diffChars, Change } from 'diff';

const TextDiffHighlighter: React.FC = () => {
    const [inputA, setInputA] = useState<string>('');
    const [inputB, setInputB] = useState<string>('');
    const [diff, setDiff] = useState<Change[]>([]);

    useEffect(() => {
        const differences = diffChars(inputA, inputB);
        setDiff(differences);
    }, [inputA, inputB]);

    const renderDiff = () => {
        return diff.map((part, index) => {
            let backgroundColor = 'transparent';
            let textColor = 'text-gray-700';

            if (part.added) {
                backgroundColor = 'bg-green-200';
                textColor = 'text-green-800';
            } else if (part.removed) {
                backgroundColor = 'bg-red-200';
                textColor = 'text-red-800';
            }

            const display = part.value.split('\n').map((line, lineIndex) => (
                <React.Fragment key={`${index}-${lineIndex}`}>
                    {line}
                    {lineIndex < part.value.split('\n').length - 1 && <br />}
                </React.Fragment>
            ));

            return (
                <span
                    key={index}
                    className={`${backgroundColor} ${textColor} text-sm`}
                    style={{
                        display: 'inline-block',
                        padding: '0 2px',
                        margin: '0 1px',
                        borderRadius: '2px'
                    }}
                >
                    {display}
                </span>
            );
        });
    };

    const renderColorLegend = () => (
        <div className="p-1 w-fit bg-neutral-100 rounded-md border border-white">
            <div className="flex flex-row text-sm gap-2 items-center">
                <div className="flex items-center">
                    <span className="w-fit px-1.5 rounded-sm text-green-800 bg-green-200 border border-green-800">Added text</span>
                </div>
                <div className="flex items-center">
                    <span className="w-fit px-1.5 rounded-sm text-red-800 bg-red-200 border border-red-800">Removed text</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col gap-12 px-6 py-12 max-w-7xl mx-auto">
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                    <label htmlFor="inputA" className="text-sm font-medium text-gray-700">Input A:</label>
                    <textarea
                        id="inputA"
                        value={inputA}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputA(e.target.value)}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-gray-400 focus:ring-opacity-50 focus:outline-none"
                        rows={5}
                    />
                </div>
                <div>
                    <label htmlFor="inputB" className="text-sm font-medium text-gray-700">Input B:</label>
                    <textarea
                        id="inputB"
                        value={inputB}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputB(e.target.value)}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-gray-400 focus:ring-opacity-50 focus:outline-none"
                        rows={5}
                    />
                </div>
            </div>

            <div className='border-t border-white pt-6'>
                <div className="flex flex-row gap-2 items-center w-full justify-between mb-4">
                    <h2 className="text-lg font-semibold">Difference</h2>
                    {renderColorLegend()}
                </div>
                <pre className="bg-neutral-100 border border-white p-2 rounded-md whitespace-pre-wrap">{renderDiff()}</pre>
            </div>
        </div>
    );
};

export default TextDiffHighlighter;