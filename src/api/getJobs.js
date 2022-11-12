import axios from "axios";

const getJobs = async () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const response = await axios.get(`${baseUrl}/jobs`);
  if (response === undefined) return undefined;
  return response.data;
};

export default getJobs;
