import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

import "../scss/style.css";

function Signup() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    alert("working!");
  };
  return (
    <div>
      <div className="container--body">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh", //
          }}
          className="login--body"
        >
          <Card sx={{ minWidth: 300, maxWidth: 500, padding: "3rem" }}>
            <CardContent>
              <h2>Sign Up</h2>

              <div>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                  sx={{ marginBottom: 1, padding: 0.1, width: "100%" }}
                />
              </div>
              <div>
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  sx={{ marginBottom: 1, padding: 0.1, width: "100%" }}
                />
              </div>

              <div>
                <TextField
                  id="outlined-password-input"
                  label="Email"
                  type="email"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  sx={{ marginBottom: 1, padding: 0.1, width: "100%" }}
                />
              </div>

              <div>
                <TextField
                  id="outlined-password-input"
                  label=""
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  sx={{ marginBottom: 1, padding: 0.1, width: "100%" }}
                />
              </div>
              <Button variant="outlined" onClick={() => handleSignUp()}>
                Sign In
              </Button>

              <p>
                <Link to="/login">
                  Don't have an account yet? Sign Up here.
                </Link>
              </p>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
}

export default Signup;
