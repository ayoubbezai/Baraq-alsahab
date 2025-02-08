import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { LanguageContext } from "../../states/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import LogoArabic from "../../assets/logo/logo arabic yellow.svg";
import LogoEnglish from "../../assets/logo/logo english yellow.svg";
import saFlag from "../../assets/flags/sa.png";
import ukFlag from "../../assets/flags/gb.png";
import MenuIcon from "../../assets/icons/burger-menu-svgrepo-com (3).svg";
import { motion } from "framer-motion";

const Navbar = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleLanguage = (lang) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    // Animation Variants
    const navItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (index) => ({
            opacity: 1,
            x: 0,
            transition: { delay: index * 0.2, duration: 0.4, ease: "easeOut" },
        }),
    };

    return (
        <>
            {/* Helmet for Dynamic Title */}
            <Helmet>
                <title>{language === "ar" ? "برق السحاب | الخدمات اللوجستية" : "Bariq Al Sahab | Logistics Services"}</title>
            </Helmet>

            <nav className={`bg-primary fixed z-50  w-full text-white p-3 shadow-2xl overflowy-x-hidden ${language === "en" ? "ltr font-english" : "rtl"}`}>
                <div className={`container mx-auto flex ${language === "ar" ? "flex-row-reverse" : "flex-row"} justify-between items-center`}>

                    {/* Logo with Motion */}
                    <motion.img
                        whileInView={{ x: 0, opacity: 1 }}
                        initial={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        src={language === "ar" ? LogoArabic : LogoEnglish}
                        alt="Logo"
                        className="h-10 w-26"
                    />

                    {/* Desktop Navigation with Animation */}
                    <ul className={`gap-5 hidden lg:flex ${language === "ar" ? "flex-row-reverse" : "text-sm"}`}>
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "الرئيسية" : "Home"}
                            </Link>
                        </motion.li>
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 600, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "من نحن" : "About Us"}
                            </Link>
                        </motion.li>
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 2000, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "خدماتنا" : "Our Services"}
                            </Link>
                        </motion.li>
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 4150, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "انضم إلى أسطولنا" : "Join Our Fleet"}
                            </Link>
                        </motion.li>
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 5000, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "اتصل بنا" : "Contact Us"}
                            </Link>
                        </motion.li>

                    </ul>

                    {/* Tracking & Language Selector with Motion */}
                    <motion.div className="hidden lg:flex items-center z-10 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Button variant="secondary" className="font-semibold">
                                {language === "ar" ? "تتبع شحنتك" : "Track your shipment"}
                            </Button>
                        </motion.div>

                        <div className="relative">
                            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-sm font-medium">
                                <img src={language === "ar" ? saFlag : ukFlag} alt="Flag" className="w-5 h-3" />
                                {language === "ar" ? "عربي" : "English"} ▼
                            </button>

                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute mt-2 py-2 w-32 bg-white rounded-md shadow-lg"
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

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="lg:hidden"
                    >
                        <img src={MenuIcon} alt="Menu Icon" className="h-8 cursor-pointer" />
                    </motion.button>
                </div>

                {/* Mobile Navigation with Animation */}
                {isNavOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-8 pt-4 lg:hidden"
                    >
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "الرئيسية" : "Home"}
                            </Link>
                        </motion.li>
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 600, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "من نحن" : "About Us"}
                            </Link>
                        </motion.li>
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 2000, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "خدماتنا" : "Our Services"}
                            </Link>
                        </motion.li>
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 4150, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "انضم إلى أسطولنا" : "Join Our Fleet"}
                            </Link>
                        </motion.li>
                        <motion.li variants={navItemVariants} initial="hidden" animate="visible">
                            <Link
                                onClick={() => {
                                    setIsNavOpen(false);
                                    window.scrollTo({ top: 5000, behavior: "smooth" });
                                }}
                                className="hover:text-secondary-light"
                            >
                                {language === "ar" ? "اتصل بنا" : "Contact Us"}
                            </Link>
                        </motion.li>


                        <motion.li whileHover={{ scale: 1.1 }}>
                            <button onClick={() => {
                                setIsNavOpen(false);
                                toggleLanguage(language === "ar" ? "en" : "ar")
                            }} className="flex items-center gap-2 mb-2 text-sm font-medium">
                                <img src={language === "ar" ? ukFlag : saFlag} alt="Flag" className="w-5 h-3" />
                                {language === "ar" ? "English" : "عربي"}
                            </button>
                        </motion.li>
                    </motion.ul>
                )}

            </nav>
        </>
    );
};

export default Navbar;