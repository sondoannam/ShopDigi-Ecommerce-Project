import axios from 'axios';
import { base_url } from '../../utilities/base_url';
import { config } from '../../utilities/axios_config';

const getProducts = async () => {
    const response = await axios.get(`${base_url}product/`);

    return response.data;
};

const createProduct = async (product) => {
    const response = await axios.post(`${base_url}product/create`, product, config);
  
    return response.data;
};

const productServices = {
    getProducts,
    createProduct,
};

export default productServices;