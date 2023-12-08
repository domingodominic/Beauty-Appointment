import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/customer/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  return (
    <div>
      <h1>Are you sure you want to delete?</h1>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteCustomer;
