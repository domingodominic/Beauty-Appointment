import React, { useState, useEffect, useContext } from "react";
import { BsHouseDoor, BsJournalText, BsPersonCircle } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import "../../scss/style.css";
import ProviderAppointment from "./ProviderAppointment";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from ".././../firebase-config";
import ProviderProfile from "./ProviderProfile";
import ProviderServices from "./ProviderServices";
import { ThemeContext } from "../../App";
import ProviderNotification from "./ProviderNotification";
import Datepicker from "./Datepicker";

function ProviderHome() {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState({});
  const [customerProfile, setCustomerProfile] = useState({});

  return (
    <div>
      <div className="main--customer--page">
        <div className="header--logo">
          <div className="logo--img">
            <img src={require("../../images/logo3.png")} alt="logo png" />
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
                    ? {
                        color: "#191444",
                      }
                    : { color: "white" }
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
                    ? { color: "#191444" }
                    : { color: "white" }
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
                    ? { color: "#191444" }
                    : { color: "white" }
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
                    ? { color: "#191444" }
                    : { color: "white" }
                }
                onClick={() => {
                  setCurrentPage("profile");
                }}
              >
                <BsPersonCircle />
              </li>
            </ul>
          </div>
          <div className={`main--content--${theme}`}>
            {(() => {
              switch (currentPage) {
                case "home":
                  return <ProviderServices />;
                case "profile":
                  return <ProviderProfile />;
                case "notification":
                  return <ProviderNotification />;
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

export default ProviderHome;
