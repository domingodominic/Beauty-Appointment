import React from "react";
import axios from "axios";
import Linear from "../loaders_folder/Linear";
import { ThemeContext } from "../../App";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { server_url } from "../../serverUrl";

function CustomerAppointmentMB() {
  const [customerData, setCustomerData] = React.useState({});
  const [customerID, setCustomerID] = React.useState("");
  const [serviceData, setServiceData] = React.useState({});
  const { providerDatas, theme } = React.useContext(ThemeContext);
  const ID = providerDatas.providerData._id;

  const fetchService = async () => {
    try {
      const response = await axios.get(
        `${server_url}/appointments/getCustomers?id=${ID}`
      );
      const serviceData = response.data;

      const customerDataPromises = serviceData.map(async (service) => {
        try {
          const customerResponse = await axios.get(
            `${server_url}/appointments/getCustomersInfo?id=${service.customerID}`
          );
          return customerResponse.data[0];
        } catch (error) {
          console.error("Error fetching customer data:", error);
          return {};
        }
      });

      const customerDataArray = await Promise.all(customerDataPromises);

      const currentDate = new Date();
      const combinedData = serviceData.map((service, index) => {
        const customerData = customerDataArray[index];
        const serviceDate = new Date(service.serviceDate);

        const isToday =
          serviceDate.toDateString() === currentDate.toDateString();

        return {
          ...service,
          ...customerData,
          id: service._id || index.toString(),
          status: isToday ? "Today" : "Upcoming", // Add a status based on the date condition
        };
      });

      setServiceData(combinedData);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  React.useEffect(() => {
    fetchService();
  }, [ID]);
  console.log(serviceData);

  return (
    <>
      <ul className="customerList--provider--container">
        {serviceData && serviceData.length > 0 ? (
          serviceData.map((data, i) => (
            <li key={i} className={`customerList--provider--item--${theme}`}>
              <div className="customerList--provider--details">
                <img
                  src={data.profilePicture}
                  alt="Customer profile picture"
                  style={{ width: "100px", borderRadius: "10px" }}
                />
                <div className="customerList--provider--moreDetails">
                  <p
                    className={`color--${theme}`}
                  >{`${data.firstname} ${data.lastname}`}</p>
                  <p className={`color--${theme}`}>{data.status}</p>
                  <p className={`color--${theme}`}>{data.serviceName}</p>
                </div>
              </div>
              <IoEyeOutline />
            </li>
          ))
        ) : (
          <Linear />
        )}
      </ul>
    </>
  );
}

export default CustomerAppointmentMB;
