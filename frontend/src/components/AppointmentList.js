import React, { useState, useEffect, useContext } from "react";
import "../scss/style.css";
import { IoAddCircle } from "react-icons/io5";
import { PiEyeThin } from "react-icons/pi";
import BookedDetails from "./BookedDetails";
import Linear from "../components/loaders_folder/Linear";
import { ThemeContext } from "../App";

function AppointmentList() {
  const { theme, userDatas } = useContext(ThemeContext);
  const [userData, setUserData] = useState({});
  const [userAppointmentData, setUserAppointmentData] = useState({});
  const [appointedService, setAppointedService] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceData, setServiceData] = useState({});

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
      {appointedService && appointedService.length === 0 ? (
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
            <div className={`title color--${theme}`}>Appointment List</div>

            <div className="button">
              <button>Book more</button> <IoAddCircle />
            </div>
          </div>
          <ul className="service--lists">
            {appointedService &&
              appointedService.map((service, index) => (
                <li className={`list--${theme}`} key={index}>
                  <div className="details--container">
                    <div className="details">
                      <img
                        src={require("../images/hair.jpg")}
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

// import React, { useState, useEffect } from "react";
// import "../scss/style.css";
// import { IoAddCircle } from "react-icons/io5";
// import { PiEyeThin } from "react-icons/pi";
// import BookedDetails from "./BookedDetails";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase-config";
// import axios from "axios";
// function AppointmentList(props) {
//   const [selectedService, setSelectedService] = useState([]);
//   const [serviceData, setServiceData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);

//   const Signout = async () => {
//     await signOut(auth);
//   };

//   return (
//     <div>
//       {modalOpen ? <BookedDetails data={serviceData} /> : null}

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: "4.5rem",
//         }}
//       >
//         <div>
//           <img
//             src={require("../images/think--img.png")}
//             alt="think image"
//             style={{ width: "200px" }}
//           />
//           <input type="file" />
//           <p style={{ color: "gray" }}>Seems you haven't booked yet?</p>
//           <button className="fadein--btn">Book now</button>
//           <button onClick={Signout}>Sign out</button>
//         </div>
//       </div>
//       {/* ) : (
//         <div
//           style={{
//             position: "relative",
//             padding: "3rem 3rem",
//           }}
//         >
//           <div className="top--content">
//             <div className="title">Appointment List</div>
//             <div className="button">
//               <button>Book more</button> <IoAddCircle />
//             </div>
//           </div>
//           <ul className="service--lists">
//             {selectedService.map((service, index) => (
//               <li key={index}>
//                 <div className="details--container">
//                   <div className="details">
//                     <img
//                       src={require("../images/hair.jpg")}
//                       alt="service image"
//                       style={{ width: "100px", borderRadius: "10px" }}
//                     />
//                     <div className="service--details">
//                       <p>
//                         <span
//                           style={{ fontFamily: "semi-bold", color: "#191444" }}
//                         >
//                           Service provider:
//                         </span>
//                         {"  " + service.service_provider}
//                       </p>
//                       <p>
//                         <span
//                           style={{ fontFamily: "semi-bold", color: "#191444" }}
//                         >
//                           Appointed service:
//                         </span>
//                         {"  " + service.appointed_service}
//                       </p>
//                       <p>
//                         <span
//                           style={{ fontFamily: "semi-bold", color: "#191444" }}
//                         >
//                           Price:
//                         </span>
//                         <span style={{ color: "#C9B81A" }}>
//                           {"  $" + service.appointed_price}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                   <div
//                     className="icon"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setServiceData(service);
//                       setModalOpen(true);
//                     }}
//                   >
//                     <PiEyeThin />
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )} */}
//     </div>
//   );
// }

// export default AppointmentList;
