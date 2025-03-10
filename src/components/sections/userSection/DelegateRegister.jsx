import React, { useContext, useState, useEffect } from 'react';
import LogoAr from "../../../assets/logo/big logo arabic yellow .png";
import LogoEn from "../../../assets/logo/big logo english yellow.png";
import { Button } from '../../ui/button';
import toast, { Toaster } from "react-hot-toast";
import { LanguageContext } from "../../../states/LanguageContext";
import { storeData } from '../../../services/sendData';
import { emailToken } from "../../../content/footerContent"
import { getCities } from '../../../services/deliveryCities';

const DelegateRegister = () => {
    const [images, setImages] = useState([]);  // Store image files for upload
    const [imageUrls, setImageUrls] = useState([]); // Store URLs from Cloudinary
    const [isLoading, setIsLoading] = useState(false); // Manage loading state for button
    const [cities, setCities] = useState([]);
    const { language } = useContext(LanguageContext);


    useEffect(() => {
        const handleGetCities = async () => {
            try {
                const data = await getCities();
                console.log(data)
                setCities(data?.saudiCities || []);
            } catch (e) {
                console.error(e);
            }
        };

        handleGetCities();
    }, []);
    // Handle image selection
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

    // Remove image from the list
    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Handle form submission and upload images to Cloudinary
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Set loading state to true while uploading images
        setIsLoading(true);

        // Upload images to Cloudinary
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
                    uploadedImageUrls.push(cloudData.secure_url); // Add each image URL
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Error uploading images");
            }
        });

        // Wait for all images to upload
        await Promise.all(uploadPromises);

        // Once image URLs are ready, create the form data
        const formData = new FormData(event.target);
        const name = `${formData.get("firstName")}  ${formData.get("lastName")}`
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            submissionTime: new Date().toLocaleString(), // Add current time
            images: uploadedImageUrls, // Include uploaded image URLs
        };

        // Log the form data (including the image URLs)
        await storeData(data, "Delegates")


        // Optionally, send the data to the backend or perform other actions
        toast.success(language === "ar" ? "تم التسجيل بنجاح" : "Registration successful!");


        //send email
        const formDataToSend = new FormData();
        formDataToSend.append("access_key", emailToken.email);
        formDataToSend.append("form type", "Delegate register");
        formDataToSend.append("Delegate full name is ", name);


        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSend
            });

            await response.json();

        } catch {
            console.log("error")
        }

        // Clear form state after successful submission
        setIsLoading(false);
        setImages([]);  // Clear the images
        setImageUrls([]);  // Clear the image URLs
        event.target.reset();  // Reset form fields
    };

    return (
        <div className={`flex justify-center items-center min-h-screen bg-gray-100 py-20 ${language === "ar" ? "font-arabic text-right" : "font-english text-left"}`}>
            <Toaster />
            <div className={`bg-primary shadow-lg rounded-2xl p-6 w-full mx-2 md:mx-0 max-w-4xl flex flex-col md:flex-row  ${language === "en" && "md:flex-row-reverse"}`}>
                {/* Left Section */}
                <div className='flex flex-col justify-start mt-3 md:mt-8 items-center w-full md:w-1/2 bg-primary rounded-l-lg md:p-6'>
                    <img src={language === "ar" ? LogoAr : LogoEn} alt="Logo" className='w-42 h-32 md:w-72 md:h-60' />
                    {/* Uploaded Images */}
                    <div className='mt-8 flex flex-wrap gap-4 justify-center w-full '>
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

                {/* Right Section (Form) */}
                <form onSubmit={handleSubmit} className='w-full md:w-1/2 p-6'>
                    <h2 className='text-xl font-semibold mb-4 text-white'>{language === "ar" ? "تسجيل المندوب" : "Delegate Registration"}</h2>
                    <div className='space-y-3'>
                        <input type="text" name="firstName" placeholder={language === "ar" ? "الاسم الأول" : "First Name"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />
                        <input type="text" name="lastName" placeholder={language === "ar" ? "اسم العائلة" : "Last Name"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />
                        <input type="email" name="email" placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />
                        <input type="tel" name="phone" placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"} className={`w-full p-2 border rounded bg-transparent text-white placeholder-gray-300 ${language === "ar" && "text-right"}`} required />


                        <select name="address" className={`w-full p-2 border border-gray-300 rounded  ${language === "ar" && "text-right"} bg-white  text-black`}
                            required>
                            <option value="" disabled selected>{language === "ar" ? "اختر  عنوانك" : "Choose your adress"} </option>
                            {cities && cities?.map((city) => (
                                <option value={city.en} disabled={!city.isOpen}>{language === "ar" ? city.ar : city.en}</option>

                            ))}
                        </select>

                        {/* Image Upload */}
                        <div>
                            <label className='block text-sm text-gray-300 mb-1'>{language === "ar" ? "رخصة القيادة، رخصة السير، الهوية (3 صور، كل منها 5 ميجابايت)" : "License, Vehicle License, ID (3 images, 5MB each)"}</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className='w-full border p-2 rounded bg-transparent text-gray-300'
                            />
                            <p className='text-sm text-white mt-1 '>{images.length}/3 {language === "ar" ? "صور مرفوعة" : "images uploaded"}</p>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <Button
                            type='submit'
                            className='w-full font-semibold text-base'
                            disabled={isLoading} // Disable button if loading
                        >
                            {isLoading
                                ? (language === "ar" ? "جاري التسجيل..." : "Registering...") // Loading text in both languages
                                : (language === "ar" ? "تسجيل" : "Register") // Default button text
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DelegateRegister;
