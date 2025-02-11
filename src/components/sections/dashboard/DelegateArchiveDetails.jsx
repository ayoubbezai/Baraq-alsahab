import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArchiveData } from "../../../services/getData";
import { deleteUserArchive } from "../../../services/deleteUser"; // Correct function name
import { updateArchiveData } from "../../../services/UpdateData"; // Correct import
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast, { Toaster } from "react-hot-toast";
const DelegateArchiveDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [delegateData, setDelegateData] = useState(null);

    useEffect(() => {
        const getDelegateData = async () => {
            
            if (id) {
                try {
                    const data = await getArchiveData(id, "archive Delegation");
                    setDelegateData(data);
                } catch (error) {
                    console.error("Error fetching delegate data:", error);
                }
            }
        };
        getDelegateData();
    }, [id]);

    const handleRemove = async () => {
        if (!delegateData) return;

        try {
            await deleteUserArchive(id, "archive Delegation");
            toast.success("Delegate removed from archive successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error removing delegate from archive:", error);
            toast.error("Failed to remove delegate.");
        }
    };

    const handleToggleApproval = async () => {
        if (!delegateData) return;

        const updatedStatus = delegateData.status === "Approved" ? "Rejected" : "Approved";
        const updatedData = { ...delegateData, status: updatedStatus };

        try {
            await updateArchiveData(updatedData, id, "archive Delegation");
            setDelegateData(updatedData);
            toast.success(`Delegate status changed to ${updatedStatus}!`);
        } catch (error) {
            console.error("Error updating delegate status:", error);
            toast.error("Failed to update status.");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
                return "text-green-500";
            case "Rejected":
                return "text-red-500";
            default:
                return "text-yellow-500";
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Toaster />
            <div className="bg-primary shadow-lg flex flex-col mx-2 my-4 md:m-0 md:flex-row-reverse gap-12 justify-center md:justify-between items-center rounded-2xl p-6 max-w-3xl w-full">
                {delegateData ? (
                    <>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-center text-secondary mb-4">
                                {delegateData?.delegateName}
                            </h2>
                            <p className="text-gray-100 mb-2"><strong>Position:</strong> {delegateData?.position}</p>
                            <p className="text-gray-100 mb-2"><strong>Company:</strong> {delegateData?.company}</p>
                            <p className="text-gray-100 mb-2"><strong>Email:</strong> {delegateData?.email}</p>
                            <p className="text-gray-100 mb-2"><strong>Phone:</strong> {delegateData?.phone}</p>
                            <p className="text-gray-100 mb-2"><strong>Submitted:</strong> {delegateData?.submissionTime}</p>
                            <p className={`text-base font-semibold mb-2 ${getStatusColor(delegateData?.status)}`}>
                                Status: <span className="text-[15px]">{delegateData?.status || "Pending"}</span>
                            </p>
                        </div>

                        <div className="w-full md:w-1/2">
                            {delegateData?.images && delegateData?.images.length > 0 && (
                                <Carousel showThumbs={false} className="rounded-lg overflow-hidden w-full">
                                    {delegateData.images.map((img, index) => (
                                        <div key={index}>
                                            <img src={img} alt={`Delegate Image ${index + 1}`} className="rounded-lg" />
                                        </div>
                                    ))}
                                </Carousel>
                            )}

                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={handleRemove}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={handleToggleApproval}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {delegateData?.status === "Approved" ? "Move to Rejected" : "Approve"}
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

export default DelegateArchiveDetails;
