import React from "react";
import "../scss/style.css";

function ProviderNotification() {
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
            src={"https://cdn-icons-png.flaticon.com/512/6105/6105184.png"}
            alt="think image"
            width="200px"
          />
          <p style={{ color: "gray" }}>You have no notifications so far</p>
        </div>
      </div>
    </div>
  );
}

export default ProviderNotification;
