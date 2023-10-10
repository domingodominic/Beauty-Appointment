import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import image from "../images/registration-form-img.jpg";
import axios from "axios"; // Import Axios
import "../scss/style.css";

function LoginForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        enqueueSnackbar("Sign in successful", { variant: "success" });
        navigate("/Municipality");
      } else {
        enqueueSnackbar("Sign in failed", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred during sign in", { variant: "error" });
    }
  };

  return (
    <div className="container--body">
      <div className="content--container login--bodycd">
        <div className="reg--bg">
          <img src={image} alt="salon image woman" />
        </div>
        <div className="form">
          <h2 style={{ color: "#ff9a9c", marginBottom: "3rem" }}>Sign In</h2>
          <div>
            <TextField
              id="outlined-basic"
              label="Username"
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ff9a9c", // Border color for the default state
                  },
                  "&:hover fieldset": {
                    borderColor: "#fdcfcf", // Border color when hovered
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fdcfcf", // Border color when focused
                  },
                },
                "& label.Mui-focused": {
                  color: "#fdcfcf", // Text color when focused
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
                    borderColor: "#ff9a9c", // Border color for the default state
                  },
                  "&:hover fieldset": {
                    borderColor: "#fdcfcf", // Border color when hovered
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fdcfcf", // Border color when focused
                  },
                },
                "& label.Mui-focused": {
                  color: "#fdcfcf", // Text color when focused
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
              <input type="checkbox" />{" "}
              <p>
                I agree all statements in{" "}
                <Link to="/" style={{ color: "#ff9a9c" }}>
                  Terms & Conditions
                </Link>
              </p>
            </div>
            <button
              style={{ marginBottom: "3rem" }}
              className="fadein--btn"
              onClick={() => handleSignin()}
            >
              Sign In
            </button>
          </div>

          <p style={{ fontSize: "12px" }}>
            Don't have an account yet?
            <Link
              to="/signup"
              style={{ color: "#ff9a9c", fontSize: "12px", marginLeft: "2px" }}
            >
              Sign up here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
