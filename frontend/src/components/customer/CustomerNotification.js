import React from "react";
import NoAvailableToShow from "../NoAvailableToShow";
import NoNotifImg from "../../images/notificationICON.png";

function CustomerNotification() {
  return (
    <div>
      <NoAvailableToShow
        definition={"You have no notifications yet"}
        image={NoNotifImg}
      />
    </div>
  );
}

export default CustomerNotification;
