import { useFormik } from "formik";
import React from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Address() {
  let { onlinePayment, cartId } = useContext(CartContext);

  async function onSubmit(values) {
    let response = await onlinePayment(cartId, "http://localhost:3000", values);

    window.location.href = response?.data.session.url;
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Details: </label>
        <input
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          className="form-control mb-2"
          name="details"
          id="details"
        />

        <label htmlFor="phone">Phone: </label>
        <input
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="tel"
          className="form-control mb-2"
          name="phone"
          id="phone"
        />

        <label htmlFor="city">City: </label>
        <input
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          className="form-control mb-2"
          name="city"
          id="city"
        />

        <button type="submit" className="btn bg-main text-white my-2">
          Pay Now
        </button>
      </form>
    </>
  );
}
