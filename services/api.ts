import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export const storeCustomer = async (data: any) => {
  try {
    const response = await api.post('/customers', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      throw {
        data: { message: error.message || 'An error occurred' },
      };
    }
  }
};

export default api; 