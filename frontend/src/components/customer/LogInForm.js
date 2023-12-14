import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import image from "../../images/registration-form-img.jpg";
import LoginSpinner from "../loaders_folder/LoginSpinner";
import axios from "axios";
import "../../scss/style.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ThemeContext } from "../../App";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LoginForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [forgotpassOpen, setforgotpassOpen] = React.useState(false);
  const [failedAuth, countFailedAuth] = useState(0);
  const { theme, userDatas } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFPDialogOpen = () => {
    setforgotpassOpen(true);
    console.log("its cliked");
  };
  const handleFPDialogClose = () => {
    setforgotpassOpen(false);
  };
  console.log("user datas are ", userDatas);

  const handleSignin = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/customer/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        try {
          const getDataResponse = await axios.get(
            `http://localhost:5000/customer/data?email=${email}`
          );
          setUserData(getDataResponse.data);

          const user = await signInWithEmailAndPassword(auth, email, password);

          enqueueSnackbar("Sign in successful", { variant: "success" });
        } catch (error) {
          console.log(error);
        }
      } else {
        enqueueSnackbar("Sign in failed", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred during sign-in", { variant: "error" });
      countFailedAuth((count) => count + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <LoginSpinner /> : null}

      <div className="container--body">
        <div
          className={`content--container login--bodycd ${
            loading ? "hidden" : ""
          }`}
        >
          <div className="reg--bg">
            <img src={image} alt="salon image woman" />
          </div>
          <div className="form">
            <h2 style={{ color: "#ff9a9c", marginBottom: "3rem" }}>Sign In</h2>
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                onChange={(e) => setUserEmail(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ff9a9c",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fdcfcf",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fdcfcf",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#fdcfcf",
                  },
                  marginBottom: 2,
                  padding: 0.1,
                  width: "100%",
                }}
              />
            </div>

            <div>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ff9a9c",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fdcfcf",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fdcfcf",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#fdcfcf",
                  },
                  marginBottom: 1,
                  padding: 0.1,
                  width: "100%",
                }}
              />
            </div>
            <div>
              {failedAuth === 3 ? (
                <p onClick={() => setforgotpassOpen(true)}>Forgot password?</p>
              ) : null}
              <div
                style={{
                  display: "flex",
                  fontSize: "11px",
                  justifyContent: "center",
                }}
              >
                <input
                  type="checkbox"
                  onChange={() => setBtnDisabled(!btnDisabled)}
                />
                <p className={`color--${theme}`}>
                  I agree all statements in{" "}
                  <Link to="/" style={{ color: "#ff9a9c" }}>
                    Terms & Conditions
                  </Link>
                </p>
              </div>
              <button
                disabled={btnDisabled}
                style={{ marginBottom: "3rem" }}
                className={btnDisabled === true ? "none" : "fadein--btn"}
                onClick={() => handleSignin()}
              >
                Sign In
              </button>

              <p style={{ fontSize: "12px" }} onClick={handleClickOpen}>
                Don't have an account yet ?
                <Link
                  style={{
                    color: "#ff9a9c",
                    fontSize: "12px",
                    marginLeft: "2px",
                  }}
                >
                  Sign up here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Good day!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Before we proceed with creating your account, would you like to
            specify your role ? &#x1F604;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={() => navigate("/signup")} className="join--btn">
            Customer
          </button>
          <button
            onClick={() => navigate("/provider--signup")}
            className="join--btn"
          >
            Provider
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={forgotpassOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleFPDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Forgot your password?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            To initiate the account reset process, kindly provide the 6-digit
            One-Time Password (OTP) sent to your registered email address. Your
            cooperation is appreciated.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => navigate("/provider--signup")}
            className="join--btn"
          >
            Send an OTP
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginForm;
