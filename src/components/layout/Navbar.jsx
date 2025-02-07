import React, { useState, useContext } from "react";
import { LanguageContext } from "../../states/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import LogoArabic from "../../assets/logo/logo arabic yellow.svg";
import LogoEnglish from "../../assets/logo/logo english yellow.svg";
import saFlag from "../../assets/flags/sa.png";
import ukFlag from "../../assets/flags/gb.png";

const Navbar = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = (lang) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <nav className={`bg-primary text-white p-3 rtl shadow-xl ${language === "en" && "ltr font-english"}`}>
            <div className={`container mx-auto flex ${language === "ar" ? "flex-row-reverse" : "flex-row"} justify-between items-center`}>
                {/* Logo */}
                <img src={language === "ar" ? LogoArabic : LogoEnglish} alt="Logo" className="h-10" />

                {/* Navigation Links */}
                <ul className={`flex gap-5 flex-row ${language === "ar" ? "flex-row-revers " : "text-sm"}`}>
                    <li>
                        <Link to="/" className="text-secondary-light hover:text-secondary-light">
                            {language === "ar" ? "الرئيسية" : "Home"}
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-secondary-light">
                            {language === "ar" ? "من نحن" : "About Us"}
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" className="hover:text-secondary-light">
                            {language === "ar" ? "خدماتنا" : "Our Services"}
                        </Link>
                    </li>
                    <li>
                        <Link to="/fleet" className="hover:text-secondary-light">
                            {language === "ar" ? "انضم إلى أسطولنا" : "Join Our Fleet"}
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-secondary-light">
                            {language === "ar" ? "اتصل بنا" : "Contact Us"}
                        </Link>
                    </li>
                </ul>

                {/* Tracking Button & Language Selector */}
                <div className="flex flex-row-reverse items-center gap-4">
                    <Button variant="secondary" className="font-semibold">
                        {language === "ar" ? "تتبع شحنتك" : "Track your shipment"}
                    </Button>

                    {/* Language Selector */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-white hover:text-secondary-light text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <img
                                    src={language === "ar" ? saFlag : ukFlag}
                                    alt={language === "ar" ? "SA" : "UK"}
                                    className="w-5 h-3 object-cover"
                                />
                                {language === "ar" ? "عربي" : "English"} ▼
                            </button>

                            {isOpen && (
                                <div className="absolute mt-2 py-2 w-32 bg-white rounded-md shadow-lg">
                                    <button
                                        onClick={() => toggleLanguage("ar")}
                                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-secondary-light hover:text-white flex items-center gap-2"
                                    >
                                        <img src={saFlag} alt="SA" className="w-5 h-3 object-cover" />
                                        عربي
                                    </button>
                                    <button
                                        onClick={() => toggleLanguage("en")}
                                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-secondary-light hover:text-white flex items-center gap-2"
                                    >
                                        <img src={ukFlag} alt="UK" className="w-5 h-3 object-cover" />
                                        English
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
