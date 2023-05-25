import React from "react";

const CustomInput = (props) => {
  const { type, label, id, className, name, onChange, onBlur, value, disabled } = props;
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        name={name}
        className={`form-control ${className}`}
        id={id}
        placeholder={label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
      />
    </div>
    
  );
};

export default CustomInput;
