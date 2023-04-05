import { axiosRequest } from "../configs/axios.config";

export const fetchProjectListApi = () => {
  return axiosRequest({
    url: `/Project/getAllProject`,
    method: "GET",
  });
};

export const createProjectAuthorize = (data) => {
  return axiosRequest({
    url: `/Project/createProjectAuthorize`,
    method: "POST",
    data: data,
  });
};

export const getProjectDetailApi = (projectId) => {
  return axiosRequest({
    url: `/Project/getProjectDetail?id=${projectId}`,
    method: "GET",
  });
};

export const editProjectAuthorize = (projectId) => {
  return axiosRequest({
    url: `/Project/updateProject?projectId=${projectId}`,
    method: "PUT",
  });
};

export const deleteProjectApi = (id) => {
  return axiosRequest({
    url: `/Project/deleteProject?projectId=${id}`,
    method: "DELETE",
  });
};