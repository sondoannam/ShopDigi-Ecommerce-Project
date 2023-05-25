import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, resetState, deleteABlog } from "../features/blog/blogSlice";
import { Link } from 'react-router-dom';
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);
  const blogData = [];

  for (let i = 0; i < blogState.length; i++) {
    blogData.push({
      key: i + 1,
      name: blogState[i].title,
      category: blogState[i].category,
      action: (
        <div className="">
          <Link className="fs-3 text-primary" to={`/admin/blog/${blogState[i].id}`}>
            <BiEdit />
          </Link>

          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(blogState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 300);
  };

  return (
    <div>
        <h3 className="mb-4 title">Blog List</h3>
        <div>
            <Table columns={columns} dataSource={blogData} />
        </div>

        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
}

export default BlogList;