import React, { useEffect, useState, createContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "./firebase-config";
import UpdateCustomer from "./components/customer/UpdateCustomer";
import DeleteCustomer from "./components/customer/DeleteCustomer";
import ShowCustomer from "./components/customer/ShowCustomer";
import HomeCustomer from "./components/customer/HomeCustomer";
import AddCustomer from "./components/customer/AddCustomer";
import Welcome from "./components/customer/Welcome";
import LoginForm from "./components/customer/LogInForm";
import Signup from "./components/customer/Signup";
import AppointmentList from "./components/customer/AppointmentList";
import BookingPage from "./components/customer/BookingPage";
import CustomerProfile from "./components/customer/CustomerProfile";
import MunicipalitySelection from "./components/Bookingpage/MunicipalitySelection";
import ProviderHome from "./components/provider/ProviderHome";
import "./App.css";
import ProviderAppointment from "./components/provider/ProviderAppointment";
import ProviderSignup from "./components/provider/ProviderSignup";
import RedirectSpinner from "./components/loaders_folder/RedirectSpinner";
import ProviderServices from "./components/provider/ProviderServices";
import SelectTime from "./components/Bookingpage/SelectTime";
import SelectDate from "./components/Bookingpage/SelectDate";
import EmailLoader from "./components/loaders_folder/EmailLoader";
export const ThemeContext = createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [providerData, setProviderData] = useState({});
  const [customerProfile, setCustomerProfile] = useState({});
  const [theme, setTheme] = useState("light");
  const [isLoading, setLoading] = useState(true);

  //theme changer
  const updateThemeState = (newValue) => {
    setTheme(newValue);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUser(user.email);
        findUser(user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const findUser = async (user) => {
    const response = await axios
      .get(`http://localhost:5000/customer/get-user?email=${user.email}`)
      .then((res) => {
        if (res.data.foundUser.role === "customer" && providerData) {
          navigate("/Home");
        } else if (res.data.foundUser.role === "provider" && providerData) {
          navigate("/provider--home");
        }
        setProviderData(res.data.providerData);
        setUserData(res.data.customerData);
        console.log("the data fetch is ", res.data);
        setCustomerProfile(res.data.foundUser);
      });
  };

  return (
    <div className={`App App--container--${theme}`}>
      {isLoading ? <RedirectSpinner /> : null}
      <ThemeContext.Provider
        value={{
          theme,
          updateThemeState,
          userDatas: { userData },
          providerDatas: { providerData },
          customerProfiles: { customerProfile },
        }}
      >
        <Routes>
          <Route path="/customerProfile" element={<CustomerProfile />} />
          <Route path="/selectTime" element={<SelectDate />} />
          <Route path="/Bookingpage" element={<BookingPage />} />
          <Route path="/Provider--service" element={<ProviderServices />} />
          <Route path="/email" element={<EmailLoader />} />
          <Route
            path="/Appointments"
            element={<AppointmentList user={userData} />}
          />
          <Route
            path="/MunicipalitySelection"
            element={<MunicipalitySelection />}
          />

          <Route
            path="/provider--appointments"
            element={<ProviderAppointment />}
          />
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/provider--signup" element={<ProviderSignup />} />
          <Route path="/provider--home" element={<ProviderHome />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/Home"
            element={
              <HomeCustomer sharedData={userData} profile={customerProfile} />
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
