import React, { useState } from 'react'

const PassengerEnquiry = () => {
  const [phone, setPhone] = useState();
  console.log(phone);
  const handleSearch = async () => {
    console.log('hi');
    try{
      const response = await fetch(`http://localhost:3000/user/${phone}`);
      const data = await response.json();
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className='text-center m-auto my-24 w-96 p-5'>
      <h1 className='text-5xl text-white'>Passenger Enquiry</h1>
      <div>
        <label htmlFor="phone-number" className='mr-1 text-lg float-left block'>Phone No.</label>
        <input type="number" name="phone-number" id="phone-number" style={{ width: "80%", padding: "5px", margin: "0", }} onChange={(event) => setPhone(event.target.value)} required />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default PassengerEnquiry
