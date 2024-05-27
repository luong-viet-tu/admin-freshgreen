import axios from "axios";

export const getProvince = async () => {
  try {
    const { data } = await axios.get(
      "https://provinces.open-api.vn/api/?depth=3"
    );
    return data;
  } catch (error) {
    return false;
  }
};
