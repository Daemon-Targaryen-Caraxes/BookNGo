import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/userside/Userlogin";
import SignUp from "./components/userside/Usersignup";
import AdminLogin from './components/adminside/Adminlogin';
import TravelSearchForm from "./components/userside/TravelSearchForm";
import SearchResults from './components/userside/SearchResults';
import BookingForm from './components/userside/BookingForm';
import Enquiry from './components/adminside/Enquiry';
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AddTransport" element={<AddTransport />} />
        <Route path="/" element={<AdminLayout/>}>
          <Route path="/changeadminpassword" element={<ChangeadminPassword/>} />
          <Route path="/adminprofile" element={<AdminProfile/>} />
          <Route path="/editprofile" element={<EditAdmin/>} />
          <Route path="/TravelSearchForm" element={<TravelSearchForm />} />
          <Route path="/searchResults" element={<SearchResults />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/bookedhistory" element={<BookedHistory />} />
          <Route path='/confirmation' element={<ConfirmationPage />} />
          <Route path='/selecttraveloption' element={<SelectOptionPage />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/userprofile" element={<Profile />} />
          <Route path="/TravelSearchForm" element={<TravelSearchForm />} />
          <Route path="/searchResults" element={<SearchResults />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/bookedhistory" element={<BookedHistory />} />
          <Route path='/confirmation' element={<ConfirmationPage />} />
          <Route path='/selecttraveloption' element={<SelectOptionPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
