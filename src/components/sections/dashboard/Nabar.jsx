import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../../assets/logo/big logo english yellow.png";
import LogoPhone from "../../../assets/logo/logo english yellow.svg";
import { Archive, Briefcase, Bell, Loader } from 'lucide-react';
import { getColSize } from '../../../services/getData';
import MenuIcon from "../../../assets/icons/burger-menu-svgrepo-com (3).svg";
import { useAuth } from '../../../states/AuthContext';
import { Button } from '../../ui/button';

const Navbar = ({ hover }) => {
    const { logout } = useAuth();

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
        <div className='flex flex-col lg:flex-col items-center px-4 md:px-0 font-english lg:justify- bg-primary lg:min-h-screen p-2 lg:p-6  lg:w-52 w-full shadow-lg'>
            {/* Logo */}
            <div className='lg:mb-8 flex justify-between  items-center w-full '>
                <img src={Logo} alt="Logo" className='hidden lg:flex w-28 h-30 lg:ml-4 ' />
                <img src={LogoPhone} alt="Logo" className='w-24 h-16 lg:hidden' />
                <img src={MenuIcon} alt="Menu Icon" className="h-8 w-8 lg:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            </div>

            {/* Notification Bell */}
            <div className="relative hidden  lg:flex flex-col items-center mb-6">
                <Bell className="text-white w-5 h-5" />
                {!loading && totalNotifications > 0 && (
                    <span className="absolute   -top-1 -right-2 bg-red-600 text-white text-[9.5px]  font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {totalNotifications}
                    </span>
                )}
                {!loading && totalNotifications === 0 && (
                    <p className="text-gray-300 text-xs mt-4 hidden lg:flex">No New Notification.</p>
                )}
            </div>

            {/* Navigation Links */}
            <nav className={`flex flex-col gap-2 text-sm w-full ${isOpen ? 'block' : 'hidden'} lg:flex`}>

                <NavItem to="/dashboard" icon={Briefcase} label="Delegates" number={colSizeDelegates} hover={hover} hoverNumber={1} />
                <NavItem to="/dashboard" icon={Briefcase} label="Delegates" number={colSizeDelegates} hover={hover} hoverNumber={2} />
                <NavItem to="/companies-dashboard" icon={Briefcase} label="Companies" number={colSizeCompanies} hover={hover} hoverNumber={3} />
                <NavItem to="/delegates-archive" icon={Archive} label="Delegates Archive" hover={hover} hoverNumber={2} />
                <NavItem to="/companies-archive" icon={Archive} label="Companies Archive" hover={hover} hoverNumber={4} />

                <div className='my-2 self-center flex lg:hidden'>

                    <Button onClick={logout}>Logout</Button>
                </div>

            </nav>
            <div className='mt-12 hidden lg:flex'>

                <Button onClick={logout}>Logout</Button>
            </div>

        </div>
    );
};

const NavItem = ({ to, icon: Icon, label, number, hover, hoverNumber }) => {
    return (
        <Link to={to} className={`flex relative items-center gap-4 text-secondary px-8 py-3 mx-1  text-[11px] font-semibold rounded-lg transition-all duration-300 hover:bg-secondary hover:text-white ${hover !== hoverNumber && "text-white"}`}>
            <Icon className="w-4 h-4 absolute left-1" />
            {label}
            {number > 0 && (
                <span className="ml-auto text-[9.5px] absolute right-1 bg-red-600 text-white font-bold px-[7px] py-0 rounded-full">
                    {number}
                </span>
            )}
        </Link>
    );
};

export default Navbar;