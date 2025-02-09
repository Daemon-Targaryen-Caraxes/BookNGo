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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AddTransport" element={<AddTransport />} />
        <Route path="/" element={<Layout />}>
          <Route path="/TravelSearchForm" element={<TravelSearchForm />} />
          <Route path="/searchResults" element={<SearchResults />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path='/selecttraveloption' element={<SelectOptionPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
