import axios from "axios";
import { config } from '../../utilities/axios_config';
import { base_url } from '../../utilities/base_url';

const postQuery = async (contactData) => {
  const response = await axios.post(`${base_url}enquiry/`, contactData);

  return response.data;
};

const contactService = {
  postQuery,
};

export default contactService;