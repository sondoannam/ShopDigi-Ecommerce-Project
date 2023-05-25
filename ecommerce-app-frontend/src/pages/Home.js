import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { services } from "../utilities/Data";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, resetState } from "../features/product/productSlice";
import { toast } from "react-toastify";
import { getAllBlogs } from "../features/blog/blogSlice";
import moment from "moment";

const Home = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.blogs);
  const productState = useSelector((state) => state?.product?.products);
  const filteredPopular = productState.filter((prod) => {
    return prod.tags === 'popular';
  });
  const filteredFeatured = productState.filter((prod) => {
    return prod.tags === 'featured';
  });
  const userCartState = useSelector((state) => state?.auth?.cartProducts);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  const getAllProducts = () => {
    dispatch(getProducts());
  };

  useEffect(() => {
    getBlogs();
    getAllProducts();
  }, []);

  return (
    <>
      <Meta title={"Home"} />
      <BreadCrumb title="Home" />

      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro</h5>
                <p>
                  From $999.00 or <br /> $41.62/mo.
                </p>
                <Link>BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap g-10 justify-content-between align-items-center">
              <div className="small-banner position-relative mb-2">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>BEST SALE</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative mb-2">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative mb-2">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative mb-2">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.tagline} alt="services" />
                    <div>
                      <h6>{i.image}</h6>
                      <p className="mb-0">{i.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex flex-wrap justify-content-between align-align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="cameras" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="cameras" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Laptops</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/laptop.jpg" alt="cameras" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Headphones</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="cameras" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="cameras" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="cameras" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Laptops</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/laptop.jpg" alt="cameras" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Headphones</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="cameras" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Features Collections</h3>
          </div>
        </div>
      </Container>
      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/applewatchs7-01.jpg"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/iMac-01.jpg"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">iMac Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness</h6>
                <p className="text-dark">27‑inch Retina 5K display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/Apple-iPhone-14_Plus-01.jpg"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">SmartPhones</h5>
                <h6 className="text-dark">iPhone 14 Plus.</h6>
                <p className="text-dark">
                  Now in Purple. From $999.00 or $41.62/mo. for 24 mo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/AppleHomePodMini-01.jpg"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Home Speakers</h5>
                <h6 className="text-dark">Room-filling sound</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 6 mo. *
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    brand={item?.brand}
                    title={item?.title}
                    totalRating={item?.totalRating.toString()}
                    price={item?.price}
                    image={item?.images[0]?.url}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  ></SpecialProduct>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "popular") {
                return (
                  <ProductCard
                    key={index}
                    data={filteredPopular}
                  />
                );
              }
            })}
        </div>
      </Container>
      <Container class1="marquee-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marqee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
          <div className="row">
            {blogState &&
              blogState?.map((item, index) => {
                if (index < 4) {
                  return (
                    <div key={index} className="col-3 mb-3">
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images[0]?.url}
                        date={moment(item?.createdAt).format(
                          "MMMM Do YYYY, h:mm a"
                        )}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
