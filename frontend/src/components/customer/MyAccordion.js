import * as React from "react";
import { useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoSettingsOutline, IoKeyOutline } from "react-icons/io5";
import "../../scss/style.css";
import { BsPerson } from "react-icons/bs";
import { BiSolidChevronDown, BiKey } from "react-icons/bi";
import { ThemeContext } from "../../App";
export default function MyAccordion() {
  const { theme, updateThemeState } = useContext(ThemeContext);
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Accordion className={`Accordion--container--${theme}`}>
        <AccordionSummary
          expandIcon={<BiSolidChevronDown className={`color--${theme}`} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="typography">
            <IoSettingsOutline />
            <p className="accordion--title">Settings and Privacy</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={`accordion--item--${theme}`}>
            <BsPerson /> <p>Change profile information</p>
          </div>
          <div className={`accordion--item--${theme}`}>
            <IoKeyOutline /> <p>Change Password</p>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
