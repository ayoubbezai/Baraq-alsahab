import React, { useContext, useState } from 'react';
import LogoAr from "../../../assets/logo/big logo arabic yellow .png";
import LogoEn from "../../../assets/logo/big logo english yellow.png";
import { Button } from '../../ui/button';
import toast, { Toaster } from "react-hot-toast";
import { LanguageContext } from "../../../states/LanguageContext";
import { storeData } from '../../../services/sendData';
import { emailToken } from "../../../content/footerContent"
const RegisterSector = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { language } = useContext(LanguageContext);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);

        if (files.some(file => file.size > 5 * 1024 * 1024)) {
            toast.error(language === "ar" ? "بعض الملفات تتجاوز الحد الأقصى لحجم 5 ميجابايت." : "Some files exceed the 5MB size limit.");
            return;
        }

        if (validFiles.length + images.length > 3) {
            toast.error(language === "ar" ? "يمكنك تحميل ما يصل إلى 3 صور فقط." : "You can only upload up to 3 images.");
            return;
        }
        setImages([...images, ...validFiles]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const uploadedImageUrls = [];
        const uploadPromises = images.map(async (image) => {
            const dataImage = new FormData();
            dataImage.append("file", image);
            dataImage.append("upload_preset", "barq-al-sahab");
            dataImage.append("cloud_name", "dbil0ikiw");

            try {
                const res = await fetch('https://api.cloudinary.com/v1_1/dbil0ikiw/image/upload', {
                    method: "POST",
                    body: dataImage,
                });

                const cloudData = await res.json();
                if (cloudData.secure_url) {
                    uploadedImageUrls.push(cloudData.secure_url);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Error uploading images");
            }
        });

        await Promise.all(uploadPromises);

        const formData = new FormData(event.target);
        const company = formData.get("companyName")

        const data = {
            companyName: formData.get("companyName"),
            sectorType: formData.get("sectorType"),
            entityType: formData.get("entityType"),
            address: formData.get("address"),
            serviceDescription: formData.get("serviceDescription"),
            images: uploadedImageUrls,
            submissionTime: new Date().toLocaleString(),
        };

        console.log(data);
        await storeData(data, "Companies");
        toast.success(language === "ar" ? "تم التسجيل بنجاح" : "Registration successful!");

        //send email
        const formDataToSend = new FormData();
        formDataToSend.append("access_key", emailToken.email);
        formDataToSend.append("form type", "company register");
        formDataToSend.append("company full name is ", company);


        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSend
            });

             await response.json();

        } catch {
            console.log("error")
        }
        setIsLoading(false);
        setImages([]);

        event.target.reset();

        // Reset the select fields manually
        event.target.sectorType.value = "";
        event.target.entityType.value = "";
    };

    return (
        <div className={`flex justify-center items-center min-h-screen bg-gray-100 py-20 ${language === "ar" ? "font-arabic text-right" : "font-english text-left"}`}>
            <Toaster />
            <div className={`bg-primary shadow-lg rounded-2xl p-6 w-full mx-2 md:mx-0 max-w-4xl flex flex-col md:flex-row  ${language === "en" && "md:flex-row-reverse"}`}>
                <div className='flex flex-col justify-start mt-3 md:mt-8 items-center w-full md:w-1/2 bg-primary rounded-l-lg md:p-6'>
                    <img src={language === "ar" ? LogoAr : LogoEn} alt="Logo" className='w-42 h-32 md:w-72 md:h-60' />
                    <div className='mt-8 flex flex-wrap gap-4 justify-center w-full'>
                        {images.map((image, index) => (
                            <div key={index} className='relative w-40 h-28'>
                                <img src={URL.createObjectURL(image)} alt={language === "ar" ? `تحميل ${index}` : `Upload ${index}`} className='w-full h-full object-cover rounded border-2 border-secondary' />
                                <button
                                    className='absolute top-0 right-0 text-red-500 font-bold text-xl rounded-full p-1'
                                    onClick={() => removeImage(index)}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='w-full md:w-1/2 p-6'>
                    <h2 className='text-xl font-semibold mb-4 text-white'>{language === "ar" ? "تسجيل الشركة" : "Register Company"}</h2>
                    <div className='space-y-3'>
                        <input type="text" name="companyName" placeholder={language === "ar" ? "اسم الشركة أو المؤسسة" : "Company Name"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />
                        <select name="sectorType" className={`w-full p-2 border border-gray-300 rounded  ${language === "ar" && "text-right"} bg-white  text-black`}
                            required>
                            <option value="" disabled selected>{language === "ar" ? "اختر القطاع" : "Choose an sector"} </option>

                            <option value="retail">قطاع التجارة بالتجزئة والأسواق المحلية</option>
                            <option value="social-commerce">قطاع تجارة شبكات التواصل الاجتماعي</option>
                            <option value="telecom">شركات الاتصالات</option>
                            <option value="e-commerce">قطاع التجارة الإلكترونية</option>
                        </select>
                        <select name="entityType" className={`w-full p-2 border border-gray-300 rounded  ${language === "ar" && "text-right"} bg-white  text-black`}
                            required>
                            <option value="" disabled selected>{language === "ar" ? "اختر نوع الشركة" : "Choose a company Type"} </option>
                            <option value="individual">{language === "ar" ? "فرد" : "Individual"}</option>
                            <option value="company">{language === "ar" ? "منشأة" : "Company"}</option>
                        </select>
                        <input type="text" name="address" placeholder={language === "ar" ? "العنوان" : "Address"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />
                        <textarea name="serviceDescription" placeholder={language === "ar" ? "وصف للخدمة المطلوبة" : "Service Description"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required></textarea>
                        <div>
                            <label className='block text-sm text-gray-300 mb-1'>{language === "ar" ? "صورة السجل التجاري أو الهوية" : "Commercial Registration or ID Image"}</label>
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} />
                            <p className='text-sm text-white mt-1'>{images.length}/3 {language === "ar" ? "صور مرفوعة" : "images uploaded"}</p>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <Button type='submit' className='w-full font-semibold text-base' disabled={isLoading}>
                            {isLoading ? (language === "ar" ? "جاري التسجيل..." : "Registering...") : (language === "ar" ? "تسجيل" : "Register")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterSector;



