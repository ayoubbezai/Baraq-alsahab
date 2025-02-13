import React, { useEffect, useState } from "react";
import { getCities, changeState } from "../../../services/deliveryCities";
import { Button } from "../../../components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "../../../components/ui/table";



const AddDeliveryPlaces = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const handleGetCities = async () => {
            try {
                const data = await getCities();
                console.log(data)
                setCities(data?.saudiCities || []);
            } catch (e) {
                console.error(e);
            }
        };

        handleGetCities();
    }, []);

    const toggleCityState = async (cityId, isOpen) => {
        try {
            await changeState(cityId, !isOpen);
            setCities((prevCities) =>
                prevCities.map((city) =>
                    city.id === cityId ? { ...city, isOpen: !isOpen } : city
                )
            );
        } catch (error) {
            console.error("Error updating city state:", error);
        }
    };



    return (
        <div className="py-6 px-2 md:px-6 bg-gray-100 rounded-lg shadow ">
            <h2 className="text-2xl font-bold mb-4">Manage Delivery Cities</h2>


          <div className='flex mx-auto w-full items-start justify-start   overflow-auto'>
                <table className='w-full overflow-auto bg-white'>                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>English Name</TableHead>
                        <TableHead>Arabic Name</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cities.map((city) => (
                        <TableRow key={city.id}>
                            <TableCell classname={"hidden md:flex"}>{city.id}</TableCell>
                            <TableCell>{city.en}</TableCell>
                            <TableCell classname="text-right">{city.ar}</TableCell>
                            <TableCell>
                                <Button
                                    variant={city.isOpen ? "secondary" : "default"}
                                    onClick={() => toggleCityState(city.id, city.isOpen)}
                                    className="text-white w-28"
                                >
                                    {city.isOpen ? "Remove" : "Add"}
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

export default AddDeliveryPlaces;
