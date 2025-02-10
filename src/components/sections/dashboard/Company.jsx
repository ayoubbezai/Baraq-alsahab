'use client';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneUserData } from "../../../services/getData";
import { deleteOneUserData } from "../../../services/deleteUser";
import { storeData } from "../../../services/sendData";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast, { Toaster } from "react-hot-toast";

const Company = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        const getCompanyData = async () => {
            if (id) {
                try {
                    const data = await getOneUserData(id, "Companies");
                    setCompanyData(data);
                } catch (error) {
                    console.error("Error fetching company data:", error);
                }
            }
        };
        getCompanyData();
    }, [id]);

    const handleAction = async (status) => {
        if (!companyData) return;

        const archivedData = {
            ...companyData,
            status,
            archivedAt: new Date().toLocaleString(),
        };

        try {
            await storeData(archivedData, "archive companies");
            await deleteOneUserData(id, "Companies");

            toast.success(`Company ${status.toLowerCase()} successfully!`);
            navigate("/dashboard");
        } catch (error) {
            console.error(`Error processing company (${status}):`, error);
            toast.error("Failed to process request.");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved": return "text-green-500";
            case "Rejected": return "text-red-500";
            default: return "text-yellow-500";
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Toaster />
            <div className="bg-primary shadow-lg flex flex-col mx-2 my-4 md:m-0 md:flex-row-reverse gap-12 justify-center md:justify-between items-center rounded-2xl p-6 max-w-3xl w-full">
                {companyData ? (
                    <>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-center text-secondary mb-4">
                                {companyData.companyName}
                            </h2>
                            <p className="text-gray-100 mb-2"><strong>Entity Type:</strong> {companyData.entityType}</p>
                            <p className="text-gray-100 mb-2"><strong>Sector Type:</strong> {companyData.sectorType}</p>
                            <p className="text-gray-100 mb-2"><strong>Service Description:</strong> {companyData.serviceDescription}</p>
                            <p className="text-gray-100 mb-2"><strong>Address:</strong> {companyData.address}</p>
                            <p className="text-gray-100 mb-2"><strong>Submitted:</strong> {companyData.submissionTime}</p>
                            <p className={`text-base font-semibold mb-2 ${getStatusColor(companyData.status)}`}>
                                Status: <span className="text-[15px]">{companyData.status || "Pending"}</span>
                            </p>
                        </div>

                        <div className="w-full md:w-1/2">
                            {companyData.images && companyData.images.length > 0 && (
                                <Carousel showThumbs={false} className="rounded-lg overflow-hidden w-full">
                                    {companyData.images.map((img, index) => (
                                        <div key={index}>
                                            <img src={img} alt={`Company Image ${index + 1} `} className="rounded-lg" />
                                        </div>
                                    ))}
                                </Carousel>
                            )}

                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={() => handleAction("Approved")}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleAction("Rejected")}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Company;
