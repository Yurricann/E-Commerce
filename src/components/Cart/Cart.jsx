import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Cart() {
  let navigate = useNavigate();

  let {
    getLoggedUserCart,
    removeCartItem,
    updateProductQuantity,
    removeCartItems,
  } = useContext(CartContext);

  let [cartDetails, setCartDetails] = useState(null);
  let [isLoadinng, setIsLoading] = useState(false);

  async function getUpdatedCount(id, count) {
    setIsLoading(true);
    let { data } = await updateProductQuantity(id, count);
    setCartDetails(data);
    setIsLoading(false);
  }

  async function removeItem(id) {
    setIsLoading(true);
    let { data } = await removeCartItem(id);
    setCartDetails(data);
    setIsLoading(false);
  }

  async function getCart() {
    setIsLoading(true);
    let { data } = await getLoggedUserCart();
    setCartDetails(data);
    setIsLoading(false);
  }

  async function removeAllCart() {
    setIsLoading(true);
    await removeCartItems();
    navigate("/");
    setIsLoading(false);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>FreshCart | My Cart</title>
      </Helmet>
      {isLoadinng ? (
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
        <>
          {cartDetails ? (
            <div className="w-75 mx-auto my-5 p-3 bg-main-light">
              {console.log()}
              <h3>Shopping Cart</h3>
              <h4 className="h6 text-main fw-bolder">
                Cart Items : {cartDetails.numOfCartItems}
              </h4>
              <h4 className="h6 text-main fw-bolder">
                Total Cart Price: {cartDetails.data.totalCartPrice}EGP
              </h4>

              {cartDetails.data.products.map((product) => (
                <div
                  key={product.product.id}
                  className="row border-bottom py-2"
                >
                  <div className="col-md-1">
                    <img
                      className="w-100"
                      src={product.product.imageCover}
                      alt={product.product.title}
                    />
                  </div>
                  <div className="col-md-11">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="h6">
                          {product.product.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </h3>
                        <h6 className="text-main">Price {product.price} EGP</h6>
                        <button
                          onClick={() => removeItem(product.product.id)}
                          className="btn p-0"
                        >
                          <i className="text-danger font-sm fas fa-trash-can"></i>{" "}
                          Remove
                        </button>
                      </div>

                      <div>
                        <button
                          onClick={() =>
                            getUpdatedCount(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="brdr-main"
                        >
                          +
                        </button>
                        <span className="mx-2">{product.count}</span>
                        <button
                          onClick={() =>
                            getUpdatedCount(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="brdr-main"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between align-items-center">
                <Link to={"/address"} className="btn bg-main mt-2 text-white">
                  <i className=" text-white font-sm fa-regular fa-credit-card me-2"></i>
                  Pay Now
                </Link>
                <button
                  onClick={() => removeAllCart()}
                  className="btn btn-danger mt-2 ms-auto"
                >
                  <i className="text-white font-sm fas fa-trash-can"></i> Remove
                  All
                </button>
              </div>
            </div>
          ) : (
            <h2 className="alert alert-warning text-center my-5">
              No Products in your cart
            </h2>
          )}
        </>
      )}
    </>
  );
}
