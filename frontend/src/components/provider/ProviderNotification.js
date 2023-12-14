import React from "react";
import "../../scss/style.css";
import noNotifImg from "../../images/notificationICON.png";
import NoAvailableToShow from "../NoAvailableToShow";

function ProviderNotification() {
  const definition = "You have no notifications so far";
  return (
    <div>
      <NoAvailableToShow definition={definition} image={noNotifImg} />
    </div>
  );
}

export default ProviderNotification;
