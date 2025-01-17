import React from 'react'

const PassengerEnquiry = () => {
  return (
    <div className='text-center m-auto my-24 w-96 p-5'>
      <h1 className='text-5xl text-white'>Passenger Enquiry</h1>
      <div>
        <label htmlFor="phone-number" className='mr-1 text-lg float-left block'>Phone No.</label>
        <input type="number" name="phone-number" id="phone-number" style={{width: "80%", padding: "5px", margin: "0",}}/>
      </div>
        <button>Search</button>
    </div>
  )
}

export default PassengerEnquiry
