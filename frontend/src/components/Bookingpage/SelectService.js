import React, { useContext, useEffect } from "react";
import { PiEyeThin } from "react-icons/pi";
import useAppointmentStore from "../store/useAppointmentStore";
import { ThemeContext } from "../../App";

function SelectService({ setStep }) {
  const { services, setChosenService, chosenService } = useAppointmentStore();
  const { theme } = useContext(ThemeContext);
  const handleClick = (service) => {
    setChosenService(service);
    setStep(3);
  };

  return (
    <div>
      <ul className="service--lists service--list">
        <div className={`mb--municipality`}>
          <h4 className={`title color--${theme} municipality--page--title`}>
            Select Service
          </h4>
          <p style={{ margin: "0", marginBottom: "2rem", color: "gray" }}>
            Please select a service.
          </p>
          {/* <input
          type="text"
          placeholder="search..."
          value={municipality}
          onChange={(e) => setCurrentMunicipality(e.target.value)}
        /> */}
        </div>
        {services &&
          services.map((service, index) => (
            <li
              className={`list--${theme} available--service`}
              key={index}
              onClick={() => handleClick(service)}
            >
              <di v className="details--container">
                <div className="details">
                  <img
                    src={service.service_image}
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
                        Service name:
                      </span>
                      {"  " + service.service_name}
                    </p>
                    <p className={`color--${theme}`}>
                      <span
                        style={{
                          fontFamily: "semi-bold",
                        }}
                      >
                        Service description:
                      </span>
                      {"  " + service.service_description}
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
                        {"   $" + service.service_price}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={`icon color--${theme}`}>
                  <PiEyeThin />
                </div>
              </di>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SelectService;
