import React, { useState } from 'react';
import Logo from "../../assets/logo/logo english yellow.svg";
import { Button } from '../ui/button';
import { XCircle } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";

const DelegateRegister = () => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024); // Limit 5MB

        if (files.some(file => file.size > 5 * 1024 * 1024)) {
            toast.error("Some files exceed the 5MB size limit.");
            return;
        }

        if (validFiles.length + images.length > 4) {
            toast.error("You can only upload up to 4 images.");
            return;
        }
        setImages([...images, ...validFiles]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <Toaster />
            <div className='bg-primary shadow-lg rounded-lg p-6 w-full max-w-3xl flex'>
                {/* Left Section */}
                <div className='flex flex-col justify-start mt-8 items-center w-1/2 bg-primary rounded-l-lg p-6'>
                    <img src={Logo} alt="Logo" className='w-60 h-48' />
                    {/* Uploaded Images */}
                    <div className='mt-4 flex flex-wrap gap-2 justify-center'>
                        {images.map((image, index) => (
                            <div key={index} className='relative w-16 h-16'>
                                <img src={URL.createObjectURL(image)} alt={`Upload ${index}`} className='w-full h-full object-cover rounded' />
                                <button
                                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                                    onClick={() => removeImage(index)}
                                >
                                    <XCircle size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section (Form) */}
                <form className='w-1/2 p-6'>
                    <h2 className='text-xl font-semibold mb-4 text-white'>Delegate Registration</h2>
                    <div className='space-y-4'>
                        <input type="text" placeholder='First Name' className='w-full p-2 border rounded bg-transparent placeholder-gray-400' required />
                        <input type="text" placeholder='Last Name' className='w-full p-2 border rounded bg-transparent placeholder-gray-400' required />
                        <input type="email" placeholder='Email' className='w-full p-2 border rounded bg-transparent placeholder-gray-400' required />
                        <input type="tel" placeholder='Phone Number' className='w-full p-2 border rounded bg-transparent placeholder-gray-400' required />

                        {/* Image Upload */}
                        <div>
                            <label className='block text-white mb-1'>Upload Images (Max: 4, 5MB each)</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className='w-full border p-2 rounded bg-transparent'
                            />
                            <p className='text-sm text-white mt-1'>{images.length}/4 images uploaded</p>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <Button type='submit' className='w-full'>
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DelegateRegister;