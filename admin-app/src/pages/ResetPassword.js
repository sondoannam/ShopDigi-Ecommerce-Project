import React from 'react';
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Reset Password</h3>
        <p className="text-center">Enter your old password to make changes</p>
        <form action="">
          <CustomInput type="password" label='Current Password' id="password" />
          <CustomInput type="password" label='New Password' id="newpass" />
          <CustomInput type="password" label='Comfirm Password' id="confirmpass" />
          <button
            type="submit"
            className="border-0 px-3 py-2 text-white fw-blod w-100"
            style={{ background: "#ffd333" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;