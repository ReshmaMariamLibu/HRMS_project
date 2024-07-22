import axios from 'axios';

export const login = async (data) => {
  const url = `${import.meta.env.VITE_HRMS_URL}/login`;
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(url, data);
    return response; 
  } catch (error) {
    throw error; 
  }
};


export const register = async ({ username, password }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_HRMS_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};


