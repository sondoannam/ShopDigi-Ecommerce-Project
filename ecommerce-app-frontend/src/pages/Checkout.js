import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { createAnOrder, getUserCart, removeProductCart } from "../features/user/userSlice";
import PaymentService from "../features/payment/paymentServices";
import { PayPalButtons } from "@paypal/react-paypal-js";

let shippingSchema = yup.object().shape({
  firstname: yup.string().required("Field is required"),
  lastname: yup.string().required("Field is required"),
  address: yup.string().required("Field is required"),
  mobile: yup.string().required("Field is required"),
  province: yup.string().required("You have to select field"),
  district: yup.string().required("You have to select field"),
  ward: yup.string().required("You have to select field"),
  pincode: yup.number().required("Field is required"),
  //paymentMethod: yup.string().required("You have to select field"),
});

const host = "https://provinces.open-api.vn/api/";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [payment, setPayment] = useState("later_money");
  const [itemSelected, setItemSelected] = useState([]);
  const [sdkReady , setSdkReady] = useState(false);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const userCartState = useSelector((state) => state?.auth?.cartProducts);

  // Fetch product cart
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const itemCartSelected = userCartState.filter(
    ({ checked }) => checked === "Checked"
  );

  useEffect(() => {
    let sum = 0;
    let items = [];


    for (let index = 0; index < itemCartSelected?.length; index++) {
      sum += Number(itemCartSelected[index]?.quantity) * itemCartSelected[index]?.price;
  
      items.push({
        product: itemCartSelected[index].productId._id,
        color: itemCartSelected[index].color._id,
        quantity: itemCartSelected[index].quantity,
        price: itemCartSelected[index].price,
      });
    }
    setTotalAmount(sum);
    setItemSelected(items);
  }, [userCartState]);

  const handleCreateOrder = (shippingData) => {
    dispatch(createAnOrder({
      orderItems: itemSelected,
      totalPrice: totalAmount + 5,
      totalPriceAfterDiscount: totalAmount + 5,
      shippingInfo: shippingData,
      paymentMethod: payment,
    }));
  };

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    }
    document.body.appendChild(script);
  }

  useEffect(() => {
    if(!window.paypal) {
      addPaypalScript();
    }else {
      setSdkReady(true);
    }
  }, []);

  const onApprovePaypal = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(createAnOrder({
        orderItems: itemSelected,
        totalPrice: totalAmount + 5,
        totalPriceAfterDiscount: totalAmount + 5,
        shippingInfo: {
          firstname: document.getElementById('firstname').value,
          lastname: document.getElementById('lastname').value,
          address: document.getElementById('address').value,
          mobile: document.getElementById('mobile').value,
          province: province,
          district: district,
          ward: ward,
          pincode: document.getElementById('zipcode').value,
        },
        paymentMethod: payment,
        paidAt: details.update_time,
      }));
    });
  }

  const renderData = (array, select) => {
    let row = `<option disable value=''>Select ${select}</option>`;
    array.forEach((element) => {
      row += `<option value="${element.code}">${element.name}</option>`;
    });
    document.querySelector("#" + select).innerHTML = row;
  };

  useEffect(() => {
    if(provinceCode !== '') {
      axios.get(host + "p/" + provinceCode + "?depth=1").then((res) => setProvince(res.data.name));
      setDistrict(null);
      setWard(null);
    }
  }, [provinceCode]);

  useEffect(() => {
    if(districtCode !== '') {
      axios.get(host + "d/" + districtCode + "?depth=1").then((res) => setDistrict(res.data.name));
      setWard(null);
    }
  }, [districtCode]);

  useEffect(() => {
    if(wardCode !== '') {
      axios.get(host + "w/" + wardCode + "?depth=1").then((res) => setWard(res.data.name));
    }
  }, [wardCode]);

  useEffect(() => {
    // Call API to fetch Data
    // Fetch provinces
    const getProvince = async (api) => {
      const data = await axios.get(api).then((res) => res.data);
      renderData(data, "province");
    };

    // get Provinces
    getProvince(host + "?depth=1");
  }, []);

  useEffect(() => {
    // Fetch dictricts
    const getDistrict = async (api) => {
      const data = await axios.get(api).then((res) => res.data.districts);
      renderData(data, "district");
    };

    if (provinceCode !== "") {
      getDistrict(host + "p/" + provinceCode + "?depth=2");
    }
  }, [provinceCode]);

  useEffect(() => {
    // Fetch wards
    const getWard = async (api) => {
      const data = await axios.get(api).then((res) => res.data.wards);
      renderData(data, "ward");
    };

    if (districtCode !== "") {
      getWard(host + "d/" + districtCode + "?depth=2");
    }
  }, [districtCode]);

  console.log(provinceCode+'-'+districtCode+'-'+wardCode);
  console.log(province+'-'+district+'-'+ward);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      mobile: "",
      province: "",
      district: "",
      ward: "",
      pincode: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      values.province = province;
      values.district = district;
      values.ward = ward;
      console.log(values);
      handleCreateOrder(values);
    },
  });

  return (
    <>
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">ShopDigi</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" href="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item active" aria-current="page">
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">sonladepzaizx@gmail.com</p>
              <h4 className="mb-3 border-bottom">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex flex-wrap justify-content-between gap-15"
              >
                <div className="w-100">
                  <select
                    name="province"
                    id="province"
                    onChange={(e) => {
                      formik.handleChange("province")(e);
                      setProvinceCode(e.target.value);
                      setDistrictCode('');
                      setWardCode('');
                    }}
                    onBlur={formik.handleBlur("province")}
                    className="form-control form-select"
                  >
                    <option value="" className="form-control">
                      Select province
                    </option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.province && formik.errors.province}
                  </div>
                </div>
                <div className="w-100">
                  <select
                    name="district"
                    id="district"
                    onChange={(e) => {
                      formik.handleChange("district")(e);
                      setDistrictCode(e.target.value);
                      setWardCode('');
                    }}
                    onBlur={formik.handleBlur("district")}
                    className="form-control form-select"
                  >
                    <option value="" className="form-control">
                      Select district
                    </option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.district && formik.errors.district}
                  </div>
                </div>
                <div className="w-100">
                  <select
                    name="ward"
                    id="ward"
                    onChange={(e) => {
                      formik.handleChange("ward")(e);
                      setWardCode(e.target.value);
                    }}
                    onBlur={formik.handleBlur("ward")}
                    className="form-control form-select"
                  >
                    <option value="" className="form-control">
                      Select Ward
                    </option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.ward && formik.errors.ward}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    id="firstname"
                    type="text"
                    className="form-control"
                    placeholder="Firstname"
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    value={formik.values.firstname}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    id="lastname"
                    type="text"
                    className="form-control"
                    placeholder="Lastname"
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    value={formik.values.lastname}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    value={formik.values.address}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    id="mobile"
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    value={formik.values.mobile}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    id="zipcode"
                    type="text"
                    className="form-control"
                    placeholder="Zipcode"
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                    value={formik.values.pincode}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>

                <div className="w-100 mt-2">
                  <h4 className="border-bottom mb-3">Choose Payment Method</h4>
                  {/* <div class="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="later_money"
                      id="flexCheckDefault"
                      onChange={(e) => setPayment(e.target.value)}
                      checked={payment === 'later_money'}
                    />
                    <label class="form-check-label">
                      Cash On Delivery
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="paypal"
                      id="flexCheckChecked"
                      onChange={(e) => setPayment(e.target.value)}
                      checked={payment === 'paypal'}
                    />
                    <label class="form-check-label">
                      Pay with Paypal
                    </label>
                  </div> */}
                  <div className="form-checkbox align-items-center border-bottom">
                    <label
                      htmlFor="checkbox1"
                      className="checkbox-item d-block mb-2"
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox1"
                        value="later_money"
                        onChange={(e) => setPayment(e.target.value)}
                        checked={payment === "later_money"}
                      />
                      Cash On Delivery
                    </label>
                    <label
                      htmlFor="checkbox2"
                      className="checkbox-item d-block mb-3"
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox2"
                        value="paypal"
                        onChange={(e) => setPayment(e.target.value)}
                        checked={payment === "paypal"}
                      />
                      Pay with Paypal
                    </label>
                  </div>
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <IoIosArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/product" className="button">
                      Continue to Shopping
                    </Link>
                    {payment === 'paypal' && sdkReady ? (
                      <div className="paypal-button-container">
                        <PayPalButtons 
                          type="submit"
                          style={{
                            color: "gold",
                            layout: "horizontal",
                            height: 45,
                            tagline: false,
                            shape: "pill",
                          }}
                          
                          createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: totalAmount + 5,
                                            currency_code: "USD"
                                        },
                                    },
                                ],
                            });
                          }}
                          onApprove={onApprovePaypal}
                          onError={(error) => alert(error)}
                        />
                      </div>
                    ) : (
                      <button type="submit" className="button border-0">
                      Place Order
                      </button>
                    )}
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {itemCartSelected &&
                itemCartSelected?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            src={item?.productId?.images[0].url}
                            //className="img-fluid"
                            width={80}
                            height={80}
                            alt=""
                          />
                        </div>
                        <div>
                          <h5 className="title total-price">
                            {item?.productId?.title}
                          </h5>
                          <p className="title total-price">
                            s / {item?.color?.code}
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          $ {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  $ {totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 5</p>
              </div>
              <div className="d-flex justify-content-between align-items-center py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">
                  $ {totalAmount ? totalAmount + 5 : "0"}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
