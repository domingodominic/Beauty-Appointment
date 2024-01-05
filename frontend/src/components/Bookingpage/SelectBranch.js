import React, { useEffect, useContext } from "react";
import useAppointmentStore from "../store/useAppointmentStore";
import LoginSpinner from "../loaders_folder/LoginSpinner";
import axios from "axios";
import { useState } from "react";
import { ThemeContext } from "../../App";
import { IoIosArrowForward } from "react-icons/io";
import Linear from "../loaders_folder/Linear";
import { useSnackbar } from "notistack";
import { server_url } from "../../serverUrl";
import useBookingPageClass from "../store/useBookingPageClass";
import { IoLocationOutline } from "react-icons/io5";

function SelectBranch({ setStep }) {
  const [branches, setBranch] = useState();
  const [loading, isLoading] = useState(false);
  const { municipality, setBranchID, setServices, setBranchEmail } =
    useAppointmentStore();
  const { currentClassname, setCurrentClassname } = useBookingPageClass();
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchData = async () => {
      isLoading(true);

      if (!municipality) {
        enqueueSnackbar("You didn't select your prefered municipality", {
          variant: "error",
        });
      }
      try {
        const response = await axios.get(
          `${server_url}/user/branches/${municipality}`
        );

        setBranch(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        isLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNext = (services, branchID, email) => {
    setServices(services);
    setBranchID(branchID);
    setBranchEmail(email);
    setCurrentClassname("classname--rightslide");
  };

  return (
    <div className={!loading ? currentClassname : null}>
      {loading ? (
        <Linear />
      ) : branches && branches[0]?.branches && branches[0]?.user ? (
        <ul className="service--lists service--list">
          <div className={`mb--municipality`}>
            <h4 className={`title color--${theme} municipality--page--title`}>
              Select Branch
            </h4>
            <p style={{ margin: "0", marginBottom: "2rem", color: "gray" }}>
              Please select a branch.
            </p>
            {/* <input
          type="text"
          placeholder="search..."
          value={municipality}
          onChange={(e) => setCurrentMunicipality(e.target.value)}
        /> */}
          </div>
          {branches[0].branches.map((branch, i) => (
            <li
              className={`list--${theme} municipality--list`}
              key={i}
              onClick={() => {
                handleNext(branch.services, branch._id, branch.businessEmail);
                setStep(2);
              }}
            >
              <div className="details--container">
                <div>
                  {
                    <h4 style={{ margin: "0" }} className={`color--${theme}`}>
                      {branch.businessName}
                    </h4>
                  }
                  <p
                    style={{
                      margin: "0",
                      fontSize: "10px",
                      color: "gray !important",
                    }}
                    className={`color--${theme}`}
                  >
                    {branch.businessDescription}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "4px",
                    }}
                  >
                    <IoLocationOutline />
                    <p
                      className={`color--${theme}`}
                      style={{ fontSize: "10px", margin: "0" }}
                    >
                      {branch.businessAddress}
                    </p>
                  </div>
                </div>
                <div className={`color--${theme}`}>
                  <IoIosArrowForward />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4.5rem",
          }}
        >
          <div>
            <img
              src={require("../../images/noServices.png")}
              alt="think image"
              style={{ width: "200px" }}
            />
            <p style={{ color: "gray" }}>No branch available in this City</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectBranch;
