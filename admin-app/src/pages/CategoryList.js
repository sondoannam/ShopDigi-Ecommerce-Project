import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
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

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const pCategoryState = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: pCategoryState[i].title,
      action: (
        <div className="">
          <Link className="fs-3 text-primary" to={`/admin/category/${pCategoryState[i]._id}`}>
            <BiEdit />
          </Link>

          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(pCategoryState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Categorys</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(pCatId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default CategoryList;
