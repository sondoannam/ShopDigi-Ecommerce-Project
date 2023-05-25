import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = Yup.object().shape({
  email: Yup.string()
    .email("You have to enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);
  const { user, isLoading, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form onSubmit={formik.handleSubmit} action="">
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
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
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="border-0 px-3 py-2 text-white fw-blod w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
