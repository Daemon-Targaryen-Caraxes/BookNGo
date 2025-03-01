import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/userside/Userlogin";
import SignUp from "./components/userside/Usersignup";
import AdminLogin from './components/adminside/Adminlogin';
import TravelSearchForm from "./components/userside/TravelSearchForm";
import SearchResults from './components/userside/SearchResults';
import BookingForm from './components/userside/BookingForm';
import AddTransport from './components/adminside/AddTransport';
import Layout from './components/Layout';
import SelectOptionPage from './components/userside/Selectoption';
import Profile from './components/userside/Userprofile';
import ChangePassword from './components/userside/Changepassword';
import ConfirmationPage from './components/userside/ConfirmationPage';
import BookedHistory from './components/userside/bookedHistory';
import AdminLayout from './components/adminside/AdminLayout';
import ChangeadminPassword from './components/adminside/changeadminpassword';
import AdminProfile from './components/adminside/adminprofile';
import EditAdmin from './components/adminside/editprofile';
import AddAdmin from './components/adminside/Addadmin';
import Updateuserprofile from './components/userside/updateuserprofile';
import PassengerEnquiry from './components/adminside/PassengerEnquiry';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/" element={<AdminLayout/>}>
          <Route path="/changeadminpassword" element={<ChangeadminPassword/>} />
          <Route path="/AddTransport" element={<AddTransport />} />
          <Route path="/adminprofile" element={<AdminProfile/>} />
          <Route path="/editadminprofile" element={<EditAdmin/>} />
          <Route path="/adminTravelSearchForm" element={<TravelSearchForm />} />
          <Route path="/adminsearchResults" element={<SearchResults />} />
          <Route path="/adminbooking" element={<BookingForm />} />
          <Route path="/enquiry" element={<PassengerEnquiry/>}/>
          <Route path='/adminconfirmation' element={<ConfirmationPage />} />
          <Route path='/adminselecttraveloption' element={<SelectOptionPage />} />
          <Route path='/addadmin' element={<AddAdmin/>} />

        </Route>
        <Route path="/" element={<Layout />}>
          <Route path='/Updateuserprofile' element={<Updateuserprofile/>}/>
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/userprofile" element={<Profile />} />
          <Route path="/TravelSearchForm" element={<TravelSearchForm />} />
          <Route path="/searchResults" element={<SearchResults />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/bookedhistory" element={<BookedHistory />} />
          <Route path='/confirmation' element={<ConfirmationPage />} />
          <Route path='/selecttraveloption' element={<SelectOptionPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');

//   const handleSendMessage = () => {
//     if (!phoneNumber || !message) {
//       alert('Please provide both phone number and message');
//       return;
//     }
//     const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappURL, '_blank');
//     setStatus('Message link opened in WhatsApp');
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Send WhatsApp Message</h1>
        
//         <div className="form-container">
//           <input
//             type="text"
//             className="input-field"
//             placeholder="Enter Phone Number (e.g., +11234567890)"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//           />
//           <textarea
//             className="input-field"
//             placeholder="Enter Message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button className="send-button" onClick={handleSendMessage}>
//             Send Message
//           </button>
//         </div>
        
//         {status && <p className="status">{status}</p>}
//       </header>
//     </div>
//   );
// }

// export default App;
