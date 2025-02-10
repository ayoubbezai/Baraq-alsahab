import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../../assets/logo/big logo english yellow.png";
import LogoPhone from "../../../assets/logo/logo english yellow.svg";
import { Archive, Briefcase, Bell, Loader } from 'lucide-react';
import { getColSize } from '../../../services/getData';
import MenuIcon from "../../../assets/icons/burger-menu-svgrepo-com (3).svg";

const Navbar = ({ hover }) => {
    const [colSizeDelegates, setColSizeDelegates] = useState(0);
    const [colSizeCompanies, setColSizeCompanies] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchAndCacheSize = async (collectionName, setter, storageKey) => {
            try {
                let cachedSize = sessionStorage.getItem(storageKey);
                if (cachedSize !== null) {
                    setter(Number(cachedSize));
                    const size = await getColSize(collectionName);
                    // Here, compare the cached size with the fetched size and update if changed
                    if (size !== Number(cachedSize)) {
                        setter(size);
                        sessionStorage.setItem(storageKey, size);
                    }
                    return;
                }

                else {
                    const size = await getColSize(collectionName);

                    setter(size);
                    sessionStorage.setItem(storageKey, size);
                }
            } catch (error) {
                console.error(`Error fetching ${collectionName} size:`, error);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                fetchAndCacheSize("Delegates", setColSizeDelegates, "colSizeDelegates"),
                fetchAndCacheSize("Companies", setColSizeCompanies, "colSizeCompanies")
            ]);
            setLoading(false);
        };
        fetchData();
    }, []);

    const totalNotifications = useMemo(() => colSizeDelegates + colSizeCompanies, [colSizeDelegates, colSizeCompanies]);

    return (
        <div className='flex flex-col lg:flex-col items-center px-4 md:px-0 lg:justify-start bg-primary lg:min-h-screen p-2 lg:p-6  lg:w-52 w-full shadow-lg'>
            {/* Logo */}
            <div className='lg:mb-8 flex justify-between  items-center w-full '>
                <img src={Logo} alt="Logo" className='hidden lg:flex w-28 h-30 lg:ml-4 ' />
                <img src={LogoPhone} alt="Logo" className='w-24 h-16 lg:hidden' />
                <img src={MenuIcon} alt="Menu Icon" className="h-8 w-8 lg:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            </div>

            {/* Notification Bell */}
            <div className="relative hidden lg:block mb-6">
                <Bell className="text-white w-5 h-5" />
                {!loading && totalNotifications > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {totalNotifications}
                    </span>
                )}
            </div>

            {/* Navigation Links */}
            <nav className={`flex flex-col gap-2 text-sm w-full ${isOpen ? 'block' : 'hidden'} lg:flex`}>

                <NavItem to="/dashboard" icon={Briefcase} label="Delegates" number={colSizeDelegates} hover={hover} />
                <NavItem to="/delegates-archive" icon={Archive} label="Delegates Archive" hover={hover} />
                <NavItem to="/companies-dashboard" icon={Briefcase} label="Companies" number={colSizeCompanies} hover={hover} />
                <NavItem to="/companies-archive" icon={Archive} label="Companies Archive" hover={hover} />

            </nav>

            {/* Show message if no elements exist */}
            {!loading && totalNotifications === 0 && (
                <p className="text-white text-sm mt-4">No elements found.</p>
            )}
        </div>
    );
};

const NavItem = ({ to, icon: Icon, label, number, hover }) => {
    return (
        <Link to={to} className={`flex relative items-center gap-4 text-secondary px-8 py-3 mx-1  text-[14px] font-semibold rounded-lg transition-all duration-300 hover:bg-secondary hover:text-white ${hover !== number && "text-white"}`}>
            <Icon className="w-5 h-5 absolute left-1" />
            {label}
            {number > 0 && (
                <span className="ml-auto absolute right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {number}
                </span>
            )}
        </Link>
    );
};

export default Navbar;