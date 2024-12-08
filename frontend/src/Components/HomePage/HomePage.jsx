import React from 'react'
import './HomePageStyles.css'
import HomePageHeading from './HomePageHeading/HomePageHeading'
import BusSection from './BusSection/BusSection'
import TrainSection from './TrainSection/TrainSection'
import FlightSection from './FlightSection/FlightSection'
import AppName from './AppName/AppName'

const HomePage = () => {
  return (
    <div className='home-page'>
      <HomePageHeading />
      <div className='sections'>
        <BusSection />
        <TrainSection />
        <FlightSection />
      </div>
      <AppName />
    </div>
  )
}

export default HomePage
