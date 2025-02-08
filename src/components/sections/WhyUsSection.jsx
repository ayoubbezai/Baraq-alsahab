import React, { useContext } from "react";
import { LanguageContext } from "../../states/LanguageContext";
import whyUsContent from "../../content/whyUsContent";
import { motion } from "framer-motion";
import {
    CheckCircle,
    Heart,
    TrendingUp,
    ShieldCheck,
    Users,
    Briefcase,
    Globe,
} from "lucide-react";

const WhyUsSection = () => {
    const { language } = useContext(LanguageContext);
    const content = whyUsContent[language];

    // Define icons based on English keys
    const iconMap = {
        "Quality": <CheckCircle size={32} className="text-white" />,
        "Care": <Heart size={32} className="text-white" />,
        "Results": <TrendingUp size={32} className="text-white" />,
        "Integrity": <ShieldCheck size={32} className="text-white" />,
        "Our Customers": <Users size={32} className="text-white" />,
        "Our Team Members": <Briefcase size={32} className="text-white" />,
        "Our Communities": <Globe size={32} className="text-white" />,
        // Arabic Mappings
        "الجودة": <CheckCircle size={32} className="text-white" />,
        "الرعاية": <Heart size={32} className="text-white" />,
        "النتائج": <TrendingUp size={32} className="text-white" />,
        "النزاهة": <ShieldCheck size={32} className="text-white" />,
        "عملاؤنا": <Users size={32} className="text-white" />,
        "أعضاء فريقنا": <Briefcase size={32} className="text-white" />,
        "مجتمعاتنا": <Globe size={32} className="text-white" />,
    };

    return (
        <section className={`py-16 px-6 bg-gray-100 font-english ${language === "ar" && "font-arabic text-right"}`}>
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    className="font-semibold text-lg mr-12 text-gray-700 relative"
                >
                    {content.title}
                    <span className="absolute bottom-2 w-12 h-[3px] bg-gray-500"></span>
                </motion.h2>
                <motion.h3
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.001 }}
                    className="text-4xl font-semibold text-primary mt-2">{content.subtitle}</motion.h3>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-12 max-w-6xl mx-auto">
                {content.content.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 w-[280px] bg-white rounded-lg shadow-md hover:scale-105 border-primary hover:shadow-xl text-center flex flex-col items-center group transition-all duration-300"
                    >
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary">
                            {iconMap[item.title] || <CheckCircle size={32} className="text-white" />}
                        </div>
                        <h4 className="text-xl font-semibold text-primary">{item.title}</h4>
                        <p className="text-gray-500 font-normal mt-2">{item.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyUsSection;
