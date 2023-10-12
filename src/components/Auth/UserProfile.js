/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BasePage from "../Base/BasePage";
import "./auth.css";
import Form from "react-bootstrap/Form";
import profile from "../../assets/userprofile.gif";
import axios from "axios";
import API from "../../url";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  let getData = async () => {
    let payload = { token };
    let res = await axios.post(`${API}/users/getuser`, payload);
    setData(res.data.user);
  };

  useEffect(() => {
    if (token) {
      getData();
      navigate("/userprofile");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <BasePage>
        <div className="userprofile">
          <img src={profile} alt="userprofile" />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Form.Group className="profile-form">
                <Form.Label style={{ width: "20%", textAlign: "left" }}>
                  FirstName
                </Form.Label>
                <Form.Control
                  style={{ width: "50%" }}
                  placeholder="Change FirstName"
                  defaultValue={data.firstName}
                  name="firstName"
                />
              </Form.Group>
              <Form.Group className="profile-form">
                <Form.Label style={{ width: "20%", textAlign: "left" }}>
                  LastName
                </Form.Label>
                <Form.Control
                  style={{ width: "50%" }}
                  placeholder="Change LastName"
                  defaultValue={data.lastName}
                  name="lastName"
                />
              </Form.Group>
              <Form.Group className="profile-form">
                <Form.Label style={{ width: "20%", textAlign: "left" }}>
                  Email
                </Form.Label>
                <Form.Control
                  style={{ width: "50%" }}
                  placeholder="Change Email"
                  defaultValue={data.email}
                  name="email"
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      </BasePage>
    </>
  );
};

export default UserProfile;
