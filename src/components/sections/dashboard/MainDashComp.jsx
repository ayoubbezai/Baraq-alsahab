import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getColSize } from '../../../services/getData';
import { Heart } from 'lucide-react';

const collections = [
    { name: 'New Company Submissions', col: 'Companies', bg: 'bg-blue-600', text: 'text-white' },
    { name: 'New  Delegate Applications', col: 'Delegates', bg: 'bg-green-600', text: 'text-white' },
    { name: 'Archived Companies Submissions', col: 'archive_companies', bg: 'bg-gray-600', text: 'text-white' },
    { name: 'Archived Delegations  Applications  ', col: 'archive_delegation', bg: 'bg-yellow-500', text: 'text-black' },
];

const useCountUp = (target) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1000;
        const stepTime = Math.abs(Math.floor(duration / target));

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= target) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);
    }, [target]);

    return count;
};

const Card = ({ title, value, backgroundColor, textColor }) => {
    const animatedValue = useCountUp(value || 0);

    return (
        <motion.div
            className={`p-2  rounded-xl shadow-lg  ${backgroundColor} ${textColor} text-center w-52 relative`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-xl font-bold mt-2">{animatedValue}</p>

        </motion.div>
    );
};

const MainDashComp = () => {
    const [dataCounts, setDataCounts] = useState({});
    const [totalNewApplications, setTotalNewApplications] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            let counts = {};
            for (const col of collections) {
                counts[col.name] = await getColSize(col.col);
            }
            setDataCounts(counts || {});

            const total = (counts['New Company Submissions'] || 0) + (counts['New  Delegate Applications'] || 0);
            setTotalNewApplications(total);
        };
        fetchData();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center font-sans px-6 py-8 md:py-10'>
            <h1 className='text-4xl font-bold text-center mb-6 text-primary'>
                Welcome to <span className='text-secondary'>Barq Al Sahab</span>
            </h1>
            <h2 className='text-2xl font-medium text-gray-700 mb-4'>Dashboard Overview</h2>
            <div className='mb-6 p-4 bg-purple-600 text-white rounded-lg shadow-lg text-center'>
                <h3 className='text-base font-semibold'>Total New Applications</h3>
                <p className='text-xl font-bold'>{useCountUp(totalNewApplications)}</p>
            </div>
            <motion.div
                className='flex flex-wrap justify-center gap-x-12 gap-y-6 mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {collections.map((col) => (
                    <Card
                        key={col.name}
                        title={col.name}
                        value={dataCounts[col.name] || 0}
                        backgroundColor={col.bg}
                        textColor={col.text}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default MainDashComp;
