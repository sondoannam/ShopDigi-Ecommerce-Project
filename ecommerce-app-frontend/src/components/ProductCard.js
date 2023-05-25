import React from "react";
import { Rating } from "react-simple-star-rating";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import danielWellington01 from "../images/daniel-wellington-01.jpg";
import danielWellington02 from "../images/daniel-wellington-02.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from '../features/product/productSlice';

const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const addToWishList = (id) => {
    alert(id);
    dispatch(addToWishlist(id));
  }

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname == "/product" ? `gr-${grid}` : "col-3"
            }`}
          >
            <div
              // to={`/product/${item?._id}`}
              className="product-card position-relative"
            >
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent">
                  <img src={wish} alt="wishlist" onClick={(e) => {addToWishList(item?._id)}} />
                </button>
              </div>
              <div className="product-image">
                <img
                  src={item?.images[0].url}
                  className="mx-auto"
                  alt="product"
                  width={269}
                  height={269}
                />
                <img
                  src={danielWellington02}
                  className="mx-auto"
                  alt="product"
                  width={269}
                  height={269}
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title" onClick={() => navigate(`/product/${item?._id}`)}>{item?.title}</h5>
                <Rating
                  className="rating-star"
                  readonly="true"
                  size={20}
                  initialValue={item?.totalRating}
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">${item?.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column">
                  <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img onClick={() => navigate('/product/'+item?._id)} src={view} alt="view" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="add cart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
