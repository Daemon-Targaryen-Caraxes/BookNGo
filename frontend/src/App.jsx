import HomePage from "./Components/HomePage/HomePage";
import './App.css'
import LoginPage from "./Components/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
