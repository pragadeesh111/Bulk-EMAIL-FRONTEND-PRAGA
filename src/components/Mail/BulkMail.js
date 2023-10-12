/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import { ExcelRenderer } from "react-excel-renderer";

const BulkMailSchemas = yup.object({
  toEmail: yup
    .object({
      file: yup.mixed(),
    })
    .required("Valid file"),
  subject: yup.string().required("Min 10 Characters").min(10),
  content: yup.string().required("Min 25 Characters").min(10),
});
const BulkMail = () => {
  const navigate = useNavigate();
  const [recepiant, setRecepiant] = useState([]);

  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        ExcelRenderer(selectedFile, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            setRecepiant(res.rows);
            let val = res.rows.map((e) => e[0]);
            setFieldValue("toEmail", dataModal(val));
          }
        });
      } else {
        toast.warning("Please select only Excel file types");
      }
    } else {
      console.log("select file");
    }
  };

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
    validationSchema: BulkMailSchemas,
    onSubmit: (val) => {
      SendBulkMail(val);
    },
  });

  const SendBulkMail = async (val) => {
    try {
      let token = localStorage.getItem("token");
      let { toEmail, subject, content } = { ...val, toEmail: val.toEmail.data };
      let payload = { token, toEmail, subject, content };
      // console.log(toEmail);

      let res = await axios.post(`${API}/sendmail`, payload);
      // console.log(res);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  function dataModal(val) {
    let arr = [];
    for (let i = 0; i < val.length; i++) {
      const spaceRemovedEmail = val[i].replace(/ /g, "");
      if (
        arr.indexOf(spaceRemovedEmail) === -1 &&
        spaceRemovedEmail.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        arr.push(spaceRemovedEmail);
      }
    }
    let obj = {
      duplicates: val.length - arr.length,
      withoutDuplicates: arr.length,
      total: val.length,
      data: arr,
    };

    return obj;
  }

  return (
    <BasePage>
      <div className="manual">
        <h3>Bulk Mail</h3>
        <div className="card">
          <Form className="form-manual" onSubmit={handleSubmit}>
            {touched.toEmail && errors.toEmail ? (
              <p style={{ color: "red" }}>{errors.toEmail}</p>
            ) : (
              ""
            )}
            <Form.Group>
              <Form.Control
                type="file"
                onChange={handleFile}
                onBlur={handleBlur}
                name="toEmail"
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

export default BulkMail;
