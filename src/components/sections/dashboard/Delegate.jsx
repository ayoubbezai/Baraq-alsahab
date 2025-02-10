import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneUserData } from "../../../services/getData";
import { deleteOneUserData } from "../../../services/deleteUser";
import { storeData } from "../../../services/sendData";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast, { Toaster } from "react-hot-toast";

const Delegate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            if (id) {
                try {
                    const data = await getOneUserData(id, "Delegates");
                    setUserData(data);
                } catch (error) {
                    console.error("Error fetching delegate data:", error);
                }
            }
        };
        getUserData();
    }, [id]);

    const handleAction = async (status) => {
        if (!userData) return;

        const archivedData = {
            ...userData,
            status,
            archivedAt: new Date().toLocaleString(),
        };

        try {
            await storeData(archivedData, "archive Delegation");
            await deleteOneUserData(id, "Delegates");

            toast.success(`User ${status.toLowerCase()} successfully!`);
            navigate("/dashboard");
        } catch (error) {
            console.error(`Error processing delegate (${status}):`, error);
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
            <div className="bg-primary shadow-lg rounded-2xl p-6 max-w-lg w-full">
                {userData ? (
                    <>
                        <h2 className="text-3xl font-bold text-center text-secondary mb-4">
                            {userData.firstName} {userData.lastName}
                        </h2>
                        <p className="text-gray-100 mb-2"><strong>Email:</strong> {userData.email}</p>
                        <p className="text-gray-100 mb-2"><strong>Phone:</strong> {userData.phone}</p>
                        <p className="text-gray-100 mb-2"><strong>Address:</strong> {userData.address}</p>
                        <p className="text-gray-100 mb-2"><strong>Submitted:</strong> {userData.submissionTime}</p>
                        <p className={`text-base font-semibold mb-2 ${getStatusColor(userData.status)}`}>
                            Status:  <span className="text-[17px]">{userData.status || "Pending"}</span>
                        </p>

                        {userData.images && userData.images.length > 0 && (
                            <Carousel showThumbs={false} className="rounded-lg overflow-hidden w-full">
                                {userData.images.map((img, index) => (
                                    <div key={index}>
                                        <img src={img} alt={`User Image ${index + 1} `} className="rounded-lg " />
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
                    </>
                ) : (
                    <p className="text-center text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Delegate;
