import React from 'react'
import './HomePageStyles.css'
import { Link } from 'react-router-dom'
import HomePageHeading from './HomePageHeading/HomePageHeading'
import BusSection from './BusSection/BusSection'
import TrainSection from './TrainSection/TrainSection'
import FlightSection from './FlightSection/FlightSection'
import AppName from './AppName/AppName'
import Signup from '../Signup/Signup'

const HomePage = () => {
  return (
    <div className='home-page'>
      <HomePageHeading />
      <div className='sections'>
        <Link to={'/login'} state={{ type: 'bus' }}><BusSection /></Link>
        <Link to={'/login'} state={{ type: 'train' }}><TrainSection /></Link>
        <Link to={'/login'} state={{ type: 'flight' }}><FlightSection /></Link>
      </div>
      <AppName />
    </div>
  )
}

export default HomePage
