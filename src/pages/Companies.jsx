import React from 'react'
import Navbar from '../components/sections/dashboard/Nabar'
import CompaniesDashboard from '../components/sections/dashboard/CompaniesDashboard'

const Companies = () => {
  return (
    <div className='flex flex-col lg:flex-row '>
      <Navbar hover={3} />
      <div className='w-full mx-auto overflow-y-auto bg-gray-100'>

        <CompaniesDashboard />
      </div>
    </div>
  )
}

export default Companies
