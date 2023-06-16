import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from "../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
  code: yup.string().required("Color code is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
    colorCode
  } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfullly!");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor, updatedColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
      code: colorCode || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getColorId !== undefined ? "Edit" : "Add"} Color{" "}
      </h3>{" "}
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Color"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="text"
            label="Enter Color Code"
            onChange={formik.handleChange("code")}
            onBlur={formik.handleBlur("code")}
            value={formik.values.code}
            id="color"
          />
          <div className="error">
            {formik.touched.code && formik.errors.code}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
