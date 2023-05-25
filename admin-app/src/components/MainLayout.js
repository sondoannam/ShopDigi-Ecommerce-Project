import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { RxDashboard, RxGithubLogo } from "react-icons/rx";
import {
  AiOutlineShoppingCart,
  AiOutlineUnorderedList,
  AiOutlineBgColors,
  AiOutlinePicLeft,
  AiOutlinePicRight,
} from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineSplitscreen } from "react-icons/md";
import { RiBillLine, RiCouponLine } from "react-icons/ri";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { ImBlog } from "react-icons/im";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-4 mb-0">
            <span className="sm-logo">AD</span>
            <span className="lg-logo">Admin Label</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear();
              window.location.reload();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <RxDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <UserOutlined className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <MdOutlineSplitscreen className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <RiBillLine className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <RxGithubLogo className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <UploadOutlined className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <RxGithubLogo className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <RxGithubLogo className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <RxGithubLogo className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <BsFillClipboardDataFill className="fs-4" />,
              label: "Enquiries",
            },
            {
              key: "signout",
              icon: <FiLogOut className="fs-4" />,
              label: "Sign Out",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-3 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-5" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown className='py-2'">
              <div>
                <img
                  src="https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-9/106987336_2696764870593975_2304060190678231880_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=jNtm-t-IHBIAX-QoNJ_&_nc_ht=scontent-sin6-1.xx&oh=00_AfCyiVxARsUz-bqNb58a6wnS9IzaI2GMf0yl4A8ux-as6A&oe=643E71CB"
                  width={42}
                  height={42}
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">SonDN</h5>
                <p className="mb-0">sonladepzaizx@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to=""
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to=""
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
