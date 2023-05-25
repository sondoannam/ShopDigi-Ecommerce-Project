import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders, updateOrderStatus } from "../features/auth/authSlice";
const columns = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];


const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const orderState = useSelector((state) => state?.auth?.orders);
  const orderData = [];

  for (let i = 0; i < orderState?.length; i++) {
    orderData.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i]?.totalPriceAfterDiscount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <select name='' defaultValue={orderState[i]?.orderStatus} onChange={(e) => handleOrderStatus(orderState[i]?._id, e.target.value)} className='form-control form-select'>
          <option value="Ordered" disabled selected>Ordered</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivering">Delivering</option>
          <option value="Cancel">Cancel</option>
        </select>
      ),
    });
  }

  const handleOrderStatus = (id, value) => {
    dispatch(updateOrderStatus({id: id, status: value}));
    dispatch(getAllOrders());
  }

  return (
    <div>
        <h3 className="mb-4 title">Orders</h3>
        <div>
            <Table columns={columns} dataSource={orderData} />
        </div>
    </div>
  );
}

export default Orders;