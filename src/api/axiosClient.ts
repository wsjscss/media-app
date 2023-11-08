import axios from "axios";

function sleep(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const client = axios.create({
  baseURL: "http://localhost:3000/api",
});

client.interceptors.response.use(async (response) => {
  await sleep();
  return response;
});

export default client;
