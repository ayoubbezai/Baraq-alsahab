import React, { useEffect, useState } from 'react';
import { getPlaces } from '../../../services/getData';
import { addPlace } from '../../../services/sendData';
import { removePlace } from '../../../services/deleteUser';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const AddDeliveryPlaces = () => {
    const [placesData, setPlacesData] = useState([]);
    const [newPlace, setNewPlace] = useState('');

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const data = await getPlaces();
            setPlacesData(data?.places || []);
        } catch (error) {
            console.error("Error fetching places:", error);
            toast.error("❌ فشل في جلب المناطق المتاحة.");
        }
    };

    const handleAddPlace = async () => {
        if (newPlace.trim()) {
            try {
                await addPlace(newPlace);
                toast.success("✅ تمت إضافة المنطقة بنجاح!");
                setNewPlace('');
                fetchPlaces();
            } catch (error) {
                console.error("Error adding place:", error);
                toast.error("❌ فشل في إضافة المنطقة.");
            }
        } else {
            toast("⚠️ يرجى إدخال اسم منطقة صالح.", { icon: "⚠️" });
        }
    };

    const handleRemovePlace = async (placeToRemove) => {
        try {
            await removePlace(placeToRemove);
            toast.success("🗑️ تمت إزالة المنطقة بنجاح!");
            fetchPlaces();
        } catch (error) {
            console.error("Error removing place:", error);
            toast.error("❌ فشل في إزالة المنطقة.");
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen flex flex-col font-arabic items-center'>
            <Toaster position="top-center" reverseOrder={false} />
            
            <motion.h1
                className='text-5xl font-extrabold text-primary my-6'
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                إدارة <span className='text-yellow-400'>مناطق التوصيل</span>
            </motion.h1>
            <div className='flex gap-4 mb-6'>
                <Input
                    type='text'
                    value={newPlace}
                    onChange={(e) => setNewPlace(e.target.value)}
                    placeholder='أضف منطقة جديدة'
                    className='p-2 rounded-md border text-primary shadow-sm text-right outline-none'
                />
                <Button onClick={handleAddPlace} className='  text-white p-2 px-4 rounded-md shadow-lg'>
                    إضافة
                </Button>
            </div>
            <motion.div
                className='flex flex-wrap justify-center px-4 gap-6 w-full max-w-5xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                {placesData.length > 0 ? (
                    placesData.map((place, index) => (
                        <motion.div
                            key={index}
                            className='bg-white text-primary p-5 rounded-xl shadow-md text-center text-lg font-semibold hover:bg-secondary hover:text-white w-72 flex justify-between items-center'
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            {place}
                            <Button onClick={() => handleRemovePlace(place)} className='bg-red-500 hover:bg-red-700 text-white p-2 rounded-md ml-4'>
                                حذف
                            </Button>
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

export default AddDeliveryPlaces;