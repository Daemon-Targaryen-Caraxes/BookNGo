import HomePage from "./Components/HomePage/HomePage";
import './App.css'
import LoginPage from "./Components/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Signup from "./Components/Signup/Signup";
import Train from "./Components/Train-ticket";
import SearchForm from "./Components/searchresult/TrainSearchResult.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/trainResult' element={<Train/>}/>
        <Route path='/train' element={<SearchForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
