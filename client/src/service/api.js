import axios from "axios";

export const uploadFile = async (data, rollno) => {
  try {
   let config = {
      headers: {
        "roll": rollno
      }
    };
    let response = await axios.post("/api/v1/auth/upload", data, config);
    console.log("data from backend is ", response);
    return response.data;
  } catch (error) {
    console.log("Erro while calling uplaodd file api ", error.message);
  }
};
