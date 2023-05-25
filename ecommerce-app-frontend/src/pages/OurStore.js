import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Rating } from "react-simple-star-rating";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";

const OurStore = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(4);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Filter states
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const productState = useSelector((state) => state.product.products); 

  const getAllProducts = () => {
    dispatch(getProducts({sort, tag, brand, category, minPrice, maxPrice}));
  };

  useEffect(() => {
    let getBrands = [];
    let getCategories = [];
    let getTags = [];
    for (const iterator of productState) {
      const element = iterator;
      getBrands.push(element.brand);
      getCategories.push(element.category);
      getTags.push(element.tags);
    }
    setBrands(getBrands);
    setCategories(getCategories);
    setTags(getTags);
  }, [productState]);

  console.log(
    [...new Set(brands)],
    [...new Set(categories)],
    [...new Set(tags)]
  );

  useEffect(() => {
    getAllProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store"></BreadCrumb>

      <Container class1="store-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop by Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)].map((item, index) => {
                      return (
                        <li key={index} onClick={() => setCategory(item)}>
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter by</h3>
              <div>
                {/* <h5 className="sub-title">Availablity</h5>
                  <div>
                    <div className="fomr-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={{}}
                        id=""
                      />
                      <label htmlFor="" className="from-check-label">
                        In Stock (1)
                      </label>
                    </div>
                    <div className="fomr-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={{}}
                        id=""
                      />
                      <label htmlFor="" className="from-check-label">
                        Out of Stock (0)
                      </label>
                    </div>
                  </div> */}
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-align-items-center gap-10">
                  <div className="form-floating" nonvalidate>
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      step={0.05}
                      defaultValue={0.0}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      step={0.05}
                      defaultValue={50.0}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                <div className="mt-4 mb-3">
                  <h3 className="sub-title">Brands</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      {brands &&
                        [...new Set(brands)].map((item, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => setBrand(item)}
                              className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {item}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-3">
                  <h3 className="filter-title">Products Tags</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      {tags &&
                        [...new Set(tags)].map((item, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => setTag(item)}
                              className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {item}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {/* <h5 className="sub-title">Colors</h5>
                  <div>
                    <Color />
                  </div> */}
                {/* <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="fomr-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={{}}
                        id="color-1"
                      />
                      <label htmlFor="color-1" className="from-check-label">
                        S (2)
                      </label>
                    </div>
                    <div className="fomr-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={{}}
                        id="color-2"
                      />
                      <label htmlFor="color-2" className="from-check-label">
                        M (2)
                      </label>
                    </div>
                  </div> */}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Products</h3>
              <div>
                <div className="random-products mb-3 d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="w-50">
                    <h5>Kid headphones bulk 10 pack...</h5>
                    <Rating
                      className="rating-star"
                      readonly="true"
                      size={20}
                      initialValue={4}
                    />
                    <p>$100.00</p>
                  </div>
                </div>
                <div className="random-products d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="w-50">
                    <h5>Kid headphones bulk 10 pack...</h5>
                    <Rating
                      className="rating-star"
                      readonly="true"
                      size={20}
                      initialValue={4}
                    />
                    <p>$100.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select name="" id="" className="form-control form-select" onChange={(e) => setSort(e.target.value)}>
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">
                      Alphabetically, Z-A
                    </option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-align-items-center gap-10">
                  <p className="total-products mb-0">21 Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard
                  data={productState ? productState : []}
                  grid={grid}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
