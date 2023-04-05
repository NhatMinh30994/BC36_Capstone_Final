import { axiosRequest } from "../configs/axios.config";

export const fetchProjectCategory = () => {
  return axiosRequest({
    url: `/ProjectCategory`,
    method: "GET",
  });
};
