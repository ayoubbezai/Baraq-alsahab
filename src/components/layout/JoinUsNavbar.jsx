import React, { useState, useContext } from "react";
import { LanguageContext } from "../../states/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import LogoArabic from "../../assets/logo/logo arabic yellow.svg";
import LogoEnglish from "../../assets/logo/logo english yellow.svg";
import saFlag from "../../assets/flags/sa.png";
import ukFlag from "../../assets/flags/gb.png";
import { motion } from "framer-motion";

const JoinUsNavbar = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = (lang) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (


        <nav className={`bg-primary fixed z-50 w-full text-white p-3 shadow-2xl   ${language === "en" ? "ltr font-english" : "rtl"}`}>
            <div className={`container mx-auto flex  ${language === "ar" ? "flex-row-reverse" : "flex-row"} justify-between items-center`}>

                {/* Logo with Motion */}
                <motion.img
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={language === "ar" ? LogoArabic : LogoEnglish}
                    alt="Logo"
                    className="h-10 w-26"
                />

                {/* Tracking & Language Selector with Motion */}
                <motion.div className="flex items-center z-10 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link to="/">
                            <Button variant="secondary" className="font-semibold">
                                {language === "ar" ? "العودة للرئيسة" : "Back Home"}
                            </Button>
                        </Link>
                    </motion.div>

                    <div className="relative  ">
                        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-sm font-medium">
                            <img src={language === "ar" ? saFlag : ukFlag} alt="Flag" className="w-5 h-3" />
                            {language === "ar" ? "عربي" : "English"} ▼
                        </button>

                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute mt-2 py-2 w-32 bg-white   rounded-md shadow-lg"
                            >
                                <button onClick={() => toggleLanguage("ar")} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-secondary-light hover:text-white">
                                    <img src={saFlag} alt="SA" className="w-5 h-3" /> عربي
                                </button>
                                <button onClick={() => toggleLanguage("en")} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-secondary-light hover:text-white">
                                    <img src={ukFlag} alt="UK" className="w-5 h-3" /> English
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </nav>
    );
};

export default JoinUsNavbar;
