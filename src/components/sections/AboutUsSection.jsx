import React, { useContext } from "react";
import aboutUsContent from "../../content/aboutUsContent";
import { LanguageContext } from "../../states/LanguageContext";
import AboutUsImage from "../../assets/sections/AboutUs+(1).webp";
import { motion } from "framer-motion";

const AboutUsSection = () => {
    const { language } = useContext(LanguageContext);

    return (
        <div
            className={`flex  flex-col md:flex-row bg-gray-100 overflow-hidden  items-center justify-between gap-20 px-6 py-12  md:px-12 lg:px-20 font-english 
      ${language === "ar" ? "font-arabic text-right" : "text-left  md:flex-row-reverse lg:gap-24"}`}
        >
            {/* About Us Image */}
            <div className="w-5/6 mx-auto md:w-full  ">
                <motion.img
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    src={AboutUsImage}
                    alt="About Us"
                    className="w-72 md:w-11/12 h-full  mx-auto  lg:mt-12 object-cover"
                />
            </div>

            {/* Text Content */}
            <div className={`flex flex-col w-full   ${language === "ar" ? "items-end  text-right" : "text-left"}    justify-start gap-4 max-w-lg`}>
                <motion.h2
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    className="font-semibold text-lg mr-12  text-gray-700 relative ">
                    {aboutUsContent[language].sectionName}&nbsp;
                    <span className="absolute   bottom-2 w-12 h-[3px] bg-gray-500"></span>
                </motion.h2>

                <motion.h1
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    className="font-semibold text-3xl md:text-5xl mb-4  text-primary ">
                    {aboutUsContent[language].title}{" "}
                    <span className="text-secondary leading-[1.3]">{aboutUsContent[language].subtitle}</span>
                </motion.h1>

                <motion.p
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    className="text-base leading-relaxed text-gray-600 ">
                    {aboutUsContent[language].content}
                </motion.p>
            </div>
        </div>
    );
};

export default AboutUsSection;
