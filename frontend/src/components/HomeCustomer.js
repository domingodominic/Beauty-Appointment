import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

function HomeCustomer(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  console.log(props.sharedData);
  useEffect(() => {
    setLoading(true);
    setData(props.sharedData);
  }, [props.sharedData]);

  return (
    <div>
      <h1>helloooo</h1>
    </div>
  );
}

export default HomeCustomer;
