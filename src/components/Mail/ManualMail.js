import React from "react";
import "./index.css";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import API from "../../url";
import BasePage from "../Base/BasePage";
import Form from "react-bootstrap/esm/Form";
import ReactQuill from "react-quill";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { modules, formats } from "./QuillData";
import { toast } from "react-toastify";

const ManualMailSchemas = yup.object({
  toEmail: yup.string().required("Please Enter A Valid Email"),
  subject: yup.string().required("Min 10 Characters").min(10),
  content: yup.string().required("Min 25 Characters").min(10),
});
const ManualMail = () => {
  const navigate = useNavigate();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    errors,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: {
      toEmail: "",
      subject: "",
      content: "",
    },
    validationSchema: ManualMailSchemas,
    onSubmit: (val) => {
      MailManual(val);
    },
  });

  const MailManual = async (val) => {
    try {
      let token = localStorage.getItem("token");
      let { toEmail, subject, content } = { ...val, toEmail: [val.toEmail] };
      let payload = { token, toEmail, subject, content };
      console.log(payload);

      let res = await axios.post(`${API}/sendmail`, payload);
      // console.log(res);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <BasePage>
      <div className="manual">
        <h5>Manual Mail</h5>
        <p>
          <b>Note:</b> One Email To Another Email Put On The Comma ( <b>,</b> )
        </p>
        <div className="card">
          <Form className="form-manual" onSubmit={handleSubmit}>
            {touched.toEmail && errors.toEmail ? (
              <p style={{ color: "red" }}>{errors.toEmail}</p>
            ) : (
              ""
            )}
            <Form.Group>
              <Form.Control
                placeholder="Recipients"
                onChange={handleChange}
                onBlur={handleBlur}
                name="toEmail"
                value={values.toEmail}
              />
            </Form.Group>
            {touched.subject && errors.subject ? (
              <p style={{ color: "red" }}>{errors.subject}</p>
            ) : (
              ""
            )}
            <Form.Group>
              <Form.Control
                placeholder="Subject"
                onChange={handleChange}
                onBlur={handleBlur}
                name="subject"
                value={values.subject}
              />
            </Form.Group>
            {touched.content && errors.content ? (
              <p style={{ color: "red" }}>{errors.content}</p>
            ) : (
              ""
            )}
            <Form.Group style={{ height: "50%" }}>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={values.content}
                onChange={(e, a, b, c) => {
                  if (c.getText().length === 1) {
                    setFieldValue("content", "");
                  } else {
                    setFieldValue("content", e);
                  }
                }}
                onBlur={(a, b, c) => setFieldTouched("content", true)}
              />
            </Form.Group>
            <Button type="submit">Send</Button>
          </Form>
        </div>
      </div>
    </BasePage>
  );
};

export default ManualMail;
