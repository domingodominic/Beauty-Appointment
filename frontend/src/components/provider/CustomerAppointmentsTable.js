import * as React from "react";
import config from "../../../config";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Linear from "../loaders_folder/Linear";
import { ThemeContext } from "../../App";

const columns = [
  { field: "firstname", headerName: "First name", width: 130 },
  { field: "lastname", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },

  {
    field: "serviceName",
    headerName: "Selected Service",
    width: 130,
  },
  {
    field: "servicePrice",
    headerName: "Price",
    width: 90,
  },
  {
    field: "serviceDate",
    headerName: "Date",
    width: 130,
  },
  {
    field: "serviceTime",
    headerName: "Time",
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
  },
];

export default function DataTable() {
  const [customerData, setCustomerData] = React.useState({});
  const [customerID, setCustomerID] = React.useState("");
  const [serviceData, setServiceData] = React.useState({});
  const { providerDatas } = React.useContext(ThemeContext);
  const ID = providerDatas.providerData._id;
  const fetchService = async () => {
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/appointments/getCustomers?id=${ID}`
      );
      const serviceData = response.data;

      // Assuming serviceData is an array of service records
      const customerDataPromises = serviceData.map(async (service) => {
        try {
          const customerResponse = await axios.get(
            `${config.SERVER_URL}/appointments/getCustomersInfo?id=${service.customerID}`
          );
          return customerResponse.data[0]; // Access the first item in the array
        } catch (error) {
          console.error("Error fetching customer data:", error);
          return {}; // Provide a fallback if there's an error fetching customer data
        }
      });

      const customerDataArray = await Promise.all(customerDataPromises);

      // Combine service data with customer data and add status based on date
      const currentDate = new Date();
      const combinedData = serviceData.map((service, index) => {
        const customerData = customerDataArray[index];
        const serviceDate = new Date(service.serviceDate);

        // Check if the service date is today
        const isToday =
          serviceDate.toDateString() === currentDate.toDateString();

        return {
          ...service,
          ...customerData,
          id: service._id || index.toString(),
          status: isToday ? "Today" : "Upcoming", // Add a status based on the date condition
        };
      });

      setServiceData(combinedData.reverse());
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  React.useEffect(() => {
    fetchService();
  }, [ID]);
  console.log(serviceData);

  return (
    <div className="scheduled--customerList--PP">
      {serviceData && serviceData.length > 0 ? (
        <DataGrid
          rows={serviceData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      ) : (
        <Linear />
      )}
    </div>
  );
}
