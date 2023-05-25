import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Color from '../components/Color';
import Container from '../components/Container';
import Meta from '../components/Meta';

const CompareProduct = () => {
  return (
    <>
      <Meta title={'Blogs'}/>
      <BreadCrumb title='Blogs'/>
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid'/>
                <div className="product-card-image">
                  <img src="images/apple-watch-series-5-01.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wifi +3G Tablet
                  </h5>
                  <h6 className="price mb-3 mt-3">$100</h6>
                  <div>
                    <div className="product-details">
                      <h5>Brand:</h5>
                      <p>Apple</p>
                    </div>
                    <div className="product-details">
                      <h5>Type:</h5>
                      <p>Smart Watch</p>
                    </div>
                    <div className="product-details">
                      <h5>Availablity:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-details">
                      <h5>Color:</h5>
                      <Color />
                    </div>
                    <div className="product-details">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>40mm</p>
                        <p>44mm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid'/>
                <div className="product-card-image">
                  <img src="images/apple-watch-series-5-01.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wifi +3G Tablet
                  </h5>
                  <h6 className="price mb-3 mt-3">$100</h6>
                  <div>
                    <div className="product-details">
                      <h5>Brand:</h5>
                      <p>Apple</p>
                    </div>
                    <div className="product-details">
                      <h5>Type:</h5>
                      <p>Smart Watch</p>
                    </div>
                    <div className="product-details">
                      <h5>Availablity:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-details">
                      <h5>Color:</h5>
                      <Color />
                    </div>
                    <div className="product-details">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>40mm</p>
                        <p>44mm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>
    </>
  );
}

export default CompareProduct;