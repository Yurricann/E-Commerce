import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Verifycode() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  async function onSubmit(values) {
    let response = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .catch((error) => {
        setError(error.response.data.message);
      });
    if (response.data.status === "Success") {
      navigate("/setnewpassword");
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit,
  });

  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      <form className="w-75 m-auto my-4" onSubmit={formik.handleSubmit}>
        <label htmlFor="code">Reset Code:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.resetCode}
          className="form-control mb-2"
          name="resetCode"
          id="resetCode"
          type="text"
        />
        <button type="submit" className="btn bg-main text-white mt-2 mx-2">
          Check Code
        </button>
      </form>
    </>
  );
}
