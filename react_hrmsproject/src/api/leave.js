import axios from 'axios';

export const getLeaves = async () => {
    const url = `${import.meta.env.VITE_HRMS_URL}/get_leaves`
    return axios.get(url)
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        throw error;
    });
};
  
export const postLeaves = async (leaveData, successCb, errorCb) => {
    const url = `${import.meta.env.VITE_HRMS_URL}/leaves`;
  
    return axios.put(url, leaveData)
      .then((response) => {
        if (successCb) successCb(response.data);
        return response.data;
      })
      .catch((error) => {
        if (errorCb) errorCb(error);
        throw error;
      });
  };