import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function registerSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((error) => {
        setisLoading(false);
        setError(error.response.data.message);
      });
    if (data.message === "success") {
      setisLoading(false);
      navigate("/login");
    }
  }

  let phoneRegExp = /^01[0125][0-9]{8}$/;
  let passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "minimum length is 3")
      .max(10, "maximum length is 10")
      .required("name is required"),
    email: Yup.string().email("name is invalid").required("email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "phone is invalid")
      .required("phone is required"),
    password: Yup.string()
      .matches(
        passwordRegExp,
        "Password must contain eight characters, at least one letter and one number"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("rePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <Helmet>
        <title>FreshCart | Registeration</title>
      </Helmet>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <h3>Register Now:</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">name:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            className="form-control mb-2"
            name="name"
            id="name"
            type="text"
          />

          {formik.errors.name && formik.touched.name ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email">email:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control mb-2"
            name="email"
            id="email"
            type="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">password:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="form-control mb-2"
            name="password"
            id="password"
            type="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            className="form-control mb-2"
            name="rePassword"
            id="rePassword"
            type="password"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">phone:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="form-control mb-2"
            name="phone"
            id="phone"
            type="tel"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          {isLoading ? (
            <button type="button" className="btn bg-main text-white mt-2">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white mt-2"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
