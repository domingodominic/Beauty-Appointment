import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { useSnackbar } from "notistack";
import "../scss/style.css";
import LoginSpinner from "./LoginSpinner";
import axios from "axios";

// const bcrypt = require("bcrypt");
const defaultProfile =
  "https://www.ssrl-uark.com/wp-content/uploads/2014/06/no-profile-image.png";
const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  age: yup
    .number()
    .typeError("Age must be a valid number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required")
    .test("is-required", "Age is required", function (value) {
      return value !== undefined && value !== null && value !== "";
    }),
  birthdate: yup
    .string()

    .required("Birthdate is required"),

  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  municipality: yup.string().required("Municipality is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contactNumber: yup.number().required("contact number is required"),
});

function Signup() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.table(data);
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/customer", {
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        birthdate: data.birthdate,
        username: data.username,
        password: data.password, // Store the hashed password
        confirmPassword: data.confirmPassword,
        municipality: data.municipality,
        email: data.email,
        contactNumber: data.contactNumber,
        profilePicture: defaultProfile,
      });

      if (response.status === 201) {
        enqueueSnackbar("Sign up successful", { variant: "success" });
      } else {
        enqueueSnackbar("Sign up failed", { variant: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container--body">
      {loading && <LoginSpinner />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
        className="login--body"
      >
        <Card sx={{ minWidth: 300, maxWidth: 500, padding: "0" }}>
          <h2 style={{ color: "#ff9a9c" }}>Sign up</h2>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input--divider">
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Controller
                    name="firstname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        variant="outlined"
                        error={!!errors.firstname}
                        helperText={
                          errors.firstname ? errors.firstname.message : ""
                        }
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
                    )}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Controller
                    name="lastname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        variant="outlined"
                        error={!!errors.lastname}
                        helperText={
                          errors.lastname ? errors.lastname.message : ""
                        }
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
                    )}
                  />
                </div>
              </div>
              <div className="input--divider">
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Username"
                        variant="outlined"
                        error={!!errors.username}
                        helperText={
                          errors.username ? errors.username.message : ""
                        }
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
                    )}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        variant="outlined"
                        type="password"
                        error={!!errors.password}
                        helperText={
                          errors.password ? errors.password.message : ""
                        }
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
                    )}
                  />
                </div>
              </div>
              <div className="input--divider">
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Controller
                    name="age"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Age"
                        variant="outlined"
                        type="number"
                        error={!!errors.age}
                        helperText={errors.age ? errors.age.message : ""}
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
                    )}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        error={!!errors.confirmPassword}
                        helperText={
                          errors.confirmPassword
                            ? errors.confirmPassword.message
                            : ""
                        }
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
                    )}
                  />
                </div>
              </div>

              <div className="input--divider">
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Controller
                    name="contactNumber"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Contact Number"
                        variant="outlined"
                        error={!!errors.contactNumber}
                        helperText={
                          errors.contactNumber
                            ? errors.contactNumber.message
                            : ""
                        }
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
                    )}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <Controller
                    name="municipality"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Municipality"
                        variant="outlined"
                        error={!!errors.municipality}
                        helperText={
                          errors.municipality ? errors.municipality.message : ""
                        }
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
                    )}
                  />
                </div>
              </div>
              <div className="input--divider">
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
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
                    )}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Controller
                    name="birthdate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Birthdate"
                        variant="outlined"
                        type="date"
                        error={!!errors.birthdate}
                        helperText={
                          errors.birthdate ? errors.birthdate.message : ""
                        }
                        InputLabelProps={{ shrink: true }}
                        placeholder=""
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
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const formattedDate = format(
                            selectedDate,
                            "yyyy-MM-dd"
                          );
                          field.onChange(formattedDate);
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <button className="fadein--btn" type="submit">
                Submit
              </button>

              <p style={{ fontSize: "12px" }}>
                Already have an account?
                <Link
                  to="/login"
                  style={{
                    color: "#ff9a9c",
                    fontSize: "12px",
                    marginLeft: "2px",
                  }}
                >
                  Log In here.
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default Signup;
