/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./dash.css";
import BasePage from "../Base/BasePage";
import dashboard from "../../assets/dashboard.gif";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <BasePage>
        <div className="dashboard">
          <h3>Welcome to Bulk Email Tool</h3>
          <div className="dash-item">
            <img style={{ height: "55%" }} alt="dashboard" src={dashboard} />
            <h4>Email Marketing </h4>
            <p style={{ textAlign: "justify", padding: "15px" }}>
              The use of email within your marketing efforts to promote a
              business’s products and services, as well as incentivize customer
              loyalty. Email marketing is a form of marketing that can make the
              customers on your email list aware of new products, discounts, and
              other services. It can also be a softer sell to educate your
              audience on the value of your brand or keep them engaged between
              purchases. It can also be anything in between. Mailchimp can help
              you design, build, and optimize your email marketing to get the
              best ROI in your marketing program.
            </p>
            <Button
              className="btn"
              style={{ width: "100px" }}
              onClick={() => navigate("/manualmail")}
            >
              Start
            </Button>
          </div>
        </div>
      </BasePage>
    </>
  );
};

export default Dashboard;
