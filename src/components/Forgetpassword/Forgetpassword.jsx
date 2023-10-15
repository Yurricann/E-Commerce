import React, { useState } from "react";
import Style from "./Forgetpassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Forgetpassword() {
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  async function onSubmit(values) {
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .catch((error) => {
        setError(error.response.data.message);
      });
    if (data.statusMsg === "success") {
      toast.success(data.message, {
        duration: 2000,
        position: "top-center",
        className: "bg-main text-white",
      });
      navigate("/verifycode");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit,
  });

  return (
    <>
      <Helmet>
        <title>FreshCart | ForgetPassword</title>
      </Helmet>
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
        <button type="submit" className="btn bg-main text-white mt-2 mx-2">
          Send Code
        </button>
      </form>
    </>
  );
}
