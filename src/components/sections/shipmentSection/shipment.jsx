import React, { useContext, useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { LanguageContext } from "../../../states/LanguageContext";
import { trackOrder } from "../../../services/shipmentTrack";
import { motion, AnimatePresence } from "framer-motion";

const Shipment = () => {
    const { language } = useContext(LanguageContext);
    const [order, setOrder] = useState("");
    const [message, setMessage] = useState(null);

    const content = {
        en: {
            title: "Track Shipment",
            placeholder: "Enter Tracking Number",
            buttonText: "Track Now",
            success: "✅ Tracking successful!",
            error: "❌ Tracking failed. Please check your order ID.",
        },
        ar: {
            title: "تتبع الشحنة",
            placeholder: "أدخل رقم التتبع",
            buttonText: "تتبع الآن",
            success: "✅ تم التتبع بنجاح!",
            error: "❌ فشل التتبع. يرجى التحقق من رقم الطلب.",
        },
    };

    const handleTrackOrder = async () => {
        if (!order) {
            setMessage({ type: "error", text: content[language].error });
            return;
        }

        try {
            const data = await trackOrder(order);
            if (data) {
                setMessage({ type: "success", text: content[language].success });
            } else {
                setMessage({ type: "error", text: content[language].error });
            }
        } catch (error) {
            setMessage({ type: "error", text: content[language].error });
        }

        setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
    };

    return (
        <div
            className={`flex bg-gray-100 flex-col items-center justify-center min-h-screen p-6 font-english ${language === "ar" ? "font-arabic text-right" : "text-left"
                }`}
        >
            <div className="bg-primary shadow-lg rounded-lg p-6 md:p-8 md:py-12 w-full max-w-2xl relative">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                    {content[language].title}
                </h2>
                <Label className="text-white">{content[language].placeholder}</Label>
                <Input
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    type="text"
                    placeholder={content[language].placeholder}
                    className={`w-full p-2 md:p-3 border rounded mt-2 ${language === "ar" && "text-right"
                        }`}
                />
                <Button onClick={handleTrackOrder} className="w-full mt-4">
                    {content[language].buttonText}
                </Button>

                {/* Notification */}
                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white shadow-lg ${message.type === "success" ? "bg-green-500" : "bg-red-500"
                                }`}
                        >
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Shipment;
