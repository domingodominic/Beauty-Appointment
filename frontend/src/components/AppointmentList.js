import React, { useState, useEffect } from "react";
import "../scss/style.css";
import { IoAddCircle } from "react-icons/io5";
import { PiEyeThin } from "react-icons/pi";
import BookedDetails from "./BookedDetails";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import axios from "axios";

function AppointmentList(props) {
  const [userData, setUserData] = useState({});
  const [userAppointmentData, setUserAppointmentData] = useState({});
  const [appointedService, setAppointedService] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceData, setServiceData] = useState({});

  window.addEventListener("click", (e) => {
    e.preventDefault();
    setModalOpen(false);
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:5000/customer/get-user?email=${user.email}`
          );
          setUserData(response.data.customerData);
          setAppointedService(response.data.customerData.selected_service);

          console.log("this is the id of the data", response.data.customerData);
          const res = await axios.get(
            `http://localhost:5000/customer/${response.data.customerData.userAccount}`
          );
          setUserAppointmentData(res.data);
          console.log("Appointment data is ", res.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData();
      } else {
        setUserData([]); // Set to an empty array when no user is signed in
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {modalOpen ? <BookedDetails data={serviceData} /> : null}
      {appointedService.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4.5rem",
          }}
        >
          <div>
            <img
              src={require("../images/think--img.png")}
              alt="think image"
              style={{ width: "200px" }}
            />
            <p style={{ color: "gray" }}>Seems you haven't booked yet?</p>
            <button className="fadein--btn">Book now</button>
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            padding: "3rem 3rem",
          }}
        >
          <div className="top--content">
            <div className="title">Appointment List</div>
            <div className="button">
              <button>Book more</button> <IoAddCircle />
            </div>
          </div>
          <ul className="service--lists">
            {appointedService &&
              appointedService.map((service, index) => (
                <li key={index}>
                  <div className="details--container">
                    <div className="details">
                      <img
                        src={require("../images/hair.jpg")}
                        alt="service image"
                        style={{ width: "100px", borderRadius: "10px" }}
                      />
                      <div className="service--details">
                        <p>
                          <span
                            style={{
                              fontFamily: "semi-bold",
                              color: "#191444",
                            }}
                          >
                            Service provider:
                          </span>
                          {"  " + service.service_provider}
                        </p>
                        <p>
                          <span
                            style={{
                              fontFamily: "semi-bold",
                              color: "#191444",
                            }}
                          >
                            Appointed service:
                          </span>
                          {"  " + service.appointed_service}
                        </p>
                        <p>
                          <span
                            style={{
                              fontFamily: "semi-bold",
                              color: "#191444",
                            }}
                          >
                            Price:
                          </span>
                          <span style={{ color: "#C9B81A" }}>
                            {"  $" + service.appointed_price}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setServiceData(service);
                        setModalOpen(true);
                      }}
                    >
                      <PiEyeThin />
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
