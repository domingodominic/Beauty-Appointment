import React, { useEffect, useContext } from "react";
import useAppointmentStore from "../store/useAppointmentStore";
import LoginSpinner from "../LoginSpinner";
import axios from "axios";
import { useState } from "react";
import { ThemeContext } from "../../App";
import { IoIosArrowForward } from "react-icons/io";
import Linear from "../loaders_folder/Linear";
import { useSnackbar } from "notistack";

function SelectBranch({ setStep }) {
  const [branches, setBranch] = useState();
  const [loading, isLoading] = useState(false);
  const { municipality, setBranchID, setServices } = useAppointmentStore();
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
          `http://localhost:5000/user/branches/${municipality}`
        );

        setBranch(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        isLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNext = (services, branchID) => {
    setServices(services);
    setBranchID(branchID);
  };

  return (
    <div>
      {loading ? (
        <LoginSpinner />
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
                handleNext(branch.services, branch._id);
                setStep(2);
              }}
            >
              <div className="details--container">
                <div>
                  {
                    <h3 style={{ margin: "0" }} className={`color--${theme}`}>
                      {branch.businessName}
                    </h3>
                  }
                  <p
                    style={{ margin: "0", fontSize: "12px" }}
                    className={`color--${theme}`}
                  >
                    {branch.businessDescription}
                  </p>
                </div>
                <IoIosArrowForward />
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
              src={require("../../images/think--img.png")}
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
