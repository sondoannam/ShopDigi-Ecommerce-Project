import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getColors, deleteAColor, resetState } from "../features/color/colorSlice";
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

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <div className="">
          <Link className="fs-3 text-primary" to={`/admin/color/${colorState[i]._id}`}>
            <BiEdit />
          </Link>

          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(colorState[i]._id)}>
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 300);
  };

  return (
    <div>
        <h3 className="mb-4 title">Colors</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>

        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
}

export default ColorList;