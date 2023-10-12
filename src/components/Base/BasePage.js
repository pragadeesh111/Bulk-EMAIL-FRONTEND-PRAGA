import React from "react";
import SideBar from "./SideBar";

const BasePage = ({ children }) => {
  return (
    <div className="base">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="children">{children}</div>
    </div>
  );
};

export default BasePage;
