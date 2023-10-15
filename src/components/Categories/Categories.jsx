import React, { useEffect, useState } from "react";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Categories() {
  let [categories, setCategories] = useState(null);
  let [isLoading, setisLoading] = useState(false);

  async function getCategories() {
    setisLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data);
    setisLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>FreshCart | Categories</title>
      </Helmet>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <div className="row g-4 my-3">
          {categories?.data.map((categ) => (
            <div key={categ._id} className="col-md-4 cursor-pointer">
              <div className="card">
                <div className="card-img w-100">
                  <img
                    src={categ.image}
                    alt={categ.name}
                    className="w-100"
                    height={300}
                  />
                </div>
                <div className="card-body">
                  <h2 className="text-center text-main fw-bold">
                    {categ.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
