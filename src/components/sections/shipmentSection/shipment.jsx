import React, { useContext } from 'react';
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { LanguageContext } from '../../../states/LanguageContext';

const Shipment = () => {
    const { language } = useContext(LanguageContext);

    const content = {
        en: {
            title: "Track Shipment",
            placeholder: "Enter Tracking Number",
            buttonText: "Track Now"
        },
        ar: {
            title: "تتبع الشحنة",
            placeholder: "أدخل رقم التتبع",
            buttonText: "تتبع الآن"
        }
    };

    return (
        <div className={`flex bg-gray-100 flex-col items-center justify-center min-h-screen p-6  font-english ${language === "ar" ? "font-arabic text-right" : "text-left"}`}>
            <div className='bg-primary shadow-lg rounded-lg p-6 md:p-8 md:py-12 w-full max-w-2xl'>
                <h2 className='text-2xl font-bold text-white mb-4 text-center'>
                    {content[language].title}
                </h2>
                <Label className='text-white'>{content[language].placeholder}</Label>
                <Input type="text" placeholder={content[language].placeholder} className={`w-full p-2 md:p-3  border rounded mt-2 ${language === "ar" && "text-right "}`} />
                <Button className='w-full mt-4'>{content[language].buttonText}</Button>
            </div>
        </div>
    );
};

export default Shipment;
