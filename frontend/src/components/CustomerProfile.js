import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import SkeletonLoading from "./SkeletonLoading";
import LoginSpinner from "./LoginSpinner";
import { CiEdit } from "react-icons/ci";
import { useSnackbar } from "notistack";

function CustomerProfile(props) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //coverting date
  const customerJoin = userData.createdAt;
  const date = new Date(customerJoin);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    // Gumawa ng GET request gamit ang ID mula sa props
    axios
      .get(`http://localhost:5000/customer/${data._id}`)
      .then((res) => {
        // I-update ang state ng userData
        setUserData(res.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const data = props.data;
  console.log(data);
  console.log("updated userdata: ", userData);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const preset_key = "rp5f2lnh";
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", preset_key);

    try {
      setLoading(true);
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/drlxjomis/image/upload",
        formdata
      );
      setImageURL(cloudinaryResponse.data.secure_url);
      console.log(cloudinaryResponse.data.secure_url);

      // Send the updated data to the backend
      await axios.put(`/customer/updateProfilePicture/${data._id}`, {
        profilePicture: cloudinaryResponse.data.secure_url,
      });

      // Gumawa ng GET request para sa bagong data mula sa backend
      const res = await axios.get(`http://localhost:5000/customer/${data._id}`);
      console.log(res.data);
      setUserData(res.data);
      setLoading(false);

      console.log("Successfully uploaded to the backend");
    } catch (error) {
      console.error("An error occurred:", error);
    }
    enqueueSnackbar("You have updated your profile picture", {
      variant: "info",
    });
  };
  return (
    <div className="customer--profile--container">
      {loading ? <LoginSpinner /> : null}
      {userData.profilePicture ? (
        <div>
          <div className="customer--header--profile">
            <div className="image--container">
              <img
                src={userData.profilePicture}
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
                <CiEdit className="edit-icon" />
              </label>
            </div>
            <div className="customer--name">
              {userData.firstname + " " + userData.lastname}
            </div>
            <div className="customer--email">{userData.email}</div>
          </div>

          <table className="customer--info--table">
            <tr>
              <td>Join on</td>
              <td>{formattedDate}</td>
            </tr>
            <tr>
              <td>Contact no</td>
              <td>{userData.contactNumber}</td>
            </tr>
            <tr>
              <td>Municipality</td>
              <td>{userData.municipality}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>{userData.username}</td>
            </tr>
          </table>
        </div>
      ) : (
        <SkeletonLoading />
      )}
    </div>
  );
}

export default CustomerProfile;
