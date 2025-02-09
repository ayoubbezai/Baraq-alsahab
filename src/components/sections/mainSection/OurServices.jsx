import React, { useContext } from "react";
import { LanguageContext } from "../../../states/LanguageContext";
import ourServicesContent from "../../../content/ourServices";
import { motion } from "framer-motion";
import { Truck, ShoppingCart, Package } from "lucide-react";

// Define icons based on service titles (all icons size 22)
const iconMap = {
    "Express Shipping": <Truck size={22} className="text-white transition-transform duration-300 group-hover:rotate-12" />,
    "E-commerce Solutions": <ShoppingCart size={22} className="text-white transition-transform duration-300 group-hover:rotate-12" />,
    "Freight Shipping": <Package size={22} className="text-white transition-transform duration-300 group-hover:rotate-12" />,
    "خدمات الشحن السريع": <Truck size={22} className="text-white transition-transform duration-300 group-hover:rotate-12" />,
    "حلول التجارة الإلكترونية": <ShoppingCart size={22} className="text-white transition-transform duration-300 group-hover:rotate-12" />,
    "شحن البضائع": <Package size={22} className="text-white transition-transform duration-300 group-hover:rotate-12" />,
};

const OurServices = () => {
    const { language } = useContext(LanguageContext);
    const content = ourServicesContent[language];

    return (
        <section className={`py-8   px-6 md:pb-28 md:pt-20 bg-gray-100 font-english ${language === "ar" ? "font-arabic text-right" : ""}`}>
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="font-semibold text-lg mr-12 text-gray-700 relative"
                >
                    {content.title}&nbsp;
                    <span className="absolute bottom-2 w-12 h-[3px] bg-gray-500  "></span>
                </motion.h2>

                <motion.h3
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="text-4xl font-semibold text-primary my-2"
                >
                    {language === "ar" ? (
                        <>
                            قم بتسهيل احتياجاتك <span className="text-secondary">للشحن السريع</span> مع برق السحاب
                        </>
                    ) : (
                        <>
                            Simplify Your <span className="text-secondary">Express Shipping</span> Needs with Barq Al Sahab
                        </>
                    )}
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
                        className="p-6 lg:w-[30%] bg-primary text-white rounded-2xl shadow-md text-center flex flex-col items-center group transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div className={`flex items-center gap-3  ${language === "ar" ? "flex-row-reverse" : ""}`}>
                            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                                {iconMap[item.title] || <Package size={22} className="text-white transition-transform duration-300 group-hover:rotate-12" />}
                            </div>
                            <h4 className="text-xl font-bold">{item.title}</h4>
                        </div>
                        <p className="text-gray-300 text-sm font-normal mt-4 leading-7">{item.content}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default OurServices;
