import React from 'react';
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">We'll send you an email to reset your password</p>
        <form action="">
          <CustomInput type="text" label='Enter Your Email Address' id="email" />
          <button
            type="submit"
            className="border-0 px-3 py-2 text-white fw-blod w-100"
            style={{ background: "#ffd333" }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;