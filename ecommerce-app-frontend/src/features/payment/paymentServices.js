import axios from "axios";
import { base_url } from "../../utilities/base_url";

const getConfig = async () => {
  const response = await axios.get(`${base_url}payment/config`);

  if (response.data) {
    return response.data;
  }
};

const paymentService = {
  getConfig,
};

export default paymentService;
