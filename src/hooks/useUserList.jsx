import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../contexts/loading/LoadingContext";
import { fetchUserListApi } from "../services/user";

export default function useUserList() {
  const [userList, setUserList] = useState();
  const [_, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    setLoadingState({ isLoading: true });

    const result = await fetchUserListApi();
    setUserList(result.data.content);

    setLoadingState({ isLoading: false });
  };

  return userList;
}
