import axios from 'axios';

export const getDesignations = async () => {
    const url = `${import.meta.env.VITE_HRMS_URL}/designations`
    return axios.get(url)
    .then((res) => {
      console.log(res.data);
        return res.data;
    })
    .catch((error) => {
        throw error;
    });
};
  
export const postDesignation = async (designationData, successCb, errorCb) => {
    const url = `${import.meta.env.VITE_HRMS_URL}/add_designation`;
  
    return axios.post(url, designationData)
      .then((response) => {
        if (successCb) successCb(response.data);
        return response.data;
      })
      .catch((error) => {
        if (errorCb) errorCb(error);
        throw error;
      });
  };


  export const updateDesignationDetails= async (data) => {
    const url = `${import.meta.env.VITE_HRMS_URL}/updatedesignations/${data.id}`;
    return axios.put(url,data)
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        throw error;
    });
};
  