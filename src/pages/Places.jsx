import React, { useEffect, useState } from 'react';
import { getPlaces } from '../services/getData';
import Logo from "../assets/logo/logo arabic yellow.svg";
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Places = () => {
    const [placesData, setPlacesData] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const data = await getPlaces();
                setPlacesData(data?.places || []);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };
        fetchPlaces();
    }, []);

    return (
        <div className='bg-gray-100 min-h-screen flex flex-col font-arabic items-center '>
            <div className='flex justify-between w-full px-8 py-2 bg-primary shadow-lg'>
                <Button className=' px-6 py-3 mt-1 text-lg rounded-lg  bg-secondary text-white shadow-lg hover:bg-opacity-90 transition duration-300'>
                    <Link to="/">العودة للرئيسية</Link>
                </Button>
                <motion.img
                    src={Logo}
                    alt="Logo"
                    className='w-40  '
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                />
            </div>
            <motion.h1
                className='text-5xl font-extrabold text-primary my-4'
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                مرحبا في <span className='text-yellow-400'>برق السحاب</span>
            </motion.h1>
            <motion.h2
                className='text-2xl text-gray-600 mb-8 mt-2'
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                مناطق التوصيل المتاحة
            </motion.h2>
            <motion.div
                className='flex flex-wrap justify-center  px-4 gap-6 w-full max-w-5xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                {placesData.length > 0 ? (
                    placesData.map((place, index) => (
                        <motion.div
                            key={index}
                            className='bg-white text-primary p-5 rounded-xl shadow-md text-center text-lg font-semibold hover:bg-secondary hover:text-white w-72'
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            {place}
                        </motion.div>
                    ))
                ) : (
                    <motion.p
                        className='text-gray-400 text-lg text-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        لا توجد مناطق متاحة حاليًا
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default Places;
