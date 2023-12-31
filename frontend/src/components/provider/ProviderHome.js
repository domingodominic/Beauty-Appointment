import React, { useState, useEffect, useContext } from "react";
import { BsHouseDoor, BsJournalText, BsPersonCircle } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import "../../scss/style.css";
import NoHistory from "../NoAvailableToShow";
import ProviderProfile from "./ProviderProfile";
import ProviderServices from "./ProviderServices";
import { ThemeContext } from "../../App";
import ProviderNotification from "./ProviderNotification";
import ProviderAppointment from "./ProviderAppointment";
import { BsBook } from "react-icons/bs";

function ProviderHome() {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState({});
  const [customerProfile, setCustomerProfile] = useState({});

  const setNewPage = (page) => {
    setCurrentPage(page);
  };

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
                  currentPage === "appointment"
                    ? { color: "#191444" }
                    : { color: "white" }
                }
                onClick={() => {
                  setCurrentPage("appointment");
                }}
              >
                <BsBook />
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
                <span
                  style={{
                    position: "absolute",
                    fontSize: "10px",
                    fontWeight: "bolder",
                  }}
                ></span>
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
                  return <ProviderNotification setNewPage={setNewPage} />;
                case "appointment":
                  return <ProviderAppointment />;
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
