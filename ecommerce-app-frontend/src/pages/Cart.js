import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  removeProductCart,
  updateProductCart,
  //selectedProduct,
  selectProductCart,
} from "../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [listChecked, setListChecked] = useState([]);
  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  
  useEffect(() => {
    userCartState?.forEach((item) => {
      dispatch(selectProductCart({
        cartItemId: item?._id,
        checked: 'Unchecked',
      }));
    });
  }, []);

  // Fetch product cart
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  // Update product cart - quantity
  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateProductCart({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 300);
    }
  }, [dispatch, productUpdateDetail]);

  // Remove product from cart
  const deleteAProductCart = (id) => {
    dispatch(removeProductCart(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 300);
  };

  // Select & unselect product in cart
  const handleChange = (e) => {
    //console.log(e.target.value);
    if(listChecked.includes(e.target.value)){
      const newListChecked = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newListChecked);
      dispatch(selectProductCart({
        cartItemId: e.target.value,
        checked: 'Unchecked',
      }))
    }else {
      setListChecked([...listChecked, e.target.value]);
    }
  }

  const handleOnchangeCheckAll = (e) => {
    if(e.target.checked) {
      const newListChecked = [];
      userCartState?.forEach((item) => {
        newListChecked.push(item?._id);
      })
      setListChecked(newListChecked);
    }else {
      setListChecked([]);
      userCartState?.forEach((item) => {
        dispatch(selectProductCart({
          cartItemId: item?._id,
          checked: 'Unchecked',
        }));
      });
    }
  };

  useEffect(() => {
    for (const element of listChecked) {
      dispatch(selectProductCart({
        cartItemId: element,
        checked: 'Checked',
      }));
    }
  }, [listChecked]);

  // get total amount
  useEffect(() => {
    let sum = 0;

    if (listChecked.length !== 0) {
      let itemFound = userCartState.filter(({_id}) => {
        return listChecked.includes(_id);
      });
      for (let index = 0; index < itemFound?.length; index++) {
        sum +=
          (Number(itemFound[index]?.quantity) * itemFound[index]?.price);
      }
    }
    else sum = 0;
    setTotalAmount(sum);
  }, [listChecked]);

  console.log(userCartState);
  console.log(listChecked);
  console.log(listChecked.length);

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex justify-content-between align-items-center py-3">
              <div
                style={{ display: "inline-block" }}
                className="form-check cart-col-0"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === userCartState?.length}
                />
              </div>
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data d-flex justify-content-between align-items-center py-3 mb-2"
                  >
                    <div className="cart-col-0 d-flex align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name=""
                          value={item?._id}
                          onChange={handleChange}
                          checked={listChecked.includes(item?._id)}
                        />
                      </div>
                    </div>
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images[0]?.url}
                          className="img-fluid"
                          alt="product"
                        />
                      </div>
                      <div className="w-75">
                        <h5 className="title">{item?.productId.title}</h5>
                        <p className="color">Color: {item?.color?.title}</p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">$ {item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          type="number"
                          className="form-control"
                          min={1}
                          max={10}
                          id=""
                          value={
                            productUpdateDetail?.quantity
                              ? productUpdateDetail?.quantity
                              : item?.quantity
                          }
                          onChange={(e) => {
                            setProductUpdateDetail({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => deleteAProductCart(item?._id)}
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        $ {item?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: $ {totalAmount}</h4>
                  <p>Taxes and shipping calculated at Checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
