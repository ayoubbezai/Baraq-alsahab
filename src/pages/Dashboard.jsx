import React from 'react'
import Navbar from '../components/sections/dashboard/Nabar'
import HomeSection from "../components/sections/dashboard/HomeSection"
const Dashboard = () => {
    return (
        <div className='flex flex-col lg:flex-row '>
            <Navbar hover={1} />
            <div className='w-full mx-auto'>

                <HomeSection />
            </div>
        </div>
    )
}

export default Dashboard
