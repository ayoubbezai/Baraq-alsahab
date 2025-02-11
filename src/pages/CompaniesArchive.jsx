import React from 'react'
import Navbar from '../components/sections/dashboard/Nabar'
import CompaniesArchiveComp from '../components/sections/dashboard/CompaniesArchiveComp'
const CompaniesArchive = () => {
  return (
    <div className='flex flex-col lg:flex-row '>
      <Navbar hover={4} />
      <div className='w-full mx-auto overflow-y-auto'>

        <CompaniesArchiveComp />
      </div>
    </div>
  )
}

export default CompaniesArchive
