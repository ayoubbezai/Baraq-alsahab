import React, { useContext } from "react";
import joinUsContent from "../../content/joinUsSection";
import { LanguageContext } from "../../states/LanguageContext";
import AboutUsImage from "../../assets/sections/joinUs.webp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const JoinUsSection = () => {
    const { language } = useContext(LanguageContext);

    return (
        <div
            className={`flex  flex-col md:flex-row bg-primary overflow-hidden  items-center justify-between gap-20 px-6 py-12 pb-16 md:px-12 lg:px-20 font-english mt-8 mb-12
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
                    className="w-11/12 h-full  mx-auto  lg:mt-12 object-cover"
                />
            </div>

            {/* Text Content */}
            <div className={`flex
        items-center flex-col w-full   ${language === "ar" ? "md:items-end  text-right" : "text-left md:items-start"}    justify-center md:justify-start   gap-4 max-w-lg`}>
                <motion.h2
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    className="font-semibold text-lg mr-12  text-white relative ">
                    {joinUsContent[language].sectionName}&nbsp;
                    <span className="absolute   bottom-2 w-12 h-[3px] bg-white"></span>
                </motion.h2>

                <motion.h1
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    className="font-semibold text-3xl md:text-5xl mb-4  text-white ">
                    {joinUsContent[language].title}{" "}
                    <span className="text-secondary leading-[1.3]">{joinUsContent[language].subtitle}</span>
                </motion.h1>

                <motion.p
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    className="text-base leading-relaxed text-white ">
                    {joinUsContent[language].content}
                </motion.p>
                <motion.Link
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    to={"/joinUs"}
                    className="bg-secondary text-white text-sm font-medium px-4 py-2  transition-all duration-300 hover:bg-opacity-90 shadow-md inline-block w-32 text-center self-center rounded-md mt-2">{joinUsContent[language].buttonText}</motion.Link>
            </div>
        </div>
    )
}

export default JoinUsSection
