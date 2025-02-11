import React, { useEffect, useState, useCallback } from "react";
import { getData, getNextPage, getPreviousPage } from "../../../services/pagination";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../ui/table";
import { Button } from "../../ui/button";
import { Link } from 'react-router-dom';

const DelegatesArchiveComp = () => {
    const collectionName = "archive Delegation";
    const pageSize = 25;
    const [data, setData] = useState([]);
    const [approvedData, setApprovedData] = useState([]);
    const [rejectedData, setRejectedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState("All");
    const [firstDoc, setFirstDoc] = useState(null);
    const [lastDoc, setLastDoc] = useState(null);
    const [loading, setLoading] = useState(false);

    const processData = useCallback((rawData) => {
        const approved = rawData.filter((delegation) => delegation.status === "Approved");
        const rejected = rawData.filter((delegation) => delegation.status === "Rejected");
        setApprovedData(approved);
        setRejectedData(rejected);
    }, []);

    useEffect(() => {
        if (filter === "All") {
            setFilteredData(data);
        } else if (filter === "Approved") {
            setFilteredData(approvedData);
        } else {
            setFilteredData(rejectedData);
        }
    }, [filter, data, approvedData, rejectedData]);

    const handleGetData = async () => {
        setLoading(true);
        try {
            const response = await getData(collectionName, pageSize);
            setFirstDoc(response.firstDoc);
            setLastDoc(response.lastDoc);
            setData(response.data);
            processData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const handleGetNextPage = async () => {
        if (!lastDoc) return;
        setLoading(true);
        try {
            const response = await getNextPage(collectionName, pageSize, lastDoc);
            if (response && response.data.length > 0) {
                setFirstDoc(response.firstDoc);
                setLastDoc(response.lastDoc2);
                setData(response.data);
                processData(response.data);
            }
        } catch (error) {
            console.error("Error fetching next page:", error);
        }
        setLoading(false);
    };

    const handleGetPreviousPage = async () => {
        if (!firstDoc) return;
        setLoading(true);
        try {
            const response = await getPreviousPage(collectionName, pageSize, firstDoc);
            if (response && response.data.length > 0) {
                setFirstDoc(response.firstDoc);
                setLastDoc(response.lastDoc);
                setData(response.data);
                processData(response.data);
            }
        } catch (error) {
            console.error("Error fetching previous page:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center font-english px-2 py-3 md:p-6'>
            <h1 className='text-4xl font-bold text-center mb-4 text-primary'>
                Welcome to <span className='text-secondary'>Barq Al Sahab</span>
            </h1>
            <h2 className='text-xl font-semibold text-center mb-6 text-primary'>Archived Delegation Submissions</h2>
            <div className="mb-4">
                <label className="font-semibold text-lg mr-2">Filter by Status:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-700"
                >
                    <option value="All">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : filteredData.length === 0 ? (
                <div className='text-lg font-semibold text-gray-600 text-center'>
                    {filter === "All" && <p>There is no archived delegation application for now.</p>}
                    {filter === "Approved" && <p>There are no approved delegation applications.</p>}
                    {filter === "Rejected" && <p>There are no rejected delegation applications.</p>}
                </div>
            ) : (
                <>
                    <div className='flex mx-auto w-full items-start justify-start max-h-96 text-[15px] overflow-auto'>
                        <table className='w-full overflow-auto'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submission Time</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((delegation) => (
                                    <TableRow key={delegation.id}>
                                        <TableCell>{delegation.firstName.length > 10 ? delegation.firstName.slice(0, 10) + "..." : delegation.firstName}</TableCell>
                                        <TableCell>{delegation.lastName.length > 10 ? delegation.lastName.slice(0, 10) + "..." : delegation.lastName}</TableCell>
                                        <TableCell>{delegation.email.length > 25 ? delegation.email.slice(0, 25) + "..." : delegation.email}</TableCell>
                                        <TableCell>{delegation.phone.length > 10 ? delegation.phone.slice(0, 10) + "..." : delegation.phone}</TableCell>
                                        <TableCell>{delegation.address.length > 20 ? delegation.address.slice(0, 20) + "..." : delegation.address}</TableCell>
                                        <TableCell>
                                            <span className={`px-3 text-center py-1 text-[13px] font-semibold rounded-3xl text-white ${delegation.status === "Approved" ? "bg-green-500" : "bg-red-500"}`}>
                                                {delegation.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{delegation.submissionTime}</TableCell>
                                        <TableCell>
                                            <Button className='text-white font-semibold text-xs w-28 h-18'>
                                                <Link to={`/delegation/${delegation.id}`}>View Details</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-between w-full max-w-lg">
                        <Button className="text-white font-semibold bg-primary text-xs w-28 disabled:opacity-50" onClick={handleGetPreviousPage} disabled={!firstDoc}>Previous Page</Button>
                        <Button className="text-white font-semibold text-xs w-28 disabled:opacity-50" onClick={handleGetNextPage} disabled={!lastDoc}>Next Page</Button>
                    </div>
                </>
            )}


        </div>
    );
};

export default DelegatesArchiveComp;