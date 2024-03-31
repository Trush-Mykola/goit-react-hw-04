import axios from "axios";

const ACCESS_KEY = `bU3XO3mLuz8VPuig0AbLVqYXlHqm709HfiOzqEvJyAE`;

const instance = axios.create({
  baseURL: "https://api.unsplash.com",
});

export const fetchPhotos = async (page, query = "") => {
  const url = `/search/photos`;
  const response = await instance.get(url, {
    params: {
      query: query,
      client_id: ACCESS_KEY,
      per_page: 12,
      page: page,
      orientation: "landscape",
    },
  });
  return response.data;
};
