import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config";

function Branches({ selectBranch }) {
  const [branchData, setBranchData] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.SERVER_URL}/provider/${selectBranch}`)
      .then((response) => {
        setBranchData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectBranch]);

  return (
    <div>
      <h1>branches</h1>
      <div className="div">
        {branchData && <h4>{branchData.data.businessName}</h4>}
      </div>
    </div>
  );
}

export default Branches;
