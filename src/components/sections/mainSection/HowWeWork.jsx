import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../../../states/LanguageContext";
import firstVideo from "../../../assets/videos/ezEH57o7p7v42Mi3n6-ezgif.com-video-to-gif-converter (1).mp4";
import secendVideo from "../../../assets/videos/oV27q5Nb9Ips5pOi05-ezgif.com-optimize.mp4";
import thirdVideo from "../../../assets/videos/V2ZYF092pBrH503958-ezgif.com-video-to-gif-converter (1).mp4";

const HowWeWork = () => {
    const { language } = useContext(LanguageContext);

    return (
        <section className={`py-8 px-6 md:pb-12 font-english overflow-hidden ${language === "ar" ? "font-arabic text-right" : ""}`}>
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
                            .عملية <span className="text-secondary">فعّالة</span> و <span className="text-secondary">آمنة</span> وخالية من المتاعب
                        </>
                    ) : (
                        <>
                            An <span className="text-secondary">efficient</span>, <span className="text-secondary">secure</span>, and hassle-free process.
                        </>
                    )}
                </motion.h3>
            </div>

            {/* Videos Section */}
            <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <motion.video
                    src={firstVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="mx-auto w-72 md:w-2/3 "
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: false, amount: 0.3 }}
                />
                <motion.video
                    src={secendVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="mx-auto w-72 md:w-2/3 "
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: false, amount: 0.3 }}
                />
                <motion.video
                    src={thirdVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="mx-auto w-72 md:w-2/3 "
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: false, amount: 0.3 }}
                />
            </div>
        </section>
    );
};

export default HowWeWork;
