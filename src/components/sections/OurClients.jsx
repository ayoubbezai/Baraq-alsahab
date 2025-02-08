import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../../states/LanguageContext";
import Marquee from "react-fast-marquee";

const companyLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    "https://download.logo.wine/logo/Spotify/Spotify-Logo.wine.png",
    "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
];

const OurClients = () => {
    const { language } = useContext(LanguageContext);

    return (
        <div className={`font-english overflow-hidden mb-12 ${language === "ar" ? "font-arabic text-right" : ""}`}>
            <motion.h3
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="text-4xl font-semibold my-2 mx-auto text-center"
            >
                {language === "ar" ? "عملاؤنا" : "Our Clients"}
            </motion.h3>

            <Marquee gradient={false} speed={100} className="mt-12 mb-6">
                {companyLogos.map((logo, index) => (
                    <img key={index} src={logo} alt={`Company ${index + 1}`} className=" ml-24 w-36 h-36 object-contain" />
                ))}
            </Marquee>
        </div>
    );
};

export default OurClients;
