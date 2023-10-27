import React, { useEffect, useState, createContext, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "./firebase-config";
import UpdateCustomer from "./components/UpdateCustomer";
import DeleteCustomer from "./components/DeleteCustomer";
import ShowCustomer from "./components/ShowCustomer";
import HomeCustomer from "./components/HomeCustomer";
import AddCustomer from "./components/AddCustomer";
import Welcome from "./components/Welcome";
import LoginForm from "./components/LogInForm";
import Signup from "./components/Signup";
import AppointmentList from "./components/AppointmentList";
import BookingPage from "./components/BookingPage";
import CustomerProfile from "./components/CustomerProfile";
import ThemeChanger from "./components/ThemeChanger";
import "./App.css";
export const ThemeContext = createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [customerProfile, setCustomerProfile] = useState({});
  const [theme, setTheme] = useState("light");

  //theme changer
  const updateThemeState = (newValue) => {
    setTheme(newValue);
  };
  console.log("new theme", theme);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        findUser(user);

        setUser(user.email);
        console.log("first", user);
        navigate("/Home"); // Redirect to /Home
        console.log(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const findUser = async (user) => {
    const response = await axios
      .get(`http://localhost:5000/customer/get-user?email=${user.email}`)
      .then((res) => {
        setUserData(res.data.customerData);
        setCustomerProfile(res.data.foundUser);
      });
  };

  return (
    <div className={`App App--container--${theme}`}>
      <ThemeContext.Provider value={{ theme, updateThemeState }}>
        <Routes>
          <Route path="/customerProfile" element={<CustomerProfile />} />
          <Route path="/Bookingpage" element={<BookingPage />} />
          <Route
            path="/Appointments"
            element={<AppointmentList user={userData} />}
          />
          <Route path="/theme--changer" element={<ThemeChanger />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/Home" /> : <Welcome />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/login" /> : <Signup />}
          />
          <Route
            path="/Home"
            element={
              user ? (
                <HomeCustomer sharedData={userData} profile={customerProfile} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/add" element={<AddCustomer />} />
          <Route path="/edit/:id" element={<UpdateCustomer />} />
          <Route path="/delete/:id" element={<DeleteCustomer />} />
          <Route path="/show/:id" element={<ShowCustomer />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
