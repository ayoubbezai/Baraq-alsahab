import AccordionItem from './AccordionItem';
import React, { useContext } from 'react';
import { LanguageContext } from '../../../states/LanguageContext';
import { accordionPart1, accordionPart2 } from '../../../content/accordion';

const Accordion = () => {
    const { language } = useContext(LanguageContext);

    // Combine accordion1 and accordion2 data
    const accordionData1 = accordionPart1.map((item) => ({
        title: language === 'ar' ? item.title.ar : item.title.en,
        content: language === 'ar' ? item.content.ar : item.content.en,
    }));

    const accordionData2 = accordionPart2.map((item) => ({
        title: language === 'ar' ? item.title.ar : item.title.en,
        content: language === 'ar' ? item.content.ar : item.content.en,
    }));

    return (
        <div className="max-w-2xl mx-auto my-10 p-4">
            <h1 className="text-2xl font-semibold text-gray-600 text-center mb-8">
                {language === 'ar'
                    ? "اطلع على قسم الأسئلة الشائعة لمعرفة المزيد عن خدماتنا."
                    : "Check out the FAQ section to learn more about our services."}
            </h1>

            {/* Shipping Section */}
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                {language === 'ar' ? "الشحن" : "Shipping"}
            </h2>
            <div className="space-y-4">
                {accordionData1.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.title}
                        content={item.content}
                    />
                ))}
            </div>

            {/* Delivery Section */}
            <h2 className="text-xl font-semibold text-center text-gray-700 mt-8 mb-4">
                {language === 'ar' ? "التوصيل" : "Delivery"}
            </h2>
            <div className="space-y-4">
                {accordionData2.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.title}
                        content={item.content}
                    />
                ))}
            </div>
        </div>
    );
};

export default Accordion;