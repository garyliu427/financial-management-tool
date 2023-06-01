import React from "react";
import Sidebar from "../components/Sidebar";
import AuthedNavbar from "../components/AuthedNavbar";

function Default() {
  return (
    <>
      <AuthedNavbar />
      <Sidebar />
      <div style={{ marginLeft: "17rem" }}>
        <h1>Default</h1>
        {/* Other content of the Accounts component */}
      </div>
      ;
    </>
  );
}

export default Default;
