import axios from 'axios';

// export const login = async (data, successCb) => {
//   const url = `${import.meta.env.VITE_HRMS_URL}/login`;

//   return axios.post(url, data)
//     .then((response) => {
//       successCb();
//       console.log(response,"ihhyyu");
//       return response.data;
//     })
//     .catch((error) => {
//       console.log(error,"error");
//       throw error;
//     });
// };


export const login = async (data) => {
  const url = `${import.meta.env.VITE_HRMS_URL}/login`;
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(url, data);
    return response; // Ensure the response object is returned
  } catch (error) {
    throw error; // Rethrow the error to be caught in the thunk
  }
};


