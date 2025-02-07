import React, { useContext } from 'react';
import { LanguageContext } from '../../states/LanguageContext';
import heroContent from '../../content/heroContent';
import Background from '../../assets/background/hero-section-main.webp';
import Logo from '../../assets/logo/white logo.webp';
import { Button } from '../ui/button';

const HeroSection = () => {
    const { language } = useContext(LanguageContext);

    return (
        <section
            className={`hero-section w-full flex justify-center items-start z-0 font-english  ${language === "ar" && "font-arabic"}   text-white text-center p-6 py-12 relative h-[90vh] `}
            style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'right' }}
        >
            <div className="sm:w-1/4  md:w-1/2 ">

            </div>
            <div className=" w-full sm:w-3/4 md:2/3 lg:w-1/2  flex flex-col gap-6 justify-start  items-center">
                <img src={Logo} alt="Logo" className="h-28 mr-6" />
                <div className='flex flex-col gap-4 mb-8'>
                    <h1 className='text-7xl font-bold'>{heroContent[language].title}</h1>
                    <h2 className='text-5xl font-semibold text-secondary'>{heroContent[language].subtitle}</h2>
                </div>
                <Button variant="secondary" className='text-base font-semibold cursor-pointer  '>{heroContent[language].buttonText}</Button>

            </div>
        </section>
    );
};

export default HeroSection;
