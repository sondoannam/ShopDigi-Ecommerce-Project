import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import { Rating } from "react-simple-star-rating";
import Color from "../components/Color";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscGitCompare } from "react-icons/vsc";
import { RiHeartAddLine } from "react-icons/ri";
import watchSeries5 from "../images/apple-watch-series-5-01.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addRating, getAProduct, getProducts } from "../features/product/productSlice";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { toast } from "react-toastify";
import { addProductToCart, getSingleUser, getUserCart } from "../features/user/userSlice";
import ReactDOM from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SingleProduct = () => {
  const [copied, setCopied] = useState(false);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getProducts());
    dispatch(getUserCart());
  }, []);
  
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const productState = useSelector((state) => state?.product?.singleProduct);
  const productsState = useSelector((state) => state?.product?.products);

  const filteredPopular = productsState.filter((prod) => {
    return prod.tags === "popular";
  });

  useEffect(() => {
    for (let i = 0; i < cartState?.length; i++) {
      if (getProductId === cartState[i]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [cartState, getProductId]);

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    } else {
      dispatch(
        addProductToCart({
          productId: productState?._id,
          color,
          quantity,
          price: productState?.price,
          checked: 'Unchecked',
        })
      );
      dispatch(getUserCart());
    }
  };

  const [orderedProduct, setOrderedProduct] = useState(true);

  // const closeModal = () => {};
  

  const handleRating = (rate) => {
    setStar(rate)
    // other logic
  }
  console.log(star);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error('Please rate the star rating');
      return false;
    }
    else if (comment === null) {
      toast.error('Please let us know your experience');
      return false;
    }
    else {
      dispatch(addRating({
        star: star,
        comment: comment,
        productId: getProductId,
      }));
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 200);
    }
    return false
  }

  return (
    <>
      <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} />

      <Container class1="main-product-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                {/* <ReactImageZoom {...props} /> */}
                <Zoom>
                  <img
                    alt="Product Zoom"
                    src={productState?.images[0]?.url}
                    width="500"
                  />
                </Zoom>
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              <div>
                <img src={watchSeries5} alt="product" className="img-fluid" />
              </div>
              <div>
                <img src={watchSeries5} alt="product" className="img-fluid" />
              </div>
              <div>
                <img src={watchSeries5} alt="product" className="img-fluid" />
              </div>
              <div>
                <img src={watchSeries5} alt="product" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <Rating
                    className="rating-star"
                    readonly="true"
                    size={20}
                    initialValue={productState?.totalRating.toString()}
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className="border-bottom py-3">
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Type :</h3>{" "}
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Brand :</h3>{" "}
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Category :</h3>{" "}
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Tags :</h3>{" "}
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Availablity :</h3>{" "}
                  <p className="product-data">In stock</p>
                </div>
                <div className="d-flex flex-column gap-10 mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-row gap-10">
                    <span className="badge border border-1 bg-white text-dark border-sencondary">
                      40mm
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-sencondary">
                      44mm
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-10 mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color setColor={setColor} colorData={productState?.color} />
                </div>
                <div className="d-flex flex-row align-items-center gap-15 mt-2 mb-3">
                  <h3 className="product-heading">Quantity :</h3>
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      max={10}
                      style={{ width: "70px" }}
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => {
                        alreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                    >
                      {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                    </button>
                    <button to="/signup" className="button signup text-white">
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <VscGitCompare
                        className="fs-5 me-2
                                            "
                      />
                      Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <RiHeartAddLine
                        className="fs-5 me-2
                                            "
                      />
                      Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex flex-column gap-10 my-3">
                  <h3 className="product-heading">Shipping & Returns</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br />
                    We ship all US domestic orders within{" "}
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center align-item-center my-3">
                  <h3 className="product-heading">Product Link</h3>
                  <CopyToClipboard text={window.location.href}>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setCopied(true)}
                    >
                      {copied ? 'Copied' : 'Copy Product Link'}
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="bg-white p-3">
              <h4>Description</h4>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="reviews-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex gap-10">
                    <Rating
                      className="rating-star"
                      readonly="true"
                      size={20}
                      initialValue={4}
                    />
                    <p className="mb-0 mt-1">Base on {productState && productState?.ratings?.length} Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="#review">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                  <div>
                    <Rating
                      className="rating-star"
                      size={20}
                      initialValue={star}
                      onClick={handleRating}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control mt-2"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={e => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="button border-0" onClick={addRatingToProduct}>Submit Review</button>
                  </div>
              </div>
              <div className="reviews mt-4">
                {productState && productState?.ratings?.map((item, index) => {
                  
                  return (
                    <div className="review" key={index}>
                      <div className="d-flex gap-10 align-items-center">
                        <h6 className="mb-0">{item?.name}</h6>
                        <Rating
                          className="rating-star"
                          readonly="true"
                          size={20}
                          initialValue={item?.star}
                        />
                      </div>
                      <p className="mt-3">
                        {item?.comment}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
          <div className="row">
            <ProductCard data={filteredPopular} />
          </div>
        </div>
      </Container>

      {/* <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img
                    src={watchSeries5}
                    className="img-fluid"
                    alt="product imgae"
                  />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: asgfd</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SingleProduct;
