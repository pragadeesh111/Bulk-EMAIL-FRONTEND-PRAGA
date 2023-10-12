import React, { useEffect } from "react";
import "./home.css";
import Wave from "react-wavify";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import HeaderPage from "../NavBar/Header";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <HeaderPage />
      <div className="home">
        <div className="content">
          <h1>Welcome To Bulk Email Tool</h1>
          <div className="intro">
            <h5>What is email marketing? </h5>
            <p
              style={{
                width: "50%",
                alignItems: "center",
                textAlign: "match-parent",
              }}
            >
              Email marketing is a marketing strategy surrounding sending emails
              to current and potential customers with the goal of increasing
              brand awareness, driving engagement, nurturing leads, or making a
              sale.
            </p>
          </div>
          <Button className="btn" onClick={() => navigate("/login")}>
            Start Here
          </Button>
        </div>
        <Wave
          fill="white"
          className="home-wave"
          options={{
            height: 50,
            amplitude: 30,
            speed: 0.2,
            points: 5,
          }}
        />
      </div>
    </>
  );
};

export default HomePage;
