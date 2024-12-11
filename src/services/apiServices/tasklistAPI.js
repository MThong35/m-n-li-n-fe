import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/Assign`;

const taskService = {
  GetListTask: async () => {
    try {
      const url = `${baseURL}/list-assign`;

      const config = {
        headers: {
          //   Authorization: `bearer ${acc.token}`
        },
        timeout: 1000, // You can adjust the timeout based on your needs
      };

      const response = await axios.get(url, config); // No data needed in GET requests
      const responseData = response.data;
      console.log(response);
      return responseData;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data);
      } else {
        console.log("An error occurred:", err.message);
      }
    }
  },

  GetTaskByID: async (assignID) => {
    try {
      const url = `${baseURL}/${assignID}`;

      const config = {
        headers: {
          //   Authorization: `bearer ${acc.token}`
        },
        timeout: 1000, // You can adjust the timeout based on your needs
      };

      const response = await axios.get(url, config); // No data needed in GET requests
      const responseData = response.data;
      console.log(response);
      return responseData;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data);
      } else {
        console.log("An error occurred:", err.message);
      }
    }
  },

  deleteTask: async (assignID) => {
    try {
      const url = `${baseURL}/${assignID}`;
      console.log(url);
      const config = {
        headers: {
          //   Authorization: `bearer ${acc.token}`
        },
        timeout: 1000, // You can adjust the timeout based on your needs
      };
      const response = await axios.delete(url, assignID);
      const responseData = response.data;
      console.log(response);
      return responseData;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data);
      } else {
        console.log("An error occurred:", err.message);
      }
    }
  },

  addTask: async (task) => {
    try {
      const url = `${baseURL}/add-task`;
      const config = {
        headers: {
          //   Authorization: `bearer ${acc.token}`
        },
        timeout: 1000, // You can adjust the timeout based on your needs
      };
      const response = await axios.post(url, task, config);
      const responseData = response.data;
      console.log(response);
      return responseData;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data);
      } else {
        console.log("An error occurred:", err.message);
      }
    }
  },

  addAssign: async (assign) => {
    try {
      const url = `${baseURL}/update-assign`;
      const config = {
        headers: {
          //   Authorization: `bearer ${acc.token}`
        },
        timeout: 1000, // You can adjust the timeout based on your needs
      };
      // print request data
      console.log("Request data:", assign);

      const response = await axios.put(url, assign, config);
      const responseData = response.data;
      console.log(response);
      return responseData;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data);
      } else {
        console.log("An error occurred:", err.message);
      }
    }
  },

  updateTask: async (task) => {
    try {
      const url = `${baseURL}/update-task`;
      const config = {
        headers: {
          //   Authorization: `bearer ${acc.token}`
        },
        timeout: 1000, // You can adjust the timeout based on your needs
      };
      // print request data
      console.log("Request data:", task);

      const response = await axios.put(url, task, config);
      const responseData = response.data;
      console.log("Response data:", response);
      return responseData;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data);
      } else {
        console.log("An error occurred:", err.message);
      }
    }
  },
};

export default taskService;
