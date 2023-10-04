import { Route, Routes } from "react-router-dom";
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

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/loader" element={<OpenLoader />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<HomeCustomer />} />
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
