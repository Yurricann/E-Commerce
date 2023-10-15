import React, { useContext, useEffect } from "react";
import Style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  let { setUserToken } = useContext(userContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container py-2">
        <Outlet></Outlet>
      </div>

      <div>
        <Online></Online>
        <Offline>
          <div className="network">
            <i className="fas fa-wifi"></i> You are Offline
          </div>
        </Offline>
      </div>
    </>
  );
}
