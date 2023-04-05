import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import MenuJira from "../../components/menu/MenuJira";
import SearchModalJira from "../../components/search-modal/SearchModalJira";
import SidebarJira from "../../components/sidebar/SidebarJira";

export default function HomeLayout() {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userState.userInfo) {
      alert("Đăng nhập tiếp tục vào trang");
      navigate("/login");
    }
  }, []);
  return (
    <div className="jira">
      <SidebarJira />
      <MenuJira />
      <Outlet />
      <SearchModalJira />
    </div>
  );
}
