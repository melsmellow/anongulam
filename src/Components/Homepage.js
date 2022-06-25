import React from "react";
import WheelComponent from "./WheelComponent";
import { data } from "./UlamList.js";
function Homepage() {
  return (
    <div id="main-container">
      <WheelComponent data={data} />
    </div>
  );
}

export default Homepage;
