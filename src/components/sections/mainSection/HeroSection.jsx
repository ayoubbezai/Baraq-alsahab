import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../../states/LanguageContext';
import heroContent from '../../../content/heroContent';
import Background from '../../../assets/background/hero-section-main.webp';
import Logo from '../../../assets/logo/white logo.webp';
import BackgroundPhone from '../../../assets/background/hero2.webp';
import { Button } from '../../ui/button';
import { motion } from "framer-motion";

const HeroSection = () => {
    const { language } = useContext(LanguageContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='pt-2 bg-gray-100'>
            <section
                className={`hero-section mt-2 overflow-hidden w-full flex justify-center items-center md:items-start md:mt-12 z-0 font-english 
                ${language === "ar" && "font-arabic"} text-white text-center p-6 py-12 relative h-[90vh]`}
                style={{
                    backgroundImage: `url(${isMobile ? BackgroundPhone : Background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right'
                }}
            >
                <div className="sm:w-1/4 md:w-1/2 "></div>
                <div className="w-72 mt-8 sm:w-80 md:2/3 lg:w-1/2 overflow-hidden flex flex-col  gap-6 justify-start items-center">
                    <motion.img
                        animate={{ x: [-50, 60, -50], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        src={Logo}
                        alt="Logo"
                        className="h-28 w-40 mr-8 "
                    />
                    <div className='flex flex-col gap-4 mb-8'>
                        <motion.h1
                            whileInView={{ x: 0, opacity: 1 }}
                            initial={{ x: 150, opacity: 0 }}
                            transition={{ duration: 0.9 }}
                            className='text-5xl md:text-7xl font-bold'
                        >
                            {heroContent[language].title}
                        </motion.h1>
                        <motion.h2
                            whileInView={{ x: 0, opacity: 1 }}
                            initial={{ x: -150, opacity: 0 }}
                            transition={{ duration: 0.9 }}
                            className='text-3xl md:text-5xl font-semibold text-secondary'
                        >
                            {heroContent[language].subtitle}
                        </motion.h2>
                        <Button
                            onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
                            className='mt-4 w-40 md:w-1/3 mx-auto'>{heroContent[language].buttonText}</Button>
                    </div>
                </div>
            </section>

            {/* Triangle Design */}
            <div className="flex">
                <motion.div
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: -60, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[70px] bg-primary border-none outline-none"
                    style={{
                        clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
                        clipRule: "evenodd"
                    }}
                ></motion.div>

                <motion.div
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: 60, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-1/2 h-[70px] bg-secondary border-none"
                    style={{
                        clipPath: "polygon(0% 0%, 100% 100%, 100% 0%)",
                        clipRule: "evenodd"
                    }}
                ></motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
