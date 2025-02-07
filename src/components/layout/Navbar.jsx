import React, { useState, useContext } from "react";
import { LanguageContext } from "../../states/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import LogoArabic from "../../assets/logo/logo arabic yellow.svg";
import LogoEnglish from "../../assets/logo/logo english yellow.svg";
import saFlag from "../../assets/flags/sa.png";
import ukFlag from "../../assets/flags/gb.png";
import MenuIcon from "../../assets/icons/burger-menu-svgrepo-com (3).svg";

const Navbar = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleLanguage = (lang) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <nav className={`bg-primary text-white p-3 shadow-2xl ${language === "en" ? "ltr font-english" : "rtl"}`}>
            <div className={`container mx-auto flex ${language === "ar" ? "flex-row-reverse" : "flex-row"} justify-between items-center`}>
                {/* Logo */}
                <img src={language === "ar" ? LogoArabic : LogoEnglish} alt="Logo" className="h-10" />

                {/* Desktop Navigation */}
                <ul className={`gap-5 hidden lg:flex ${language === "ar" ? "flex-row-reverse" : "text-sm"}`}>
                    <li><Link to="/" className="hover:text-secondary-light">{language === "ar" ? "الرئيسية" : "Home"}</Link></li>
                    <li><Link to="/about" className="hover:text-secondary-light">{language === "ar" ? "من نحن" : "About Us"}</Link></li>
                    <li><Link to="/services" className="hover:text-secondary-light">{language === "ar" ? "خدماتنا" : "Our Services"}</Link></li>
                    <li><Link to="/fleet" className="hover:text-secondary-light">{language === "ar" ? "انضم إلى أسطولنا" : "Join Our Fleet"}</Link></li>
                    <li><Link to="/contact" className="hover:text-secondary-light">{language === "ar" ? "اتصل بنا" : "Contact Us"}</Link></li>
                </ul>

                {/* Tracking & Language Selector */}
                <div className="hidden lg:flex items-center z-10 gap-4">
                    <Button variant="secondary" className="font-semibold">{language === "ar" ? "تتبع شحنتك" : "Track your shipment"}</Button>
                    <div className="relative">
                        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-sm font-medium">
                            <img src={language === "ar" ? saFlag : ukFlag} alt="Flag" className="w-5 h-3" />
                            {language === "ar" ? "عربي" : "English"} ▼
                        </button>
                        {isOpen && (
                            <div className="absolute mt-2 py-2 w-32 bg-white rounded-md shadow-lg">
                                <button onClick={() => toggleLanguage("ar")} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-secondary-light hover:text-white">
                                    <img src={saFlag} alt="SA" className="w-5 h-3" /> عربي
                                </button>
                                <button onClick={() => toggleLanguage("en")} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-secondary-light hover:text-white">
                                    <img src={ukFlag} alt="UK" className="w-5 h-3" /> English
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsNavOpen(!isNavOpen)} className="lg:hidden">
                    <img src={MenuIcon} alt="Menu Icon" className="h-8 cursor-pointer" />
                </button>
            </div>

            {/* Mobile Navigation */}
            {isNavOpen && (
                <ul className="flex flex-col items-center gap-8 pt-4 lg:hidden">
                    <li><Link to="/" onClick={() => setIsNavOpen(false)} className="hover:text-secondary-light">{language === "ar" ? "الرئيسية" : "Home"}</Link></li>
                    <li><Link to="/about" onClick={() => setIsNavOpen(false)} className="hover:text-secondary-light">{language === "ar" ? "من نحن" : "About Us"}</Link></li>
                    <li><Link to="/services" onClick={() => setIsNavOpen(false)} className="hover:text-secondary-light">{language === "ar" ? "خدماتنا" : "Our Services"}</Link></li>
                    <li><Link to="/fleet" onClick={() => setIsNavOpen(false)} className="hover:text-secondary-light">{language === "ar" ? "انضم إلى أسطولنا" : "Join Our Fleet"}</Link></li>
                    <li><Link to="/contact" onClick={() => setIsNavOpen(false)} className="hover:text-secondary-light">{language === "ar" ? "اتصل بنا" : "Contact Us"}</Link></li>
                    <li>
                        <button onClick={() => toggleLanguage(language === "ar" ? "en" : "ar")} className="flex items-center gap-2 mb-2 text-sm font-medium">
                            <img src={language === "ar" ? ukFlag : saFlag} alt="Flag" className="w-5 h-3" />
                            {language === "ar" ? "English" : "عربي"}
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;