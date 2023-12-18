import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "../../scss/style.css";
import axios from "axios";
import noNotifImg from "../../images/notificationICON.png";
import NoAvailableToShow from "../NoAvailableToShow";
import { ThemeContext } from "../../App";
import { server_url } from "../../serverUrl";
import { useContext } from "react";

function ProviderNotification({ setNewPage }) {
  const { providerDatas } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState([]);
  const definition = "You have no notifications so far";
  const providerID = providerDatas.providerData._id;

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const response = await axios.get(
          `${server_url}/notification/getNotification/${providerID}`
        );

        if (response.status === 200) {
          setNotifications(response.data.res.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotif();
  }, []);

  const handleClickedNotif = async (notificationID) => {
    setNewPage("appointment");
    try {
      const response = await axios.put(
        `${server_url}/notification/openNotification/${notificationID}`,
        {
          status: "open",
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {notifications && notifications.length <= 0 ? (
        <NoAvailableToShow definition={definition} image={noNotifImg} />
      ) : (
        <div>
          <h5>Notifications</h5>
          <ul className={`notification--main--container`}>
            {notifications.map((data, i) => (
              <li
                key={i}
                className={`notification--list--conatiner`}
                onClick={() => handleClickedNotif(data._id)}
              >
                <div className={`notification--content`}>{data.content}</div>
                <Icon
                  icon="simple-icons:go"
                  className="notification--icon"
                  style={
                    data.status === "unopen"
                      ? { color: "#ff9a9c" }
                      : { color: "gray" }
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProviderNotification;
