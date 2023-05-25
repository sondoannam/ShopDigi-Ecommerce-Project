import axios from "axios";
import { config } from "../../utilities/axios_config";
import { base_url } from "../../utilities/base_url";

const getProducts = async (data) => {
  const response = await axios.get(`${base_url}product?${data?.tag?`tags=${data?.tag}&&`:''}${data?.brand?`brand=${data?.brand}&&`:''}${data?.category?`category=${data?.category}&&`:''}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:''}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:''}${data?.sort?`sort=${data?.sort}&&`:''}`);

  if (response.data) {
    return response.data;
  }
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);

  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (prodId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { prodId },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};

const productService = {
  getProducts,
  getProduct,
  addToWishlist,
  rateProduct,
};

export default productService;
