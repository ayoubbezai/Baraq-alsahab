import React, { useContext } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { LanguageContext } from "../../states/LanguageContext";
import arabicLogo from "../../assets/logo/logo arabic yellow.svg";
import englishLogo from "../../assets/logo/logo english yellow.svg";
import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const Footer = () => {
    const { language } = useContext(LanguageContext);

    return (
        <>
            {/* Animated Triangles */}
            <div className={`flex`}>
                {/* Left Triangle (Upside Down) */}
                <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-[70px] bg-primary border-none outline-none"
                    style={{
                        clipPath: "polygon(0% 100%, 100% 100%, 0% 0%)",
                        clipRule: "evenodd"
                    }}
                ></motion.div>

                {/* Right Triangle (Upside Down) */}
                <motion.div
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-1/2 h-[70px] bg-secondary border-none"
                    style={{
                        clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
                        clipRule: "evenodd"
                    }}
                ></motion.div>
            </div>

            <footer className={`bg-primary text-white py-16 font-english ${language === "ar" && "font-arabic"}`}>
                <div className={`container mx-auto flex flex-col  md:flex-row justify-around gap-8 px-6 ${language === "ar" && "md:flex-row-reverse"}`}>

                    {/* First Section - Logo & Contact */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-2 justify-center items-center "
                    >
                        <div className={`flex flex-col gap-3 ${language === "ar" && "items-end  text-right"}  `}>
                            <img src={language === "ar" ? arabicLogo : englishLogo} alt="logo" className='w-40 h-20' />
                            <p className={`flex ${language === "ar" && "flex-row-reverse"} items-center gap-2 text-gray-300`}>
                                <FaEnvelope className="text-gray-300" /> email@example.com
                            </p>
                            <p className={`flex ${language === "ar" && "flex-row-reverse"}items-center gap-2 text-gray-300`}>
                                <FaPhoneAlt className="text-gray-300" /> +123 456 7890
                            </p>
                            <p className={`flex  ${language === "ar" && "flex-row-reverse"} items-center gap-2 text-gray-300`}>
                                <FaMapMarkerAlt className="text-gray-300" /> 123 Street, City, Country
                            </p>
                        </div>
                    </motion.div>

                    {/* Second Section - More About Us */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col justify-end text-center"
                    >
                        <h3 className="text-2xl font-semibold mb-6">
                            {language === "ar" ? "المزيد عنا" : "More About Us"}
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="text-gray-300 hover:text-gray-100">
                                    {language === "ar" ? "من نحن" : "About Us"}
                                </a>
                            </li>
                            <li>
                                <a href="/careers" className="text-gray-300 hover:text-gray-100">
                                    {language === "ar" ? "الوظائف" : "Careers"}
                                </a>
                            </li>
                            <li>
                                <a href="/blog" className="text-gray-300 hover:text-gray-100">
                                    {language === "ar" ? "المدونة" : "Blog"}
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Third Section - Social Media */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col justify-center items-center"
                    >
                        <h3 className="text-2xl font-semibold mb-6">
                            {language === "ar" ? "تابعنا" : "Follow Us"}
                        </h3>
                        <div className="flex space-x-4">
                            {[
                                { icon: <FaFacebookF />, link: "https://facebook.com" },
                                { icon: <FaTwitter />, link: "https://twitter.com" },
                                { icon: <FaInstagram />, link: "https://instagram.com" },
                                { icon: <FaLinkedin />, link: "https://linkedin.com" }
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.link}
                                    className="text-gray-400 hover:text-white text-xl p-2 rounded-full border border-gray-400 hover:border-white transition"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {item.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Copyright Section */}
                <hr className="border-gray-500 my-6 w-2/3 mx-auto" />
                <motion.p
                    className="text-center text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    &copy; {new Date().getFullYear()} {language === "ar" ? "جميع الحقوق محفوظة" : "All Rights Reserved"}
                </motion.p>
            </footer>
        </>
    );
};

export default Footer;
