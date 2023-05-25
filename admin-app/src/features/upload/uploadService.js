import axios from "axios";
import { base_url } from "../../utilities/base_url";
import { config } from "../../utilities/axios_config";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, config);
  return response.data;
};
const deleteImg = async (id) => {
  const response = 
    await axios.delete(`${base_url}upload/delete-img/${id}`, config);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
