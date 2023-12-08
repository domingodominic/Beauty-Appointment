import { useContext, useEffect, useState } from "react";
import { ThemeContext } from ".././../App";

function ProviderAppointment() {
  const [serviceData, setServiceData] = useState({});
  const { theme, customerProfiles, providerDatas } = useContext(ThemeContext);

  useEffect(() => {
    setServiceData(providerDatas.providerData);
  }, []);

  return (
    <div>
      {serviceData ? <h1>Yes</h1> : <h1>No</h1>}
      <h1>appointment list</h1>
    </div>
  );
}

export default ProviderAppointment;
