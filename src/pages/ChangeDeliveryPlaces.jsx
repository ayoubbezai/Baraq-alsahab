import React from 'react'
import Navbar from '../components/sections/dashboard/Nabar'
import AddDeliveryPlaces from '../components/sections/dashboard/AddDeliveryPlaces'

const ChangeDeliveryPlaces = () => {
  return (
      <div className='flex flex-col lg:flex-row '>
          <Navbar hover={6} />
          <div className='w-full mx-auto overflow-y-auto bg-gray-100'>

              <AddDeliveryPlaces />
          </div>
      </div>
  )
}

export default ChangeDeliveryPlaces
