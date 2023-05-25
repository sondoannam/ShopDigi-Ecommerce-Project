import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.getOrderedProducts);
  console.log(orderState);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row mb-0">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h4>Order Id</h4>
              </div>
              <div className="col-3">
                <h4>Total Amount</h4>
              </div>
              <div className="col-3">
                <h4>After Discount</h4>
              </div>
              <div className="col-3">
                <h4>Status</h4>
              </div>
              <hr />
            </div>
          </div>
          <div className="col-12 mt-0">
            {orderState &&
              orderState.map((item, index) => {
                return (
                  <div
                    className="row my-3 pt-2"
                    style={{ backgroundColor: "#fedb69" }}
                    key={index}
                  >
                    <div className="col-3">
                      <h6>{item?._id}</h6>
                    </div>
                    <div className="col-3">
                      <h6>{item?.totalPrice}</h6>
                    </div>
                    <div className="col-3">
                      <h6>{item?.totalPriceAfterDiscount}</h6>
                    </div>
                    <div className="col-3">
                      <h6>{item?.orderStatus}</h6>
                    </div>
                    <div className="col-12 text-white">
                      <div
                        className="row py-3"
                        style={{ backgroundColor: "#232f3e" }}
                      >
                        <div className="col-3">
                          <h6>Product</h6>
                          <hr style={{ border: "2px solid #fedb69" }} />
                        </div>
                        <div className="col-3">
                          <h6>Color</h6>
                          <hr style={{ border: "2px solid #fedb69" }} />
                        </div>
                        <div className="col-3">
                          <h6>Quantity</h6>
                          <hr style={{ border: "2px solid #fedb69" }} />
                        </div>
                        <div className="col-3">
                          <h6>Price</h6>
                          <hr style={{ border: "2px solid #fedb69" }} />
                        </div>
                        {item?.orderItems?.map((p, index2) => {
                          return (
                            <div className="col-12" key={index2}>
                              <div className="row align-items-center">
                                <div className="col-3 d-flex align-items-center">
                                  <div className="w-25">
                                    <img
                                      src={p?.product?.images[0]?.url}
                                      className="img-fluid"
                                      alt="product"
                                      style={{ paddingRight: "10px" }}
                                    />
                                  </div>
                                  <div className="w-75">
                                    <h6>{p?.product?.title}</h6>
                                  </div>
                                </div>
                                <div className="col-3">
                                  <ul className="colors ps-0">
                                    <li
                                      style={{
                                        backgroundColor: p?.color?.code,
                                      }}
                                    ></li>
                                  </ul>
                                </div>
                                <div className="col-3">
                                  <p>{p?.quantity}</p>
                                </div>
                                <div className="col-3">
                                  <p>{p?.price} $</p>
                                </div>
                              </div>
                              <hr className="mt-3" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
