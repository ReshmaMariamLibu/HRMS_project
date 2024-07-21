import axios from 'axios';

export const getEmployees = async () => {
    const url = `${import.meta.env.VITE_HRMS_URL}/employee`
    return axios.get(url)
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        throw error;
    });
};
  
export const postEmployee = async (employeeData, successCb, errorCb) => {
    const url = `${import.meta.env.VITE_HRMS_URL}/add_employees`;
  
    return axios.post(url, employeeData).then(
        (response) => {
        if (successCb) successCb(response.data);    
        console.log("RESPonse", response);
        return response.data;
      },
      (error) => {
        errorCb(error);
        return error;
      }
      
  )};



export const updateEmployeeDetails = async (data) => {
    const url = `${import.meta.env.VITE_HRMS_URL}/updateemployee/${data.id}`;
    console.log(data,"update  employee data");
    return axios.put(url,data)
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        throw error;
    });
};

export const getEmployeeDetails = async (employeeId) => {
  const url = `${import.meta.env.VITE_HRMS_URL}/employee/${employeeId}`
  return axios.get(url).then(
    (res) => {
      return res.data;
  })
  .catch((error) => {   
      throw error;
  });
};






  