import React, { useContext, useState } from 'react';
import LogoAr from "../../../assets/logo/big logo arabic yellow .png";
import LogoEn from "../../../assets/logo/big logo english yellow.png";
import { Button } from '../../ui/button';
import toast, { Toaster } from "react-hot-toast";
import { LanguageContext } from "../../../states/LanguageContext";
import { storeData } from '../../../services/sendData';

const DelegateRegister = () => {
    const [selectedOption, setSelectedOption] = useState(""); // Store selection input
    const [isLoading, setIsLoading] = useState(false); // Manage loading state for button
    const { language } = useContext(LanguageContext);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Set loading state to true
        setIsLoading(true);

        // Get form data
        const formData = new FormData(event.target);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            selection: selectedOption, // Store selected option
            submissionTime: new Date().toLocaleString(),
        };

        console.log(data);
        const docId = await storeData(data, "Sectors");
        console.log(docId);

        // Show success toast
        toast.success(language === "ar" ? "تم التسجيل بنجاح" : "Registration successful!");

        // Reset form
        setIsLoading(false);
        setSelectedOption(""); // Reset selection
        event.target.reset();
    };

    return (
        <div className={`flex justify-center items-center min-h-screen bg-gray-100 py-20 ${language === "ar" ? "font-arabic text-right" : "font-english text-left"}`}>
            <Toaster />
            <div className={`bg-primary shadow-lg rounded-2xl p-6 w-full mx-2 md:mx-0 max-w-4xl flex flex-col md:flex-row ${language === "en" && "md:flex-row-reverse"}`}>
                {/* Left Section */}
                <div className='flex flex-col justify-start mt-3 md:mt-8 items-center w-full md:w-1/2 bg-primary rounded-l-lg md:p-6'>
                    <img src={language === "ar" ? LogoAr : LogoEn} alt="Logo" className='w-42 h-32 md:w-72 md:h-60' />
                </div>

                {/* Right Section (Form) */}
                <form onSubmit={handleSubmit} className='w-full md:w-1/2 p-6'>
                    <h2 className='text-xl font-semibold mb-4 text-white'>{language === "ar" ? "تسجيل المندوب" : "Delegate Registration"}</h2>
                    <div className='space-y-3'>
                        <input type="text" name="firstName" placeholder={language === "ar" ? "الاسم الأول" : "First Name"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />
                        <input type="text" name="lastName" placeholder={language === "ar" ? "اسم العائلة" : "Last Name"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />
                        <input type="email" name="email" placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />
                        <input type="tel" name="phone" placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />
                        <input type="text" name="address" placeholder={language === "ar" ? "العنوان" : "Address"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />

                        {/* Selection Input */}
                        <div>
                            <label className='block text-sm text-gray-300 mb-1'>{language === "ar" ? "اختر نوع التسجيل" : "Select Registration Type"}</label>
                            <select
                                name="registrationType"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className={`w-full p-2 border border-gray-300 rounded  ${language === "ar" && "text-right"} bg-white  text-black`}
                                required
                            >
                                <option value="" disabled>{language === "ar" ? "اختر خيارًا" : "Choose an option"} </option>
                                <option value="retail">{language === "ar" ? "قطاع التجارة بالتجزئة والأسواق   المحلية" : "Retail & Local Markets"}</option>
                                <option value="socialMedia">{language === "ar" ? "قطاع تجارة شبكات التواصل الاجتماعي" : "Social Media Trade"}</option>
                                <option value="telecom">{language === "ar" ? "شركات الاتصالات" : "Telecom Companies"}</option>
                                <option value="ecommerce">{language === "ar" ? "قطاع التجارة الإلكترونية" : "E-commerce Sector"}</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <Button
                            type='submit'
                            className='w-full font-semibold text-base'
                            disabled={isLoading} // Disable button if loading
                        >
                            {isLoading
                                ? (language === "ar" ? "جاري التسجيل..." : "Registering...") // Loading text
                                : (language === "ar" ? "تسجيل" : "Register") // Default text
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DelegateRegister;
