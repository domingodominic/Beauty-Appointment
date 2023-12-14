import React from "react";
import NoAvailableToShow from "../NoAvailableToShow";
import NoHistoryImg from "../../images/noServices.png";
function CustomerHistory() {
  return (
    <div>
      <NoAvailableToShow
        definition={"You don't have history yet"}
        image={NoHistoryImg}
      />
    </div>
  );
}

export default CustomerHistory;
