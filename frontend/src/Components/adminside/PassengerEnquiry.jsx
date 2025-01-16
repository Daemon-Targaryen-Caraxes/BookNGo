import React from 'react'

const PassengerEnquiry = () => {
  return (
    <div className='text-center'>
      <h1>Passenger Enquiry</h1>
      <form>
        <label htmlFor="phone-number">Phone No.</label>
        <input type="number" name="phone-number" id="phone-number" />
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default PassengerEnquiry
