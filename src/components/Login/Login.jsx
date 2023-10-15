import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setUserToken } = useContext(userContext);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function LoginSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((error) => {
        setisLoading(false);
        setError(error.response.data.message);
      });
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      setisLoading(false);
      setUserToken(data.token);
      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("name is invalid").required("email is required"),
    password: Yup.string().required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: LoginSubmit,
  });

  return (
    <>
      <Helmet>
        <title>FreshCart | Login</title>
      </Helmet>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <h3>Login Now:</h3>
        <form onSubmit={formik.handleSubmit}>
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

          {isLoading ? (
            <button type="button" className="btn bg-main text-white mt-2">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <>
              <div className="d-flex align-items-center">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn bg-main text-white mt-2 mx-2"
                >
                  Login
                </button>
                <Link className="btn bg-main text-white mt-2 " to={"/register"}>
                  Register Now
                </Link>
                <Link className="btn ms-auto" to="/forgetpassword">
                  Forget Password?
                </Link>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}
