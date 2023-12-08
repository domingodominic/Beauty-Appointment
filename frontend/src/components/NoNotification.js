import React from "react";

function NoNotification() {
  return (
    <div>
      <div
        className="no--services"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4.5rem",
        }}
      >
        <div>
          <img
            src={require("../images/notificationICON.png")}
            alt="think image"
            width="250px"
          />
          <p style={{ color: "gray", margin: "0" }}>
            You have no notifications so far
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoNotification;
