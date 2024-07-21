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


