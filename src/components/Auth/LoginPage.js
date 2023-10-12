import React, { useEffect, useState } from "react";
import "./auth.css";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import login from "../../assets/login.gif";
import { Link, useNavigate } from "react-router-dom";
import HeaderPage from "../NavBar/Header";
import API from "../../url";
import { toast } from "react-toastify";

const LoginSchemaValidation = yup.object({
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
});

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchemaValidation,
      onSubmit: (val) => {
        UserLogin(val);
      },
    });

  const UserLogin = async (val) => {
    let { email, password } = val;
    let payload = { email, password };
    try {
      const res = await axios.post(`${API}/users/login`, payload);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.clear();
    }
  }, []);

  return (
    <>
      <HeaderPage />
      <div className="login">
        <div className="left">
          <img style={{ width: "100%" }} alt="loginImg" src={login} />
          <Link to={"/signup"}>Create an account? Signup Here!</Link>
        </div>
        <div className="right">
          <h3 style={{ fontSize: "2rem", fontWeight: "700" }}>Login</h3>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              {touched.email && errors.email ? (
                <p style={{ color: "red" }}>{errors.email}</p>
              ) : (
                ""
              )}
              <Form.Control
                style={{
                  border: "none",
                  borderBottom: "1px solid black",
                  borderBottomWidth: "70%",
                }}
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              {touched.password && errors.password ? (
                <p style={{ color: "red" }}>{errors.password}</p>
              ) : (
                ""
              )}
              <Form.Control
                style={{
                  border: "none",
                  borderBottom: "1px solid black",
                  borderBottomWidth: "80%",
                }}
                type={show ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group style={{ display: "flex" }}>
              <Form.Check
                type="checkbox"
                onClick={() => setShow(!show)}
                label="Show Password"
              />
            </Form.Group>
            <Link to={"/forgotpassword"}>ForgotPassword</Link>
            <Button
              className="btn"
              style={{
                width: "fit-content",
                backgroundColor: "#1f3d50",
                border: "none",
              }}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
