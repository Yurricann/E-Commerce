import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SetNewPassword() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  async function resetPassword(values) {
    let response = await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error);
      });
    console.log(response);
    if (response?.status === 200) {
      navigate("/login");
    }
  }

  let passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  let validationSchema = Yup.object({
    email: Yup.string().email("name is invalid").required("email is required"),
    newPassword: Yup.string()
      .matches(
        passwordRegExp,
        "Password must contain eight characters, at least one letter and one number"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      <form className="w-75 m-auto my-4" onSubmit={formik.handleSubmit}>
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
          value={formik.values.newPassword}
          className="form-control mb-2"
          name="newPassword"
          id="newPassword"
          type="password"
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <div className="alert mt-2 p-2 alert-danger">
            {formik.errors.newPassword}
          </div>
        ) : (
          ""
        )}

        <button type="submit" className="btn bg-main text-white mt-2 mx-2">
          Reset Password
        </button>
      </form>
    </>
  );
}
