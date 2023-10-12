/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "./auth.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import signup from "../../assets/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import HeaderPage from "../NavBar/Header";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import API from "../../url";
import { toast } from "react-toastify";

const CreateSchemaValidation = yup.object({
  firstName: yup.string().required("Please Enter Your FirstName"),
  lastName: yup.string().required("Please Enter Your LastName"),
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
});

const SignupPage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: CreateSchemaValidation,
      onSubmit: (val) => {
        SignupAccount(val);
      },
    });

  let SignupAccount = async (val) => {
    let { firstName, lastName, email, password } = val;
    let payload = { firstName, lastName, email, password };
    try {
      let res = await axios.post(`${API}/users/signup`, payload);
      // console.log(res);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <HeaderPage />
      <div className="signup">
        <div className="left">
          <img
            src={signup}
            alt="signAnime"
            style={{ width: "100%", height: "70%" }}
          />
          <Link to={"/login"}>Already have an account? Login Here!</Link>
        </div>
        <div className="right">
          <h3 style={{ fontSize: "2rem", fontWeight: "700" }}>Signup</h3>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              {touched.firstName && errors.firstName ? (
                <p style={{ color: "red" }}>{errors.firstName}</p>
              ) : (
                ""
              )}
              <Form.Control
                style={{
                  border: "none",
                  borderBottom: "1px solid black",
                  borderBottomWidth: "70%",
                }}
                type="text"
                placeholder="Enter FirstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              {touched.lastName && errors.lastName ? (
                <p style={{ color: "red" }}>{errors.lastName}</p>
              ) : (
                ""
              )}
              <Form.Control
                style={{
                  border: "none",
                  borderBottom: "1px solid black",
                  borderBottomWidth: "70%",
                }}
                type="text"
                placeholder="Enter LastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

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
                }}
                type={show ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group
              style={{ display: "flex" }}
              onClick={() => setShow(!show)}
            >
              <Form.Check type="checkbox" label="Show Password" />
            </Form.Group>
            <Button
              style={{
                width: "fit-content",
                backgroundColor: "#1f3d50",
                border: "none",
              }}
              variant="primary"
              type="submit"
            >
              Signup
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
