import React from 'react'
import Header from '../../Components/Landing/Header'
import '../../Components/Landing/LandingPage.css'
import SecServices from '../../Components/Landing/Services'
import AboutUS from '../../Components/Landing/AboutUs'
import Interesting from '../../Components/Landing/Intersted'
import FeaturesSection from '../../Components/Landing/Feature'
import Footer from '../../Components/Landing/Footer'
import ScrollTopBtn from '../../Components/Landing/ScrollTop'
import ContactPhone from '../../Components/Landing/Contact'
const LandingPage = () => {
  return (
    <div className='bg-white'>
     <Header/> 
     <AboutUS/>
     <SecServices/>
     <Interesting/>
     <FeaturesSection/>
     <Footer/>
     <ScrollTopBtn/>
     <ContactPhone/>
    </div>
  )
}

export default LandingPage
