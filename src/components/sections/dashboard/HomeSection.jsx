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
        <div className='flex flex-col  items-center justify-center p-6'>
            <h1 className='text-4xl font-bold text-center mb-4 text-primary'>Welcome to <span className='text-secondary'>Barq Al Sahab</span></h1>
            <h2 className='text-xl font-semibold text-center mb-6 text-primary'>Here are the latest Delegates applicants </h2>
            <div className='w-full mx-auto flex justify-center items-center'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Submission Time</TableHead>
                            <TableHead>Images</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>

                                <TableCell>{item.firstName} {item.lastName}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>{item.submissionTime}</TableCell>
                                <TableCell><Button className='text-white font-semibold'><Link 
                                    to={`/delegate/${item.id}`}
                                className=''>click to see more</Link></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default HomeSection;
