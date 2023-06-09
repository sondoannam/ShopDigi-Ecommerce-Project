import axios from "axios";
import { base_url } from "../../utilities/base_url";
import { config } from "../../utilities/axios_config";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`, config);

  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, config);

  return response.data;
};

const updateColor = async (color) => {
  const response = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.colorData.title, code: color.colorData.code },
    config
  );

  return response.data;
};
const getColor = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`, config);

  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);

  return response.data;
};

const colorService = {
  getColors,
  createColor,
  updateColor,
  getColor,
  deleteColor,
};

export default colorService;
