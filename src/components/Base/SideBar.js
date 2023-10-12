import React, { useEffect, useState } from "react";
import "./base.css";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import API from "../../url";
import axios from "axios";
const SideBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const getUser = async (token) => {
    try {
      let payload = { token };
      let res = await axios.post(`${API}/users/getuser`, payload);
      // console.log(res.data);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user);

  useEffect(() => {
    let token = localStorage.getItem("token");
    getUser(token);
  }, []);
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="left">
        <h3>Welcome!</h3>
        <h5>{user.firstName}</h5>
        <ul
          style={{
            listStyle: "none",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <li onClick={() => navigate("/dashboard")}>
            <DashboardIcon />
            <Link>Dashboard</Link>
          </li>
          <li onClick={() => navigate("/manualmail")}>
            <MailIcon />
            <Link>Manual Mail</Link>
          </li>
          <li onClick={() => navigate("/bulkmail")}>
            <AttachEmailIcon />
            <Link>Bulk Mail</Link>
          </li>
          <li onClick={() => navigate("/userprofile")}>
            <AccountBoxIcon />
            <Link>Profile</Link>
          </li>
        </ul>
        <LogoutIcon
          onClick={() => logOut()}
          className="logIcon"
          fontSize="large"
        />
      </div>
    </>
  );
};

export default SideBar;
