import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "../styles/LogIn.css";

function LoginForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = () => {
    if (username === "admin" && password === "admin") {
      enqueueSnackbar("Sign in successful", { variant: "success" });
      navigate("/Municipality");
    } else {
      enqueueSnackbar("Sign in failed", { variant: "error" });
    }
  };
  return (
    <div className="container--body">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Optional: Center vertically in the viewport
        }}
        className="login--body"
      >
        <Card sx={{ minWidth: 300, maxWidth: 50 }}>
          <CardContent>
            <h2>Sign In</h2>
            <TextField
              id="outlined-basic"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              sx={{ marginBottom: 1, padding: 0.1 }}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              sx={{ marginBottom: 1, padding: 0.1 }}
            />
            <Button variant="outlined" onClick={() => handleSignin()}>
              Sign In
            </Button>

            <p>
              <Link to="/Municipality">
                Don't have an account yet? Sign Up here.
              </Link>
            </p>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default LoginForm;
