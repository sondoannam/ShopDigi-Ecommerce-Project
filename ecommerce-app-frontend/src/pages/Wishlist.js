import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const getWishlistProducts = () => {
    dispatch(getUserProductWishlist());
  };
  const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist);

  useEffect(() => {
    getWishlistProducts();
  }, []);

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
        dispatch(getUserProductWishlist());
    }, 300);
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlistState && wishlistState.length === 0 && <div className="text-center fs-3">You haven't added any product yet.</div>}
          {wishlistState && wishlistState?.map((item, index) => {
            return (
              <div key={index} className="col-3">
                <div className="wishlist-card position-relative">
                  <img
                    onClick={() => {
                        removeFromWishlist(item?._id);
                    }}
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute btn-close"
                    style={{ top: "10px", right: "10px" }}
                  />
                  <div className="wishlist-card-image bg-white">
                    <img
                      src={item?.images[0].url ? item?.images[0].url : "images/apple-watch-series-5-01.jpg"}
                      className="d-block mx-auto"
                      width={269}
                      height={269}
                      alt="watch"
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">{item?.title}</h5>
                    <h6 className="price">${item?.price}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
