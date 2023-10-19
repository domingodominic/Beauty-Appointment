import React, { useState, useEffect } from "react";
import "../scss/style.css";
import { IoAddCircle } from "react-icons/io5";
import { PiEyeThin } from "react-icons/pi";
import BookedDetails from "./BookedDetails";
function AppointmentList(props) {
  const [selectedService, setSelectedService] = useState([]);
  const [serviceData, setServiceData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const data = props.data;

  useEffect(() => {
    setSelectedService(data.selected_service);
  }, [data]);
  console.log(modalOpen);
  window.addEventListener("click", () => {
    setModalOpen(false);
  });

  return (
    <div>
      {modalOpen ? <BookedDetails data={serviceData} /> : null}

      {selectedService.length === 0 ? (
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
              src={require("../images/think--img.jpg")}
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
            {selectedService.map((service, index) => (
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
                          style={{ fontFamily: "semi-bold", color: "#191444" }}
                        >
                          Service provider:
                        </span>
                        {"  " + service.service_provider}
                      </p>
                      <p>
                        <span
                          style={{ fontFamily: "semi-bold", color: "#191444" }}
                        >
                          Appointed service:
                        </span>
                        {"  " + service.appointed_service}
                      </p>
                      <p>
                        <span
                          style={{ fontFamily: "semi-bold", color: "#191444" }}
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
