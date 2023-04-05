import axios from "axios";
import { axiosRequest } from "../configs/axios.config";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants";

export const loginApi = (information) => {
  return axiosRequest({
    url: `/Users/signin`,
    method: "POST",
    data: information,
  });
};

export const registerApi = (information) => {
  return axiosRequest({
    url: `/Users/signup`,
    method: "POST",
    data: information,
  });
};

export const fetchUserListApi = () => {
  return axiosRequest({
    url: `/Users/getUser`,
    method: "GET",
  });
};

export const getUserByIdApi = (userId) => {
  return axiosRequest({
    url: `/Users/getUser?keyword=${userId}`,
    method: "GET",
  });
};

export const editUserApi = (userId) => {
  return axiosRequest({
    url: `/Users/editUser?keyword=${userId}`,
    method: "PUT",
  });
};

export const deleteUserApi = (userId) => {
  return axiosRequest({
    url: `/Users/deleteUser?id=${userId}`,
    method: "DELETE",
  });
};