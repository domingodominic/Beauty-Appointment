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
import { server_url } from "../../serverUrl";
import LoginSpinner from "../loaders_folder/LoginSpinner";
import useBookingPageClass from "../store/useBookingPageClass";
import useServicesStore from "../store/useServicesStore";

const steps = [
  "Select Municipality",
  "Select provider",
  "Select service",
  "Select Date & Time",
  "Review",
];

export default function HorizontalLinearStepper({
  handleNextPage,
  setBookState,
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [isLoading, setLoading] = React.useState(false);
  const { branchID, chosenService, date, time, branchEmail } =
    useAppointmentStore();
  const { setCurrentClassname } = useBookingPageClass();
  const { theme, customerProfiles, providerDatas } =
    React.useContext(ThemeContext);
  const serviceName = chosenService.service_name;
  const serviceImage = chosenService.service_image;
  const servicePrice = chosenService.service_price;
  const serviceDescription = chosenService.service_description;
  const customerID = customerProfiles.customerProfile._id;
  const referenceNo = "ASVXFGQ23RQ1VGSFA";
  const { enqueueSnackbar } = useSnackbar();
  const { setCurrentServices } = useServicesStore();

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
    setCurrentClassname("classname--rightslide");
  };

  const getUpdatedData = async () => {
    setLoading(true);
    if (providerDatas.providerData && providerDatas.providerData._id) {
      try {
        const response = await axios.get(
          `${server_url}/provider/${providerDatas.providerData._id}`
        );
        setCurrentServices(response.data.data.services);
        if (response.status === 200) {
          setLoading(false);
          setBookState(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const CallbackStep = (step) => {
    setActiveStep(step);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentClassname("classname--leftslide");
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSendEmail = async () => {
    const toEmail = branchEmail;
    const subject = "New customer";
    const message =
      "Good day, this is to notify that someone's booked at you, thank you.";
    try {
      const response = await axios.post(`${server_url}/sendEmail`, {
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
  const sendingNotification = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${server_url}/notification/newNotification/`,
        {
          recipient_id: branchID,
          sender_id: customerID,
          content: "Hola, you got new customers booked at you!",
          status: "unopen",
        }
      );

      if (response.status === 200) {
        return console.log(response.data);
        setLoading(false);
      } else {
        return console.log("Can't push the notification");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const schedulingAppointment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${server_url}/appointments/schedulingAppointment`,
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
      sendingNotification();

      if (response.status === 201) {
        enqueueSnackbar("successfuly booked your appointment!", {
          variant: "success",
        });
        handleSendEmail();
        getUpdatedData();
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
