import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../../assets/logo/big logo english yellow.png";
import { Archive, Briefcase } from 'lucide-react';
import { LanguageContext } from '../../../states/LanguageContext';

const Navbar = ({ hover }) => {

    return (
        <div className='flex flex-col items-center bg-primary min-h-screen p-6 w-52 shadow-lg'>
            {/* Logo */}
            <div className='mb-8'>
                <img src={Logo} alt="Logo" className='w-28 h-30 ' />
            </div>

            {/* Navigation Links */}
            <nav className='flex flex-col gap-3 w-full'>

                {/* New Links */}
                <NavItem to="dashboard" icon={<Briefcase size={18} />} label="Delegates" number="1" hover={hover} />
                <NavItem to="/delegates-archive" icon={<Archive size={30} />} label="Delegates Archive" number="2" hover={hover} />
                <NavItem to="/companies-dashboard" icon={<Briefcase size={18} />} label="Companies" number="3" hover={hover} />
                <NavItem to="/companies-archive" icon={<Archive size={30} />} label="Companies Archive" number="4" hover={hover} />
            </nav>
        </div>
    );
};

const NavItem = ({ to, icon, label, number, hover }) => {
    return (
        <Link to={to} className={`flex items-center gap-4 text-secondary px-4 py-3  text-[14px] font-semibold rounded-lg transition-all duration-300 hover:bg-secondary hover:text-white ${hover != number && "text-white"}`}>
            {icon}
            {label}
        </Link>
    );
};

export default Navbar;
