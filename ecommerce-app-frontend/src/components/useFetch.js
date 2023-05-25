import axios from "axios";

const fetchData = async function (api) {
    try {
        return await axios.get(api).then(res => res.data);
    } catch (error) {
        console.error(error);
    }
}

export default fetchData;