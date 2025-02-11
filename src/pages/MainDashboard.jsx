import React from 'react'
import Navbar from '../components/sections/dashboard/Nabar'
import MainComp from "../components/sections/dashboard/MainDashComp"

const MainDashboard = () => {
  return (
      <div className='flex flex-col lg:flex-row '>
          <Navbar hover={1} />
          <div className='w-full mx-auto overflow-y-auto bg-gray-100'>

              <MainComp />
          </div>
      </div>
  )
}

export default MainDashboard
