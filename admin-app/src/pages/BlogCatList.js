import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories, deleteABlogCat, resetState } from "../features/bcategory/bCategorySlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
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


const BlogCatList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const bCategoryState = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < bCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCategoryState[i].title,
      action: (
        <div className="">
          <Link
            to={`/admin/blog-category/${bCategoryState[i]._id}`}
            className="fs-3 text-primary">
            <BiEdit />
          </Link>

          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(bCategoryState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 300);
  };

  return (
    <div>
        <h3 className="mb-4 title">Blog Categories</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>

        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCategory(blogCatId);
        }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  );
}

export default BlogCatList;