import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/details/${userId}`);
        const result = await response.json();

        if (response.ok) {
          setUserDetails(result);
        } else {
          setError(result.error || "Error fetching user details.");
        }
      } catch (err) {
        setError("Error fetching user details.");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <div className="container">
      <h2>User Profile</h2>
      {error && <p className="error">{error}</p>}
      {userDetails ? (
        <div>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>Gender:</strong> {userDetails.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(userDetails.dob).toLocaleDateString()}</p>
          <p><strong>Aadhaar:</strong> {userDetails.aadhaar}</p>
          <p><strong>User ID:</strong> {userDetails.userid}</p>
          <button onClick={() => navigate("/changepassword")}>Change Password</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
