import React, { useEffect, useState } from 'react'
import { getPlaces } from '../services/getData'
const Places = () => {
    const [placesData, setPlacesData] = useState(null)

    useEffect(() => {
        const handleGetPlaces = async () => {
            const data = await getPlaces()
            setPlacesData(data)
        }
        handleGetPlaces()
    }, [])
    console.log(placesData)
    return (
        <div>
            hi places
        </div>
    )
}

export default Places
