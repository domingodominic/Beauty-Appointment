import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectBranch from "./SelectBranch";
import SelectMunicipality from "./SelectMunicipality";
import SelectService from "./SelectService";
import SelectTime from "./SelectTime";
import ReviewAppointment from "./ReviewAppointment";
import SelectDate from "./SelectDate";
import { ThemeContext } from "../../App";
import { useSnackbar } from "notistack";
import useAppointmentStore from "../store/useAppointmentStore";
import axios from "axios";
import LoginSpinner from "../LoginSpinner";

const steps = [
  "Select Municipality",
  "Select provider",
  "Select service",
  "Select Date & Time",
  "Review",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [isLoading, setLoading] = React.useState(false);
  const { branchID, chosenService, date, time } = useAppointmentStore();
  const { theme, customerProfiles } = React.useContext(ThemeContext);
  const serviceName = chosenService.service_name;
  const serviceImage = chosenService.service_image;
  const servicePrice = chosenService.service_price;
  const serviceDescription = chosenService.service_description;
  const customerID = customerProfiles.customerProfile._id;
  const referenceNo = "ASVXFGQ23RQ1VGSFA";
  const { enqueueSnackbar } = useSnackbar();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const CallbackStep = (step) => {
    setActiveStep(step);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSendEmail = async () => {
    const toEmail = "dominicpunladomingo120@gmail.com";
    const subject = "Scheduled Appointment";
    const message =
      "Good day, This is to remind you with you scheduled appointment is tomorrow at 9:00 AM. Thank you.";
    try {
      const response = await axios.post("http://localhost:5000/sendEmail", {
        toEmail,
        subject,
        message,
      });

      if (response.status === 200) {
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email");
    }
  };

  const schedulingAppointment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/appointments/schedulingAppointment",
        {
          serviceName,
          serviceDescription,
          servicePrice,
          serviceImage,
          date,
          referenceNo,
          time,
          branchID,
          customerID,
        }
      );

      if (response.status === 201) {
        enqueueSnackbar("successfuly booked your appointment!", {
          variant: "success",
        });
        handleSendEmail();
        setLoading(false);
      } else if (response.status === 500) {
        enqueueSnackbar("Something went wrong, please try again.", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ padding: " 30px 40px", maxHeight: "100vh" }}>
      {isLoading ? <LoginSpinner /> : null}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="stepper--container">
        {activeStep === 0 ? (
          <SelectMunicipality setStep={CallbackStep} />
        ) : activeStep === 1 ? (
          <SelectBranch setStep={CallbackStep} />
        ) : activeStep === 2 ? (
          <SelectService setStep={CallbackStep} />
        ) : activeStep === 3 ? (
          <SelectTime setStep={CallbackStep} />
        ) : (
          <ReviewAppointment />
        )}
      </div>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              className={`stepper-backBtn--${theme}`}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep === steps.length - 1 ? (
              <button onClick={schedulingAppointment}>BOOK</button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
