import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import image from "../images/registration-form-img.jpg";
import LoginSpinner from "./LoginSpinner";
import axios from "axios";
import "../scss/style.css";
import HomeCustomer from "./HomeCustomer";
import MyContext from "./MyContext";

function LoginForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignin = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/customer/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        enqueueSnackbar("Sign in successful", { variant: "success" });

        const getDataResponse = await axios.get(
          `http://localhost:5000/customer/data?username=${username}`
        );
        setUserData(getDataResponse.data);

        // Update login status
        setIsLoggedIn(true);
      } else {
        enqueueSnackbar("Sign in failed", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred during sign-in", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container--body">
      {loading ? <LoginSpinner /> : null}
      {isLoggedIn ? (
        <HomeCustomer sharedData={userData} />
      ) : (
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
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
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
                <p>
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

              <p style={{ fontSize: "12px" }}>
                Don't have an account yet ?
                <Link
                  to="/signup"
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
      )}
    </div>
  );
}

export default LoginForm;
