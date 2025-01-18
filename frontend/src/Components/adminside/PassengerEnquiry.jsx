import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PassengerEnquiry = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log(phone.length);
  const handleSearch = () => {
    console.log("hi");
    if (phone.length === 10) {
      navigate(`/${phone}`);
    } else {
      setError("Invalid Number");
    }
  }

  return (
    <div className='text-center m-auto my-24 w-96 p-5'>
      <h1 className='text-3xl text-white'>Passenger Enquiry</h1>
      <div className='text-red-500'>{error}</div>
      <div>
        <label htmlFor="phone-number" className='mr-1 text-lg float-left block'>Phone No.</label>
        <input type="number" name="phone-number" id="phone-number" style={{ width: "80%", padding: "5px", margin: "0", }} onChange={(event) => setPhone(event.target.value)} required />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default PassengerEnquiry
