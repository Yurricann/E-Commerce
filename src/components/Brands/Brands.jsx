import React, { useEffect, useState } from "react";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Brands() {
  let [brands, setBrands] = useState(null);
  let [isLoading, setisLoading] = useState(false);

  async function getBrands() {
    setisLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setBrands(data);
    setisLoading(false);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>FreshCart | Brands</title>
      </Helmet>
      <h2 className="text-main text-center fw-bolder my-3">All Brands</h2>

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
          {brands?.data.map((categ) => (
            <div key={categ._id} className="col-md-3 cursor-pointer">
              <div className="card">
                <div className="card-img">
                  <img
                    src={categ.image}
                    alt={categ.name}
                    className="img-fluid"
                  />
                </div>
                <div className="card-body">
                  <h2 className="text-center font-sm">{categ.name}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
