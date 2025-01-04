import HomePage from "./Components/HomePage/HomePage";
import './App.css'
import LoginPage from "./Components/UserLogin/UserLogin.jsx";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Signup from "./Components/Signup/Signup";
import SearchPage from "./Components/SearchPage/SearchPage";
import Train from "./Components/Train-ticket";
import SearchForm from "./Components/searchresult/TrainSearchResult.jsx";
import Paymentpages from "./Components/Paymentpages/Paymentpages.jsx";
import UserOrAdmin from "./Components/UserOrAdmin/UserOrAdmin.jsx";
import DoUHaveAccount from "./Components/DoUHaveAccount/DoUHaveAccount.jsx";
import UserLogin from "./Components/UserLogin/UserLogin.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<UserOrAdmin />} />
          <Route path="user" >
            <Route index element={<DoUHaveAccount />}></Route>
            <Route path="login" element={<UserLogin />}></Route>
          </Route>
          <Route path="admin">

          </Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/payment" element={<Paymentpages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
