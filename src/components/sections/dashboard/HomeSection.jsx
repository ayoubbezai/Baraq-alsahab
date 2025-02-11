'use client';
import React, { useEffect, useState } from 'react';
import { getDataOrderedByDate } from '../../../services/getData';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../ui/table';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';

const HomeSection = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDataOrderedByDate("Delegates");
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center px-2 py-3 md:p-6'>
            <h1 className='text-4xl font-bold text-center mb-4 text-primary'>
                Welcome to <span className='text-secondary'>Barq Al Sahab</span>
            </h1>
            <h2 className='text-xl font-semibold text-center mb-6 text-primary'>
                Latest Delegate Applicants
            </h2>

            {/* Show message if no applications exist */}
            {data.length === 0 ? (
                <p className="text-lg text-gray-500 mt-6">No delegate applications available.</p>
            ) : (
                    <div className='flex mx-auto w-full items-start justify-start max-h-96  text-sm overflow-auto'>
                    <table className='w-full overflow-auto'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Submission Time</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.firstName.length > 10 ? item.firstName.slice(0, 10) + "..." : item.firstName}
                                        {item.lastName.length > 10 ? " " + item.lastName.slice(0, 10) + "..." : " " + item.lastName}
                                    </TableCell>
                                    <TableCell>
                                        {item.email.length > 25 ? item.email.slice(0, 25) + "..." : item.email}
                                    </TableCell>
                                    <TableCell>
                                        {item.phone.length > 10 ? item.phone.slice(0, 10) + "..." : item.phone}
                                    </TableCell>
                                    <TableCell>
                                        {item.address.length > 20 ? item.address.slice(0, 20) + "..." : item.address}
                                    </TableCell>
                                    <TableCell>{item.submissionTime}</TableCell>
                                    <TableCell>
                                        <Button className='text-white font-semibold text-xs w-28'>
                                            <Link to={`/delegate/${item.id}`}>Click to see more</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HomeSection;
