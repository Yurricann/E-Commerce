import React, { useContext, useEffect, useState } from "react";
import { WishContext } from "../../Context/WishListContext";
import { BallTriangle } from "react-loader-spinner";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  let { getLoggedUserWishList, removeItemWish } = useContext(WishContext);
  let { addToCart } = useContext(CartContext);
  let [isLoading, setisLoading] = useState(false);

  let [wishListItems, setWishListItems] = useState(null);

  async function getItems() {
    setisLoading(true);
    let { data } = await getLoggedUserWishList();
    setWishListItems(data?.data);
    setisLoading(false);
  }

  async function removeItemfromWish(id) {
    setisLoading(true);
    await removeItemWish(id);
    await getItems();
    setisLoading(false);
  }

  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response.data.status === "success") {
      localStorage.setItem("currentCartID", response?.data.data._id);

      toast.success("Product is added to your Cart", {
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

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Helmet>
        <title>FreshCart | My Wishlist</title>
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
        <div className="w-75 mx-auto mt-5 mb-2 p-3 bg-main-light">
          <h3>My Wish List</h3>
          {wishListItems?.map((product) => (
            <div key={product.id} className="row border-bottom py-2">
              <div className="col-md-1">
                <img
                  className="w-100"
                  src={product.imageCover}
                  alt={product.title}
                />
              </div>
              <div className="col-md-11">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="h6">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <h6 className="text-main">Price {product.price} EGP</h6>
                  </div>
                  <div className="d-flex flex-column">
                    <button
                      onClick={() => {
                        addProductToCart(product.id);
                        removeItemfromWish(product.id);
                      }}
                      className="btn p-0 bg-main p-1 text-white mb-2"
                    >
                      <i className="fa-solid text-white font-sm me-1 fa-cart-shopping"></i>
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItemfromWish(product.id)}
                      className="btn bg-danger text-white p-1"
                    >
                      <i className="text-white font-sm me-1 fas fa-trash-can"></i>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
