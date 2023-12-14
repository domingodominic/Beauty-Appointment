import React from "react";
import "../scss/style.css";
import { IoIosAdd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

function Actions() {
  return (
    <div className="main">
      <div className="up">
        <button className="card1">
          <IoIosAdd className="action--add" />
        </button>
        <button className="card2">
          <IoEyeOutline className="action--view" />
        </button>
      </div>
      <div className="down">
        <button className="card3">
          <CiEdit className="action--update" />
        </button>
        <button className="card4">
          <AiOutlineDelete className="action--delete" />
        </button>
      </div>
    </div>
  );
}

export default Actions;
