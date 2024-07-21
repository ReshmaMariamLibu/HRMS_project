import axios from 'axios';

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