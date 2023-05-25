import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetPass } from "../features/user/userSlice";

let schema = yup.object().shape({
  password: yup.string().required("Password is Required"),
  confirmPassword: yup
    .string()
    .required("Pleased Confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];

  console.log(getToken);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(resetPass({ token: getToken, password: values.password }));
      navigate("/login");
    },
  });
  return (
    <>
      <Meta title={"Reset password"} />
      <BreadCrumb title="Reset password" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset your password</h3>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  className="mt-1"
                  type="password"
                  name="password"
                  label="Password"
                  id="password"
                  onChange={formik.handleChange("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <CustomInput
                  className="mt-1"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  onChange={formik.handleChange("confirmPassword")}
                  value={formik.values.confirmPassword}
                />
                <div className="error">
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Confirm</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
