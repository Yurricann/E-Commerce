import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishListContext";

export default function FeaturedProducts() {
  let { addToCart } = useContext(CartContext);
  let { addToWish } = useContext(WishContext);

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

  async function addProductToWish(id) {
    let response = await addToWish(id);
    if (response.data.status === "success") {
      toast.success("Added to your wish List", {
        duration: 2000,
        position: "top-center",
        className: "bg-main text-white",
      });
    } else {
      toast.error("Couldn't add it to your wish List", {
        duration: 2000,
        position: "top-center",
        className: "bg-main text-white",
      });
    }
  }

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data } = useQuery("featuredProducts", getFeaturedProducts, {
    cacheTime: 3000,
    refetchInterval: 5000,
  });

  return (
    <>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center">
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
        <div className="container py-2">
          <h2>Featured Products</h2>
          <div className="row">
            {data?.data.data.map((product) => (
              <div key={product.id} className="col-md-2">
                <div className="product py-3 px-2 my-2">
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      className="w-100"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="text-main font-sm fw-bold">
                      {product.category.name}
                    </span>
                    <h3 className="h6">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>

                    <div className="d-flex justify-content-between mt-3">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-around align-items-center">
                    <button
                      onClick={() => {
                        addProductToCart(product.id);
                      }}
                      className="btn bg-main text-white btn-sm mt-2"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={(e) => {
                        addProductToWish(product.id);
                        e.target.classList.add("filled");
                      }}
                      className="btn heart"
                    >
                      <i className="fa-solid fa-heart cursor-pointer"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
