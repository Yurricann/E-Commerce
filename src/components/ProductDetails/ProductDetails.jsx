import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  var settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { addToCart } = useContext(CartContext);

  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response.data.status === "success") {
      localStorage.setItem("currentCartID", response?.data.data._id);

      toast.success("Product is successfully added", {
        duration: 2000,
        position: "top-center",
        className: "bg-main text-white",
      });
    } else {
      toast.error("Error token expired. Please login again", {
        duration: 2000,
        position: "top-center",
        className: "bg-main text-white",
      });
    }
  }

  let { id } = useParams();

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data } = useQuery("productDetails", () => getProductDetails(id));

  console.log(data?.data.data);

  return (
    <>
      <Helmet>
        <title>{data?.data.data.title}</title>
      </Helmet>
      <div className="container">
        {data?.data.data ? (
          <div className="row py-2 align-items-center">
            <div className="col-md-4">
              <Slider {...settings}>
                {data?.data.data.images.map((image) => (
                  <img
                    src={image}
                    className="w-100"
                    alt={data.data.data.title}
                  ></img>
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <h2>{data?.data.data.title}</h2>
              <p>{data?.data.data.description}</p>

              <h6 className="text-main">{data?.data.data.category?.name}</h6>
              <h6 className="text-main">Price : {data?.data.data.price} EGP</h6>
              <div className="d-flex justify-content-between">
                <span>
                  Rating Quanitity : {data?.data.data.ratingsQuantity}
                </span>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  {data?.data.data.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => {
                  addProductToCart(data?.data.data.id);
                }}
                className="btn bg-main text-white w-100 mt-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
