import React from "react";

const CustomInput = (props) => {
    const { type, label, id, className, name, onChange, onBlur, value } = props;
  return (
    <>
      <div className="form-floating mt-3">
        <input
          type={type}
          className={`form-control ${className}`}
          id={id}
          placeholder={label}
          name = {name}
          onChange = {onChange}
          onBlur = {onBlur}
          value = {value}
        />
        <label htmlFor={label}>{label}</label>
      </div>
    </>
  );
};

export default CustomInput;
