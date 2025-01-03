import HomePage from "./Components/HomePage/HomePage";
import './App.css'
import LoginPage from "./Components/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Signup from "./Components/Signup/Signup";
import SearchPage from "./Components/SearchPage/SearchPage";
import Train from "./Components/Train-ticket";
import SearchForm from "./Components/searchresult/TrainSearchResult.jsx";
import Paymentpages from "./Components/Paymentpages/Paymentpages.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/payment" element={<Paymentpages/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
