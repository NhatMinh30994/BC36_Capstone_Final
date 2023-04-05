import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DrawerJira from "../../pages/drawer/DrawerJira";

export default function MenuJira() {
  const navigate = useNavigate();
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/logo.PNG")} alt="" />
        </div>
        {/* <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div> */}
      </div>
      <div className="control">
        {/* <DrawerJira/> */}
        <div>
          <i className="fa fa-credit-card" />
          <a>Kanban Board</a>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink to="/">Project Management</NavLink>
          {/* <span onClick={() => navigate("/")}>Cyber Board</span> */}
        </div>
        <div>
          <i className="fa-solid fa-pen"></i>
          <NavLink to="/create-project">Create project</NavLink>
        </div>
        <div>
          <i className="fa-solid fa-users"></i>
          <NavLink to="/user-management">User Management</NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
