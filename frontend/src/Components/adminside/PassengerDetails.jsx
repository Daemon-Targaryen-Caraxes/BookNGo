import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PassengerDetails = () => {
  const [fetchedData, setFetchedData] = useState({});
  const location = useLocation();
  console.log(fetchedData);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/user/${location.pathname.slice(1)}`);
      const data = await response.json();
      setFetchedData(data);
    }
    fetchData();
  }, []);

  const { username, phone, gender, dob, userid, aadhaar } = fetchedData;
  // console.log(username, phone, gender, dob, userid, aadhaar);
  console.log(phone.slice(0,10));

  return (
    <div className='m-auto my-24 w-96 p-5 text-white'>
      <h1 className='text-center text-3xl'>Passenger Details</h1>
      <div>Passenger Name: {username}</div>
      <div>Passenger ID: {userid}</div>
      <div>Gender: {gender}</div>
      <div>Phone Number: {phone}</div>
      <div>Date of Birth: {dob && dob.slice(0, 10)}</div>
      <div>Aadhar No: {aadhaar}</div>
    </div>
  )
}

export default PassengerDetails
