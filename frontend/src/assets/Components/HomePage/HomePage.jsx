import React from 'react'
import './HomePageStyles.css'
import HomePageHeading from './HomePageHeading/HomePageHeading'
import BusSection from './BusSection/BusSection'
import TrainSection from './TrainSection/TrainSection'
import FlightSection from './FlightSection/FlightSection'

const HomePage = () => {
  return (
    <div className='home-page'>
      <HomePageHeading />
      <BusSection />
      <TrainSection />
      <FlightSection />
    </div>
  )
}

export default HomePage
