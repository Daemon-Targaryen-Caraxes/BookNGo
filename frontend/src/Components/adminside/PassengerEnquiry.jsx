import React from 'react'

const PassengerEnquiry = () => {
  return (
    <div className='text-center my-40'>
      <h1 className='text-4xl'>Passenger Enquiry</h1>
      <div>
        <label htmlFor="phone-number" className='mr-1 text-lg'>Phone No.</label>
        <input type="number" name="phone-number" id="phone-number" style={{width: "30%", padding: "5px", margin: "0",}}/>
      </div>
        <button>Search</button>
    </div>
  )
}

export default PassengerEnquiry
