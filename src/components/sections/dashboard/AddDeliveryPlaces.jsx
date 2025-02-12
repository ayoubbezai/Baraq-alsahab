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
                setCities(data?.cities || []);
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
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Manage Delivery Cities</h2>

            <Table>
                <TableHeader>
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
                            <TableCell>{city.id}</TableCell>
                            <TableCell>{city.en}</TableCell>
                            <TableCell className="text-right">{city.ar}</TableCell>
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
            </Table>
        </div>
    );
};

export default AddDeliveryPlaces;
