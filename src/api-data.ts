import axios from "axios";

export const processData = async (data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/processData",
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error sending data to the backend: ${error}`);
  }
};
