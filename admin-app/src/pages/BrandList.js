import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, resetState, deleteABrand } from "../features/brand/brandSlice";
import { Link } from 'react-router-dom';
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const brandData = [];
  for (let i = 0; i < brandState.length; i++) {
    brandData.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <div className="">
          <Link className="fs-3 text-primary" to={`/admin/brand/${brandState[i]._id}`}>
            <BiEdit />
          </Link>

          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(brandState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={brandData} />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default BrandList;
