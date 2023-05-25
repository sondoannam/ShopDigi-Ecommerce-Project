import axios from "axios";
import { config } from "../../utilities/axios_config";
import { base_url } from "../../utilities/base_url";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);

  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`);

  return response.data;
};

const blogService = {
  getBlogs,
  getBlog,
};

export default blogService;
