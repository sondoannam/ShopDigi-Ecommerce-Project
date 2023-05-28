import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../features/user/userSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/product/productSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.products)
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  
  // Fetch product cart
  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  
  const userCartState = useSelector((state) => state?.auth?.cartProducts);

  // get total amount
  useEffect(() => {
    let sum = 0;
    if (userCartState.length !== 0) {
      for (let index = 0; index < userCartState?.length; index++) {
        sum +=
          Number(userCartState[index]?.quantity) * userCartState[index]?.price;
        setTotalAmount(sum);
      }
    }
    else setTotalAmount(0);
  }, [userCartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index ++) {
      const element = productState[index];
      data.push({
        id: index,
        product: element?._id,
        name: element?.title,
      })
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="header-top-strip py-1">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white" style={{ marginBottom: 0 }}>
                Hotline:{" "}
                <a className="text-white" href="tel: +84 123456789">
                  +84 123456789
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white">ShopDigi.</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.product}`);
                    dispatch(getAProduct(selected[0]?.product));
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  minLength={1}
                  placeholder="Search Product Here..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/compare.svg" alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Favorites <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/user.svg" alt="user" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Login <br />
                        My Account
                      </p>
                    ) : (
                      <div className="dropdown">
                        <p className="mb-0">
                          Hello,
                          <br />
                          {authState?.user?.firstname}
                        </p>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <a className="dropdown-item" href="/my-profile">
                              My Profile
                            </a>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                        <span
                          style={{ fontSize: "0.75rem" }}
                          className="badge bg-white text-dark"
                        >
                          {userCartState && userCartState?.length}
                        </span>
                        <h6 className="mb-0">
                          $ {userCartState && totalAmount}
                        </h6>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu.svg" alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="text-white dropdown-item" href="/">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="text-white dropdown-item" href="/">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="text-white dropdown-item" href="/">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
