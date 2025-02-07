import React, { useContext } from 'react';
import { LanguageContext } from '../../states/LanguageContext';
import heroContent from '../../content/heroContent';
import Background from '../../assets/background/hero-section-main.webp';
import Logo from '../../assets/logo/white logo.webp';
import { Button } from '../ui/button';
import { motion } from "framer-motion";

const HeroSection = () => {
    const { language } = useContext(LanguageContext);

    return (
        <section
            className={`hero-section overflow-x-hidden w-full flex justify-center items-start z-0 font-english  ${language === "ar" && "font-arabic"}   text-white text-center p-6 py-12 relative h-[90vh] `}
            style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'right' }}
        >
            <div className="sm:w-1/4  md:w-1/2 ">

            </div>
            <div className=" w-full sm:w-3/4 md:2/3 lg:w-1/2  flex flex-col gap-6 justify-start  items-center">
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
                        className='text-7xl font-bold'>{heroContent[language].title}</motion.h1>
                    <motion.h2
                        whileInView={{ x: 0, opacity: 1 }}
                        initial={{ x: -150, opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className='text-5xl font-semibold text-secondary'>{heroContent[language].subtitle}</motion.h2>
                </div>
                <motion.div
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: 60, opacity: 0 }}
                    transition={{ duration: 0.9 }}
                >


                    <Button

                        variant="secondary" className='text-base font-semibold cursor-pointer  '>{heroContent[language].buttonText}</Button>

                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
