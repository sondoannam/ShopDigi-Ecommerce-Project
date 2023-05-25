import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCatList from './pages/BlogCatList';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ColorList from './pages/ColorList';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import CategoryList from './pages/CategoryList';
import AddBlog from './pages/AddBlog';
import AddBlogCat from './pages/AddBlogCat';
import AddColor from './pages/AddColor';
import AddCategory from './pages/AddCategory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';
import ViewEnquiry from './pages/ViewEnquiry';
import ViewOrder from './pages/ViewOrder';
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='enquiries/:id' element={<ViewEnquiry />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog' element={<AddBlog />} />
          <Route path='blog/:id' element={<AddBlog />} />
          <Route path='blog-category-list' element={<BlogCatList />} />
          <Route path='blog-category' element={<AddBlogCat />} />
          <Route path='blog-category/:id' element={<AddBlogCat />} />
          <Route path='orders' element={<Orders />} />
          <Route path='order/:id' element={<ViewOrder />} />
          <Route path='customers' element={<Customers />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path='color' element={<AddColor />} />
          <Route path='color/:id' element={<AddColor />} />
          <Route path='brand-list' element={<BrandList />} />
          <Route path='brand' element={<AddBrand />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='product' element={<AddProduct />} />
          <Route path='category-list' element={<CategoryList />} />
          <Route path='category' element={<AddCategory />} />
          <Route path='category/:id' element={<AddCategory />} />
          <Route path='Coupon-list' element={<CouponList />} />
          <Route path='coupon' element={<AddCoupon />} />
          <Route path='coupon/:id' element={<AddCoupon />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
