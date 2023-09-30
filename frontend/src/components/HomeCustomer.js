import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { GiMagnifyingGlass } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import { BsPersonAdd } from "react-icons/bs";
import { Link } from "react-router-dom";
function HomeCustomer() {
  const [customeData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5000/customer")
      .then((response) => {
        setCustomerData(response.data.data);

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Customer list</h1>
      <Link to="/add">
        <BsPersonAdd />
      </Link>
      {!loading ? (
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Firstname</th>
              <th>Middlename</th>
              <th>Lastname</th>
              <th>Services</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customeData.map((data, i) => (
              <tr key={data._id}>
                <td>{i + 1}</td>
                <td>{data.firstname}</td>
                <td>{data.middlename}</td>
                <td>{data.lastname}</td>
                <td>
                  {data.services.map((service, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <br />} {service}
                    </React.Fragment>
                  ))}
                </td>
                <td>{data.age}</td>
                <td>
                  <Link to={`/show/${data._id}`}>
                    <GiMagnifyingGlass />
                  </Link>
                  <Link to={`/delete/${data._id}`}>
                    <MdDeleteOutline />
                  </Link>
                  <Link to={`edit/${data._id}`}>
                    <button>EDIT</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default HomeCustomer;
