import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { BsHouseDoor, BsJournalText, BsPersonCircle } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import "../scss/style.css";
import AppointmentList from "./AppointmentList";
import CustomerProfile from "./CustomerProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { color } from "@mui/system";
function HomeCustomer(props) {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState({});
  useEffect(() => {
    setLoading(true);

    // Check kung may laman ang props
    if (props.sharedData) {
      setData(props.sharedData);
    } else {
      // Kung walang laman ang props, hanapin ang username mula sa authenticated user
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is authenticated, kumuha ng username mula sa user object
          setData(user.displayName);
        }
      });

      return () => unsubscribe();
    }
  }, [props.sharedData]);

  return (
    <div>
      <div className="main--customer--page">
        <div className="header--logo">
          <div className="logo--img">
            <img src={require("../images/logo3.png")} alt="logo png" />
          </div>
          <div className="location--name">
            <p className="logo--name">Glamour Ease</p>
            <p className="location">Bataan, Philippines</p>
          </div>
        </div>
        <div className="content--conatiner">
          <div className="home--menu">
            <ul>
              <li
                style={
                  currentPage === "home"
                    ? { color: "#ff9a9c" }
                    : { color: "black" }
                }
                onClick={() => {
                  setCurrentPage("home");
                }}
              >
                <BsHouseDoor />
              </li>
              <li
                style={
                  currentPage === "history"
                    ? { color: "#ff9a9c" }
                    : { color: "black" }
                }
                onClick={() => {
                  setCurrentPage("history");
                }}
              >
                <BsJournalText />
              </li>
              <li
                style={
                  currentPage === "notification"
                    ? { color: "#ff9a9c" }
                    : { color: "black" }
                }
                onClick={() => {
                  setCurrentPage("notification");
                }}
              >
                <IoNotificationsOutline />
              </li>
              <li
                style={
                  currentPage === "profile"
                    ? { color: "#ff9a9c" }
                    : { color: "black" }
                }
                onClick={() => {
                  setCurrentPage("profile");
                }}
              >
                <BsPersonCircle />
              </li>
            </ul>
          </div>
          <div className="main--content">
            {(() => {
              switch (currentPage) {
                case "home":
                  return <AppointmentList />;
                // return <AppointmentList data={props.sharedData} />;
                case "profile":
                  return <CustomerProfile data={props.sharedData} />;
                default:
                  return <div>Page not found</div>;
              }
            })()}
          </div>
        </div>

        <div className="customer--footer">
          <p className="footer--name">GlamourEase</p>
          <p className="copyright">
            &copy; Copyright All Rights Reserved, 2023
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeCustomer;
