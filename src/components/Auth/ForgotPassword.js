import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./auth.css";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import axios from "axios";
import API from "../../url";
import { toast } from "react-toastify";
import HeaderPage from "../NavBar/Header";
import forgot from "../../assets/forgot.gif";

const LoginSchemaValidation = yup.object({
  email: yup.string().email().required("Please Enter A Valid Email"),
});

export default function ForgotPassword() {
  let [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: LoginSchemaValidation,
      onSubmit: (val) => {
        done(val);
      },
    });

  const done = async (val) => {
    let { email } = val;
    // console.log("val ==", val);

    let payload = { email };
    try {
      let res = await axios.post(`${API}/users/forgetPassword`, payload);
      // console.log(res);
      localStorage.setItem("resetToken", res.data.token);
      toast.success(res.data.message);
      setShow(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setShow(false);
    }
  };

  return (
    <>
      <HeaderPage />
      <div className="forgot">
        <div className="left">
          <img style={{ width: "70%" }} src={forgot} alt="forgot" />
        </div>
        <div className="right">
          {show ? (
            <Form
              className="formm "
              // onSubmit={handleSubmit}
            >
              <div style={{ textAlign: "center" }}>
                <h2 style={{}}>
                  {" "}
                  {show ? "Check Your Email" : "Forgot Your Password?"}{" "}
                </h2>

                <p className="forget-exp">
                  {" "}
                  {show
                    ? "A Link Has Been Sent To Your Mail Id To Reset Your Password !"
                    : "Enter your email address below, we'll send you a link to reset your password."}{" "}
                </p>
              </div>
              <div className="login-fields">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => navigate("/login")}
                >
                  Click to login
                </Button>
              </div>
            </Form>
          ) : (
            <Form className="formm " onSubmit={handleSubmit}>
              <div style={{ textAlign: "center" }}>
                <h2 style={{}}>
                  {" "}
                  {show ? "Check Your Email" : "Forgot Your Password?"}{" "}
                </h2>

                <p className="forget-exp">
                  {" "}
                  {show
                    ? "A Link Has Beedn Sent To Your Mail Id To Reset Your Password !"
                    : "Enter your email address below, we'll send you a link to reset your password."}{" "}
                </p>
              </div>
              <div
                className="login-fields"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <TextField
                  label="Enter The Email"
                  variant="outlined"
                  onBlur={handleBlur}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  style={{
                    width: "70%",
                    marginTop: "20px",
                    fontSize: "15px",
                  }}
                />
                {touched.email && errors.email ? (
                  <p style={{ color: "red" }}>{errors.email}</p>
                ) : (
                  ""
                )}
                <Button
                  className="btn"
                  variant="primary"
                  type="submit"
                  // onClick={() => done()}
                >
                  Submit
                </Button>
              </div>

              <div style={{ marginTop: "25px" }}>
                <div className="text-center mb-1">
                  <Link to="/signup" underline="hover">
                    {" "}
                    Create A New Account{" "}
                  </Link>
                </div>
                <div className="text-center">
                  <Link to="/login" underline="hover">
                    {" "}
                    <span>Already Have A Account?</span> Login.{" "}
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
