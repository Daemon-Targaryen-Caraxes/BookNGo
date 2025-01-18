import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PassengerDetails = () => {
  const location = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/user/${location.pathname.slice(1)}`);
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }, [])

  return (
    <div className='text-white'>
      <div>Passenger Name: </div>
      <div>Gender: </div>
      <div>Phone Number: </div>
      <div>Date of Birth: </div>
      <div>Aadhar No: </div>
    </div>
  )
}

export default PassengerDetails
