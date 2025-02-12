import React, { useEffect, useState } from "react";
import { getCities, changeState, sendData } from "../../../services/deliveryCities";
import { Button } from "../../../components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "../../../components/ui/table";



const saudiCities = [
    { id: 1, en: "Riyadh", ar: "الرياض", isOpen: true },
    { id: 2, en: "Jeddah", ar: "جدة", isOpen: true },
    { id: 3, en: "Mecca", ar: "مكة المكرمة", isOpen: true },
    { id: 4, en: "Medina", ar: "المدينة المنورة", isOpen: true },
    { id: 5, en: "Dammam", ar: "الدمام", isOpen: true },
    { id: 6, en: "Khobar", ar: "الخبر", isOpen: true },
    { id: 7, en: "Taif", ar: "الطائف", isOpen: true },
    { id: 8, en: "Tabuk", ar: "تبوك", isOpen: true },
    { id: 9, en: "Buraydah", ar: "بريدة", isOpen: true },
    { id: 10, en: "Khamis Mushait", ar: "خميس مشيط", isOpen: true },
    { id: 11, en: "Hafar Al-Batin", ar: "حفر الباطن", isOpen: true },
    { id: 12, en: "Al-Kharj", ar: "الخرج", isOpen: true },
    { id: 13, en: "Najran", ar: "نجران", isOpen: true },
    { id: 14, en: "Yanbu", ar: "ينبع", isOpen: true },
    { id: 15, en: "Abha", ar: "أبها", isOpen: true },
    { id: 16, en: "Hail", ar: "حائل", isOpen: true },
    { id: 17, en: "Jubail", ar: "الجبيل", isOpen: true },
    { id: 18, en: "Al-Ahsa", ar: "الأحساء", isOpen: true },
    { id: 19, en: "Ras Tanura", ar: "رأس تنورة", isOpen: true },
    { id: 20, en: "Sakaka", ar: "سكاكا", isOpen: true },
    { id: 21, en: "Arar", ar: "عرعر", isOpen: true },
    { id: 22, en: "Al-Baha", ar: "الباحة", isOpen: true },
    { id: 23, en: "Jizan", ar: "جازان", isOpen: true },
    { id: 24, en: "Qatif", ar: "القطيف", isOpen: true },
    { id: 25, en: "Dhahran", ar: "الظهران", isOpen: true },
    { id: 26, en: "Al-Majmaah", ar: "المجمعة", isOpen: true },
    { id: 27, en: "Al-Ula", ar: "العلا", isOpen: true },
    { id: 28, en: "Rabigh", ar: "رابغ", isOpen: true },
    { id: 29, en: "Wadi ad-Dawasir", ar: "وادي الدواسر", isOpen: true },
    { id: 30, en: "Al-Muzahmiyya", ar: "المزاحمية", isOpen: true },
    { id: 31, en: "Sharurah", ar: "شرورة", isOpen: true },
    { id: 32, en: "Al-Qurayyat", ar: "القريات", isOpen: true },
    { id: 33, en: "Afif", ar: "عفيف", isOpen: true },
    { id: 34, en: "Dawadmi", ar: "الدوادمي", isOpen: true },
    { id: 35, en: "Al-Lith", ar: "الليث", isOpen: true },
    { id: 36, en: "Bisha", ar: "بيشة", isOpen: true },
    { id: 37, en: "Al-Namas", ar: "النماص", isOpen: true },
    { id: 38, en: "Al-Khafji", ar: "الخفجي", isOpen: true },
    { id: 39, en: "Thadiq", ar: "ثادق", isOpen: true },
    { id: 40, en: "Tayma", ar: "تيماء", isOpen: true },
    { id: 41, en: "Umluj", ar: "أملج", isOpen: true },
    { id: 42, en: "Rafha", ar: "رفحاء", isOpen: true },
    { id: 43, en: "Al-Wajh", ar: "الوجه", isOpen: true },
    { id: 44, en: "Al-Qunfudhah", ar: "القنفذة", isOpen: true },
    { id: 45, en: "Hotat Bani Tamim", ar: "حوطة بني تميم", isOpen: true },
    { id: 46, en: "Duba", ar: "ضباء", isOpen: true },
    { id: 47, en: "Sarat Abidah", ar: "سراة عبيدة", isOpen: true },
    { id: 48, en: "Turaif", ar: "طريف", isOpen: true },
    { id: 49, en: "Dhurma", ar: "ضرما", isOpen: true },
    { id: 50, en: "Al-Rass", ar: "الرس", isOpen: true },
    { id: 51, en: "Al-Quwayiyah", ar: "القويعية", isOpen: true },
    { id: 52, en: "Al-Bad", ar: "البدع", isOpen: true },
    { id: 53, en: "Al-Mithnab", ar: "المذنب", isOpen: true },
    { id: 54, en: "Al-Oyoun", ar: "العيون", isOpen: true },
    { id: 55, en: "Nairiyah", ar: "النعيرية", isOpen: true },
    { id: 56, en: "Al-Sulayyil", ar: "السليل", isOpen: true },
    { id: 57, en: "Al-Hanakiyah", ar: "الحناكية", isOpen: true },
    { id: 58, en: "Al-Dayer", ar: "الدائر", isOpen: true },
    { id: 59, en: "Al-Mahd", ar: "المهد", isOpen: true },
    { id: 60, en: "Al-Birk", ar: "البرك", isOpen: true },
    { id: 61, en: "Al-Hareeq", ar: "الحريق", isOpen: true },
    { id: 62, en: "Al-Artawiyah", ar: "الأرطاوية", isOpen: true },
    { id: 63, en: "Al-Khutt", ar: "الخبت", isOpen: true },
    { id: 64, en: "Al-Jafr", ar: "الجفر", isOpen: true },
    { id: 65, en: "Al-Haditha", ar: "الحديثة", isOpen: true },
    { id: 66, en: "Al-Majardah", ar: "المجاردة", isOpen: true },
    { id: 67, en: "Al-Ghat", ar: "الغاط", isOpen: true },
    { id: 68, en: "Al-Shaheed", ar: "الشاهد", isOpen: true },
    { id: 69, en: "Al-Hawiyah", ar: "الحوية", isOpen: true },
    { id: 70, en: "Al-Muzahmiyya", ar: "المزاحمية", isOpen: true },
    { id: 71, en: "Al-Khobar", ar: "الخبر", isOpen: true },
    { id: 72, en: "Al-Qarah", ar: "القارة", isOpen: true },
    { id: 73, en: "Al-Mubarraz", ar: "المبرز", isOpen: true },
    { id: 74, en: "Al-Hofuf", ar: "الهفوف", isOpen: true },
    { id: 75, en: "Al-Qatif", ar: "القطيف", isOpen: true },
    { id: 76, en: "Al-Awamiyah", ar: "العوامية", isOpen: true },
    { id: 77, en: "Al-Qudaih", ar: "القديح", isOpen: true },
    { id: 78, en: "Al-Khafji", ar: "الخفجي", isOpen: true },
    { id: 79, en: "Al-Nairyah", ar: "النعيرية", isOpen: true },
    { id: 80, en: "Al-Rakah", ar: "الراكة", isOpen: true },
    { id: 81, en: "Al-Markaz", ar: "المركز", isOpen: true },
    { id: 82, en: "Al-Hulwah", ar: "الحلوة", isOpen: true },
    { id: 83, en: "Al-Khulais", ar: "خليص", isOpen: true },
    { id: 84, en: "Al-Jumum", ar: "الجموم", isOpen: true },
    { id: 85, en: "Al-Kamil", ar: "الكامل", isOpen: true },
    { id: 86, en: "Al-Sulayyil", ar: "السليل", isOpen: true },
    { id: 87, en: "Al-Dilam", ar: "الدلم", isOpen: true },
    { id: 88, en: "Al-Sulayyil", ar: "السليل", isOpen: true },
    { id: 89, en: "Al-Hareeq", ar: "الحريق", isOpen: true },
    { id: 90, en: "Al-Artawiyah", ar: "الأرطاوية", isOpen: true },
    { id: 91, en: "Al-Khutt", ar: "الخبت", isOpen: true },
    { id: 92, en: "Al-Jafr", ar: "الجفر", isOpen: true },
    { id: 93, en: "Al-Haditha", ar: "الحديثة", isOpen: true },
    { id: 94, en: "Al-Majardah", ar: "المجاردة", isOpen: true },
    { id: 95, en: "Al-Ghat", ar: "الغاط", isOpen: true },
    { id: 96, en: "Al-Shaheed", ar: "الشاهد", isOpen: true },
    { id: 97, en: "Al-Hawiyah", ar: "الحوية", isOpen: true },
    { id: 98, en: "Al-Muzahmiyya", ar: "المزاحمية", isOpen: true },
    { id: 99, en: "Al-Khobar", ar: "الخبر", isOpen: true },
    { id: 100, en: "Al-Qarah", ar: "القارة", isOpen: true },
    { id: 101, en: "Al-Mubarraz", ar: "المبرز", isOpen: true },
    { id: 102, en: "Al-Hofuf", ar: "الهفوف", isOpen: true },
    { id: 103, en: "Al-Qatif", ar: "القطيف", isOpen: true },
    { id: 104, en: "Al-Awamiyah", ar: "العوامية", isOpen: true },
    { id: 105, en: "Al-Qudaih", ar: "القديح", isOpen: true },
    { id: 106, en: "Al-Khafji", ar: "الخفجي", isOpen: true },
    { id: 107, en: "Al-Nairyah", ar: "النعيرية", isOpen: true },
    { id: 108, en: "Al-Rakah", ar: "الراكة", isOpen: true },
    { id: 109, en: "Al-Markaz", ar: "المركز", isOpen: true },
    { id: 110, en: "Al-Hulwah", ar: "الحلوة", isOpen: true },
    { id: 111, en: "Al-Khulais", ar: "خليص", isOpen: true },
    { id: 112, en: "Al-Jumum", ar: "الجموم", isOpen: true },
    { id: 113, en: "Al-Kamil", ar: "الكامل", isOpen: true },
    { id: 114, en: "Al-Sulayyil", ar: "السليل", isOpen: true },
    { id: 115, en: "Al-Dilam", ar: "الدلم", isOpen: true },
    { id: 116, en: "Al-Sulayyil", ar: "السليل", isOpen: true },
    { id: 117, en: "Al-Hareeq", ar: "الحريق", isOpen: true },
    { id: 118, en: "Al-Khafs", ar: "الخفس", isOpen: true },
];
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

    const sendDataCities = async () => {
        await sendData({saudiCities})
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow ">
            <h2 className="text-2xl font-bold mb-4">Manage Delivery Cities</h2>
            <Button onClick={sendDataCities}>clicj</Button>

            <Table classname={"bg-white"}>
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
