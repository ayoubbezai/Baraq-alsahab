import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../../states/LanguageContext";

const HowWeWork = () => {
    const { language } = useContext(LanguageContext);

    return (
        <section className={`py-8 px-6 md:pb-28 bg-gray-100 font-english ${language === "ar" ? "font-arabic text-right" : ""}`}>
            <div className="max-w-6xl mx-auto text-center">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="font-semibold text-lg mr-12 text-gray-700 relative"
                >
                    {language === "ar" ? "كيف نعمل" : "How We Work"}
                    <span className="absolute bottom-2 w-12 h-[3px] bg-gray-500"></span>
                </motion.h2>

                {/* Subtitle */}
                <motion.h3
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="text-4xl font-semibold text-primary my-2"
                >
                    {language === "ar" ? (
                        <>
                            .عملية <span className="text-secondary">فعّالة</span> و <span className="text-secondary">آمنة</span>وخالية من المتاعب
                        </>
                    ) : (
                        <>
                            An <span className="text-secondary">efficient</span>, <span className="text-secondary">secure</span>, and hassle-free process.
                        </>
                    )}
                </motion.h3>
            </div>
        </section>
    );
};

export default HowWeWork;
