// src/services/accountService.js
import axios from "axios";

const baseURL = "https://localhost:1234/api/Account";

const accountService = {
  login: async (acc) => {
    console.log(acc);
    console.log(`${baseURL}/login`);

    const response = await axios.post(`${baseURL}/login`, acc);
    console.log(response.data);
    return response.data;
  },
  register: async (acc) => {
    console.log(acc);
    console.log(`${baseURL}/register`);
    const response = await axios.post(`${baseURL}/register`, acc);
    console.log(response.data);
    return response.data;
  },
};

export default accountService;
