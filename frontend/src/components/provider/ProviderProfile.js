import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyAccordion from "../../components/customer/MyAccordion";
import { BsFillCameraFill, BsPersonFillLock } from "react-icons/bs";
import { useSnackbar } from "notistack";
import { signOut } from "firebase/auth";
import { auth } from ".././../firebase-config";
import ThemeChanger from "../customer/ThemeChanger";
import Linear from "../../components/loaders_folder/Linear";
import { ThemeContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "../../scss/style.css";

function ProviderProfile() {
  const { theme, customerProfiles, providerDatas } = useContext(ThemeContext);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("is loading? ", loading);

  // Converting date
  const customerJoin = userData.createdAt;
  const date = new Date(customerJoin);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    setUserData(customerProfiles.customerProfile);
    axios
      .get(
        `http://localhost:5000/customer/${customerProfiles.customerProfile._id}`
      )
      .then((res) => {
        setImageURL(res.data.profilePicture);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, [userData]);

  const [selectedFile, setSelectedFile] = useState(null);
  const preset_key = "rp5f2lnh";
  const handleFileChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", preset_key);

    try {
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/drlxjomis/image/upload",
        formdata
      );
      setImageURL(cloudinaryResponse.data.secure_url);

      // Send the updated data to the backend
      await axios.put(`/provider/updateProfilePicture/${userData._id}`, {
        profilePicture: cloudinaryResponse.data.secure_url,
      });

      setLoading(false);
      enqueueSnackbar("You have updated your profile picture", {
        variant: "info",
      });
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      enqueueSnackbar("Error updating profile picture", {
        variant: "error",
      });
    }
  };
  const Signout = async () => {
    await signOut(auth);
    navigate("/");
  };
  console.log("loader test", loading);
  return (
    <div className="customer--profile--container">
      {loading ? <Linear /> : null}
      {imageURL ? null : <Linear />}
      {userData && userData.profilePicture ? (
        <div>
          <div className="customer--header--profile">
            <div className="image--container">
              <img
                src={
                  imageURL
                    ? imageURL
                    : customerProfiles.customerProfile.profilePicture
                }
                alt="profile picture"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "100%",
                  boxShadow: "5px 5px  15px rgba(,0,0,0,0.2)",
                }}
              />

              <label className="file-input-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <BsFillCameraFill className="edit-icon" />
              </label>
            </div>

            <div className={`customer--name ${theme}`}>
              {userData.firstname + " " + userData.lastname}
            </div>
            <div className="customer--email">{userData.email}</div>
            <div style={{ position: "absolute", top: "5%", right: "5%" }}>
              <ThemeChanger />
            </div>
          </div>
          <div className="profile--info--container">
            <div className="profile--left">
              <div className="personal--info">
                <h4
                  className={`color--${theme}`}
                  style={{ textAlign: "start" }}
                >
                  Personal Information
                </h4>
                <div className="profile--join">
                  <p className="item--title">Join on</p>
                  <p className={`item--value color--${theme} `}>
                    {formattedDate}
                  </p>
                </div>
                <div className="profile--join">
                  <p className="item--title">Name</p>
                  <p className={`item--value color--${theme} `}>
                    {userData.firstname + " " + userData.lastname}
                  </p>
                </div>
                <div className="profile--join">
                  <p className="item--title">Municipality</p>
                  <p className={`item--value color--${theme} `}>
                    {userData.municipality}
                  </p>
                </div>
              </div>

              <div className="private--info">
                <h4
                  className={`color--${theme}`}
                  style={{ textAlign: "start" }}
                >
                  Private Information
                </h4>
                <div className="private--info--item">
                  <p className="item--title">Email</p>
                  <p className={`item--value color--${theme} `}>
                    {userData.email}
                  </p>
                </div>
                <div className="private--info--item">
                  <p className="item--title">Contact no.</p>
                  <p className={`item--value color--${theme} `}>
                    {userData.contactNumber}
                  </p>
                </div>
                <div className="private--info--item">
                  <p className="item--title"> Theme</p>
                  <p className={`item--value color--${theme} `}>
                    {userData.contactNumber}
                  </p>
                </div>
              </div>
            </div>
            <div className="profile--right--info">
              <div>
                <MyAccordion />
                <button className="logout--btn" onClick={Signout}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Linear />
      )}
    </div>
  );
}

export default ProviderProfile;
