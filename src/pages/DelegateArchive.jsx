import React from 'react'
import Navbar from '../components/sections/dashboard/Nabar'
import DelegatesArchiveComp from '../components/sections/dashboard/DelegatesArchiveComp'

const DelegateArchive = () => {
  return (
    <div className='flex flex-col lg:flex-row '>
      <Navbar hover={2} />
      <div className='w-full mx-auto h-screen overflow-y-auto bg-gray-100'>

        <DelegatesArchiveComp />
      </div>
    </div>
  )
}

export default DelegateArchive
