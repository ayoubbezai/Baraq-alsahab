import React from 'react'
import Hero from "../components/sections/mainSection/HeroSection"
import DelegateRegister from "../components/sections/userSection/DelegateRegister"
import JoinUsNavbar from "../components/layout/JoinUsNavbar"

const JoinOurFleet = () => {
    return (
        <div>
            <JoinUsNavbar />
            <Hero />
            <DelegateRegister />
        </div>
    )
}

export default JoinOurFleet
