import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/Releasing`;

const releasingService = {
  GetListReleasing: async () => {
    const response = await axios.get(baseURL);
    return response.data;
  },
  GetReleasingById: async (id) => {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  },
  AddReleasing: async (releasing) => {
    const response = await axios.post(baseURL, releasing);
    return response.data;
  },
  DeleteReleasing: async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  },
  UpdateReleasing: async (ComicReleasingDTO) => {
    const response = await axios.put(`${baseURL}/update`, ComicReleasingDTO);
    console.log(response.data);
    return response.data;
  },
};

export default releasingService;