import React, { useEffect, useState } from 'react'; 
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getMonthlyData, getYearlyData } from '../features/auth/authSlice';
const columns = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product Count',
    dataIndex: 'product',
  },
  {
    title: 'Total Price',
    dataIndex: 'price',
  },
  {
    title: 'After Discount',
    dataIndex: 'dprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getAllOrders());
  }, []);
  
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const ordersState = useSelector((state) => state?.auth?.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    let monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let data = [];
    for (let i = 0; i < monthlyDataState?.length; i++) {
      data.push({type: monthNames[monthlyDataState[i]?._id?.month], income: monthlyDataState[i]?.amount});
    }
    // for (let element of monthlyDataState) {
    //   data.push({type: monthNames[element?._id?.month], income: element?.amount});
    // }
    setDataMonthly(data);

    const ordersData = [];
    for (let i = 0; i < ordersState?.length; i++) {
      ordersData.push({
        key: i,
        name: ordersState[i]?.user.firstname + ordersState[i]?.user.lastname,
        product: ordersState[i]?.orderItems?.map((item) => {
          return item?.product?.title + ', ';
        }),
        price: ordersState[i]?.totalPrice,
        dprice: ordersState[i]?.totalPriceAfterDiscount,
        status: ordersState[i]?.orderStatus,
      });
    }
    setOrderList(ordersData);
  }, [monthlyDataState, yearlyDataState]);

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {
        return '#ffd333';
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className='mb-0 desc'>Total Income</p>
            <h4 className='mb-0 sub-title'>${yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <p className='mb-0 desc'>Yearly Total Income</p>
          </div>
        </div>
        <div className="d-flex p-3 flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className='mb-0 desc'>Total Sales</p>
            <h4 className='mb-0 sub-title'>{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className='d-flex flex-column align-items-end '>
            <p className='mb-0 desc'>Sales in last year from Today</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className='mb-5 title'>Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderList} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;