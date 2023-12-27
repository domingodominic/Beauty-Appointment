import { Dialog, DialogContent } from "@mui/material";
import Slide from "@mui/material/Slide";
import React, { useContext } from "react";
import { ThemeContext } from "../../App";

//transition

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function DisplayServiceInfo({
  serviceData,
  DisplayServiceState,
  setDisplayServiceDialog,
}) {
  const { theme } = useContext(ThemeContext);
  const handleClose = () => {
    setDisplayServiceDialog(false);
  };
  console.log("service data are : ", serviceData);
  return (
    <>
      <Dialog
        open={DisplayServiceState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <img
            src={serviceData.service_image}
            alt="Service image"
            style={{ width: "100%" }}
          />
          <p className={`dialog--details--title--${theme}`}>Details :</p>
          <div className={`dialog--service--container`}>
            <p className={`dialog--service--${theme}`}>Name : </p>
            <p>{serviceData.service_name}</p>
          </div>
          <div className={`dialog--service--container`}>
            <p className={`dialog--service--${theme}`}>Description :</p>
            <p>{serviceData.service_description}</p>
          </div>
          <div className={`dialog--service--container`}>
            <p className={`dialog--service--${theme}`}>Price : </p>
            <p>{serviceData.service_price}</p>
          </div>
          <div>
            <p className={`dialog--details--title--${theme}`}>
              available schedule:
            </p>

            {serviceData.timeAndDate.map((date, i) => (
              <div key={i}>
                <p>
                  <span style={{ fontWeight: "bold" }}>Date :</span>{" "}
                  {date.service_date}
                </p>
                <div>TIME :</div>
                <ul className="timelist--container">
                  {date.availability_time.map((time, i) => (
                    <li key={i} className="timelist--items">
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DisplayServiceInfo;
