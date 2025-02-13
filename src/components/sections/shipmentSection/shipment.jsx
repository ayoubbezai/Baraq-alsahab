import React, { useContext, useState } from 'react';
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { LanguageContext } from '../../../states/LanguageContext';
import { trackOrder } from '../../../services/shipmentTrack';

const Shipment = () => {
    const { language } = useContext(LanguageContext);

    const [order, setOrder] = useState("");
    const [message, setMessage] = useState("");
    const [trackingData, setTrackingData] = useState(null); // To store the tracking data

    const content = {
        en: {
            title: "Track Shipment",
            placeholder: "Enter Tracking Number",
            buttonText: "Track Now",
            errorMessage: "There was an issue with the server, please try again later.",
            invalidTracking: "Invalid tracking number, please check and try again."
        },
        ar: {
            title: "تتبع الشحنة",
            placeholder: "أدخل رقم التتبع",
            buttonText: "تتبع الآن",
            errorMessage: "هناك مشكلة في الخادم ، يرجى المحاولة لاحقًا.",
            invalidTracking: "رقم التتبع غير صالح ، يرجى التحقق والمحاولة مرة أخرى."
        }
    };

    const handleTrackOrder = async () => {
        setMessage(""); // Reset any previous messages
        setTrackingData(null); // Clear previous tracking data

        try {
            const data = await trackOrder(order);
            if (data === null) {
                setMessage(content[language].errorMessage);
                return;
            }

            if (data.length === 0) {
                setMessage(content[language].invalidTracking);
                return;
            }

            // Successfully received data, now set it
            const lastData = data[0];
            const TrackingStatus_Ar = lastData.TrackingStatus_Ar;
            const TrackingStatus_En = lastData.TrackingStatus_En;
            const note = lastData.Note;

            setTrackingData({
                status: language === "ar" ? TrackingStatus_Ar : TrackingStatus_En,
                note: note
            });

        } catch (error) {
            console.log(error);
            setMessage(content[language].errorMessage);
        }
    }

    return (
        <div className={`flex bg-gray-100 flex-col items-center justify-center min-h-screen p-6 font-english ${language === "ar" ? "font-arabic text-right" : "text-left"}`}>
            <div className='bg-primary shadow-lg rounded-lg p-6 md:p-8 md:py-12 w-full max-w-2xl'>
                <h2 className='text-2xl font-bold text-white mb-4 text-center'>
                    {content[language].title}
                </h2>

                <div className='mb-4'>
                    <Label className='text-white'>{content[language].placeholder}</Label>
                    <Input
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        type="text"
                        placeholder={content[language].placeholder}
                        className={`w-full p-2 md:p-3 border rounded mt-2 ${language === "ar" && "text-right"}`}
                    />
                </div>

                <Button
                    onClick={handleTrackOrder}
                    className='w-full py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300'>
                    {content[language].buttonText}
                </Button>

                {/* Show error message if any */}
                {message && (
                    <p className="mt-4 text-red-500 text-center">{message}</p>
                )}

                {/* Show tracking data if available */}
                {trackingData && (
                    <div className="mt-6 bg-white p-4 rounded-md shadow-md">
                        <h3 className="font-bold text-lg mb-2">{language === "ar" ? "حالة الشحنة" : "Shipment Status"}</h3>
                        <p className="text-sm text-gray-700">{trackingData.status}</p>
                        {trackingData.note && (
                            <p className="mt-2 text-sm text-gray-600">{trackingData.note}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shipment;
