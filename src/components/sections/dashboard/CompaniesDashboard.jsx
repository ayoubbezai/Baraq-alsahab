'use client';
import React, { useEffect, useState } from 'react';
import { getDataOrderedByDate } from '../../../services/getData';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../ui/table';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';

const CompaniesDashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDataOrderedByDate("Companies");
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center px-2 py-3 md:p-6'>
            <h1 className='text-4xl font-bold text-center mb-4 text-primary'>Welcome to <span className='text-secondary'>Companies Dashboard</span></h1>
            <h2 className='text-xl font-semibold text-center mb-6 text-primary'>Here are the latest Companies</h2>
            <div className='flex mx-auto w-full items-start justify-start text-sm overflow-auto'>
                <table className='w-full overflow-auto'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Entity Type</TableHead>
                            <TableHead>Sector Type</TableHead>
                            <TableHead>Service Description</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Submission Time</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.companyName}</TableCell>
                                <TableCell>{item.entityType}</TableCell>
                                <TableCell>{item.sectorType}</TableCell>
                                <TableCell>{item.serviceDescription}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>{item.submissionTime}</TableCell>
                                <TableCell>
                                    <Button className='text-white font-semibold text-xs w-28'>
                                        <Link to={`/company/${item.id}`} className=''>Click to see more</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </table>
            </div>
        </div>
    );
};

export default CompaniesDashboard;
