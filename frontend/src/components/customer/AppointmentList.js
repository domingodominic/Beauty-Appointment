import React, { useState, useEffect, useContext } from "react";
import "../../scss/style.css";
import { IoAddCircle } from "react-icons/io5";
import { PiEyeThin } from "react-icons/pi";
import BookedDetails from "./BookedDetails";
import Linear from "../loaders_folder/Linear";
import { ThemeContext } from "../../App";
import HorizontalLinearStepper from "../Bookingpage/Stepper";

function AppointmentList({ handleNextPage }) {
  const { theme, userDatas } = useContext(ThemeContext);
  const [userData, setUserData] = useState({});
  const [userAppointmentData, setUserAppointmentData] = useState({});
  const [appointedService, setAppointedService] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceData, setServiceData] = useState({});
  const [bookIsClicked, setBookClicked] = useState(false);

  useEffect(() => {
    setAppointedService(userDatas.userData.selected_service);
  }, [userDatas.userData]);
  const closeModal = (setModalStatus) => {
    setModalOpen(setModalStatus);
  };
  return (
    <div>
      {modalOpen ? (
        <BookedDetails
          closeModal={closeModal}
          data={serviceData}
          onClick={() => {
            setModalOpen(false);
          }}
        />
      ) : null}
      {appointedService ? null : <Linear />}

      {bookIsClicked ? (
        <HorizontalLinearStepper handleNextPage={handleNextPage} />
      ) : appointedService && appointedService.length === 0 ? (
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
              src={require("../../images/think--img.png")}
              alt="think image"
              style={{ width: "200px" }}
            />
            <p style={{ color: "gray" }}>Seems you haven't booked yet?</p>
            <button
              className="fadein--btn"
              onClick={() => setBookClicked(true)}
            >
              Book now
            </button>
          </div>
        </div>
      ) : (
        <div
          className="customer--appoinmentList-C2"
          style={{
            position: "relative",
            padding: "3rem 3rem",
          }}
        >
          <div className="top--content">
            <div className={`title color--${theme} appointmentList--title`}>
              Appointment List
            </div>

            <div className="button">
              <button onClick={() => setBookClicked(true)}>Book more</button>
              <IoAddCircle />
            </div>
          </div>
          <ul className="service--lists">
            {appointedService &&
              appointedService.map((service, index) => (
                <li className={`list--${theme}`} key={index}>
                  <div className="details--container">
                    <div className="details">
                      <img
                        src={require("../../images/hair.jpg")}
                        alt="service image"
                        style={{ width: "100px", borderRadius: "10px" }}
                      />
                      <div className="service--details">
                        <p className={`color--${theme}`}>
                          <span
                            style={{
                              fontFamily: "semi-bold",
                            }}
                          >
                            Service provider:
                          </span>
                          {"  " + service.service_provider}
                        </p>
                        <p className={`color--${theme}`}>
                          <span
                            style={{
                              fontFamily: "semi-bold",
                            }}
                          >
                            Appointed service:
                          </span>
                          {"  " + service.appointed_service}
                        </p>
                        <p>
                          <span
                            className={`color--${theme}`}
                            style={{
                              fontFamily: "semi-bold",
                            }}
                          >
                            Price:
                          </span>
                          <span style={{ color: "#C9B81A" }}>
                            {"   $" + service.appointed_price}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={`icon color--${theme}`}>
                      <PiEyeThin
                        onClick={() => {
                          setServiceData(service);
                          setModalOpen(true);
                        }}
                      />
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
