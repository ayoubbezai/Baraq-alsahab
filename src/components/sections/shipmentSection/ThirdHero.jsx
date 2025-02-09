import React, { useContext } from 'react';
import { LanguageContext } from '../../../states/LanguageContext';
import heroContent from '../../../content/shipmentContent';
import Background from "../../../assets/background/hero3.webp";
import Logo from '../../../assets/logo/white logo.webp';
import { Button } from '../../ui/button';
import { motion } from "framer-motion";

const ThirdHero = () => {
    const { language } = useContext(LanguageContext);



    return (
        <div className='pt-2 bg-gray-100'>
            <section
                className={`hero-section mt-12  overflow-hidden w-full flex justify-center items-start z-0 font-english 
                ${language === "ar" && "font-arabic"} text-white text-center p-6 py-12 relative  h-[90vh]`}
                style={{
                    backgroundImage: `url(${Background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top'
                }}
            >
                <div className=" md:w-1/2 "></div>
                <div className=" 2xl:mt-8 w-full  md:w-2/3 overflow-hidden flex flex-col gap-6 justify-start items-center">
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
                            className='text-5xl  font-bold leading-relaxed'
                        >
                            {heroContent[language].title}
                        </motion.h1>
                        <motion.h2
                            whileInView={{ x: 0, opacity: 1 }}
                            initial={{ x: -150, opacity: 0 }}
                            transition={{ duration: 0.9 }}
                            className='text-3xl  xl:mt-4  font-semibold text-secondary leading-relaxed w-[90%] mx-auto'
                        >
                            {heroContent[language].subtitle}
                        </motion.h2>
                        <Button
                            onClick={() => window.scrollTo({ top: 650, behavior: "smooth" })}
                            className='mt-4 w-40 md:w-1/3 mx-auto'>{heroContent[language].buttonText}</Button>
                    </div>
                    <motion.div
                        whileInView={{ y: 0, opacity: 1 }}
                        initial={{ y: 60, opacity: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <Button variant="secondary" className='text-base font-semibold cursor-pointer'>
                            {heroContent[language].buttonText}
                        </Button>
                    </motion.div>
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

export default ThirdHero;
