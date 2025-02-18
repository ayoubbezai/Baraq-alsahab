import { useState } from 'react';
import PropTypes from 'prop-types';
import { LanguageContext } from '../../../states/LanguageContext';
import React, { useContext } from 'react';
const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useContext(LanguageContext)

    return (
        <div className="border border-gray-200  rounded-lg overflow-hidden">
            <h2>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full p-4 ${language === 'ar' ? 'text-right flex-row-reverse' : 'text-left flex-row'} bg-white hover:bg-gray-50 
                             flex justify-between items-center text-gray-700 font-medium
                             transition-all duration-200 ease-in-out`}
                >
                    {title}
                    <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </h2>
            <div
                className={`bg-white overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className={`px-4 py-3 text-gray-600 text-left ${language === "ar" && "text-right"}`}>
                    {content}
                </div>
            </div>
        </div>
    );
};

AccordionItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired
};
export default AccordionItem; 