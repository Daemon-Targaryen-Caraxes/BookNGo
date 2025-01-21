import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/userside/Userlogin";
import SignUp from "./components/userside/Usersignup";
import AdminLogin from './components/adminside/Adminlogin';
import TravelSearchForm from "./components/userside/TravelSearchForm";
import Admin from './components/adminside/Admin';
import Enquiry from './components/adminside/Enquiry';
import AddTransport from './components/adminside/AddTransport';
import PassengerEnquiry from './Components/AdminSide/PassengerEnquiry';
import PassengerDetails from './Components/AdminSide/PassengerDetails';
import SearchResults from './components/userside/SearchResults';
import BookingForm from './components/userside/BookingForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TravelSearchForm" element={<TravelSearchForm />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path='/adminEnquiry' element={<Admin />} />
        <Route path="/AddTransport" element={<AddTransport />} />
        <Route path='/passengerEnquiry' element={<PassengerEnquiry />} />
        <Route path='/:userPhone' element={<PassengerDetails />} />
        <Route path='/searchResults' element={<SearchResults/>}/>
        <Route path="/booking" element={<BookingForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
