import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../states/LanguageContext";
import sectorsContent from "../../../content/sectorsContent";
import { motion } from "framer-motion";
import { Building, ShoppingBag, Store, Globe } from "lucide-react";

// Define icons based on sector titles (all icons size 24)
const iconMap = {
    "Telecom Companies": <Building size={24} className="text-primary transition-transform duration-300 group-hover:scale-125" />,
    "Social Media Commerce": <ShoppingBag size={24} className="text-primary transition-transform duration-300 group-hover:scale-125" />,
    "Retail & Local Markets": <Store size={24} className="text-primary transition-transform duration-300 group-hover:scale-125" />,
    "E-commerce": <Globe size={24} className="text-primary transition-transform duration-300 group-hover:scale-125" />,
    "شركات الاتصالات": <Building size={24} className="text-primary transition-transform duration-300 group-hover:scale-125" />,
    "قطاع تجارة شبكات التواصل الاجتماعي": <ShoppingBag size={24} className="text-primary transition-transform duration-300 group-hover:scale-125" />,
    "قطاع التجارة بالتجزئة والأسواق المحلية": <Store size={24} className="text-primary transition-transform duration-300 group-hover:scale-125" />,
    "قطاع التجارة الإلكترونية": <Globe size={24} className="text-primary transition-transform duration-300 group-hover:scale-125" />,
};

const SectorsSection = () => {
    const { language } = useContext(LanguageContext);
    const content = sectorsContent[language];

    return (
        <section className={`py-12 md:pt-16 px-6 bg-primary text-white font-english ${language === "ar" ? "font-arabic text-right" : ""}`}>
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="font-semibold text-lg mr-12 relative"
                >
                    {content.title}&nbsp;
                    <span className="absolute bottom-2 w-12 h-[3px] bg-white"></span>
                </motion.h2>

                <motion.h3
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="text-4xl font-semibold my-2"
                >
                    {content.subtitle} <span className="text-secondary"> {language === "ar" ? "بتميز" :"distinction"}</span>
                </motion.h3>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-16 max-w-6xl mx-auto">
                {content.content.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 w-96 lg:w-[30%] bg-white text-primary rounded-2xl shadow-md text-center flex flex-col justify-between group transition-all duration-300 hover:scale-105 hover:shadow-xl "
                    >
                        <div className={`flex items-center gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-all duration-300">
                                {iconMap[item.title] || <Building size={24} className="text-primary transition-transform duration-300 group-hover:scale-125" />}
                            </div>
                            <h4 className="text-xl font-bold">{item.title}</h4>
                        </div>
                        <p className="text-gray-700 text-sm font-normal my-4 leading-7 flex-grow">{item.content}</p>

                        {/* Register Now Button */}
                        <div className="mt-auto">
                            <Link
                                to="/sectors"
                                className="bg-secondary text-white text-sm font-medium px-4 py-2 rounded-none transition-all duration-300 hover:bg-opacity-90 shadow-md inline-block w-full"
                            >
                                {language === "ar" ? "سجل الآن" : "Register Now"}
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SectorsSection;
