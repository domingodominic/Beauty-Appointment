import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "./firebase-config"; // Make sure to replace with your Firebase configuration

import UpdateCustomer from "./components/UpdateCustomer";
import DeleteCustomer from "./components/DeleteCustomer";
import ShowCustomer from "./components/ShowCustomer";
import HomeCustomer from "./components/HomeCustomer";
import AddCustomer from "./components/AddCustomer";
import Spinner from "./components/Spinner";
import Welcome from "./components/Welcome";
import LoginForm from "./components/LogInForm";
import Signup from "./components/Signup";
import OpenLoader from "./components/OpenLoader";
import LoginSpinner from "./components/LoginSpinner";
import AppointmentList from "./components/AppointmentList";
import BookingPage from "./components/BookingPage";
import CustomerProfile from "./components/CustomerProfile";
import SkeletonLoading from "./components/SkeletonLoading";

import "./App.css";
import { async } from "@firebase/util";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        findUser(user);
        console.log(user.email);
        setUser(user.email);
        console.log("first", user);
        navigate("/Home"); // Redirect to /Home
        console.log(user);
      } else {
        setUser(null);
        console.log("Go");
      }
    });

    return () => unsubscribe(); // Cleanup when the component unmounts
  }, [navigate]);

  const findUser = async (user) => {
    const response = await axios
      .get(`http://localhost:5000/customer/get-user?email=${user.email}`)
      .then((res) => setUserData(res.data[0]));
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/skeleton-loading" element={<SkeletonLoading />} />
        <Route path="/customerProfile" element={<CustomerProfile />} />
        <Route path="/Bookingpage" element={<BookingPage />} />
        <Route path="/Appointments" element={<AppointmentList />} />
        <Route path="/loginSpinner" element={<LoginSpinner />} />
        <Route path="/loader" element={<OpenLoader />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/Home" /> : <Welcome />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/Home" /> : <Signup />}
        />
        <Route
          path="/Home"
          element={
            user ? (
              <HomeCustomer sharedData={userData} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/add" element={<AddCustomer />} />
        <Route path="/edit/:id" element={<UpdateCustomer />} />
        <Route path="/delete/:id" element={<DeleteCustomer />} />
        <Route path="/show/:id" element={<ShowCustomer />} />
        <Route path="/spinner" element={<Spinner />} />
      </Routes>
    </div>
  );
}

export default App;
