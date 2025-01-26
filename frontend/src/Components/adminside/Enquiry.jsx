import React from 'react';
import { useNavigate } from 'react-router-dom';
const Enquiry = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="admin-container">
        <h1>Admin</h1>
        <button onClick={() => navigate('/adminEnquiry')}>Admin Enquiry</button>
        <button onClick={() => navigate('/AddTransport')}>Add Train/Flight/Bus</button>
      </div>
    </>
  );
}

export default Enquiry
