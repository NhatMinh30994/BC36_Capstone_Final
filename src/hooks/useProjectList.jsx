import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../contexts/loading/LoadingContext";
import { fetchProjectListApi } from "../services/project";

export default function useProjectList() {
  const [projectList, setProjectList] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = async () => {
    setLoadingState({ isLoading: true });

    const result = await fetchProjectListApi();
    setProjectList(result.data.content);

    setLoadingState({ isLoading: false });
  };

  return projectList;
}
