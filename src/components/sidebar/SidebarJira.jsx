import React, { useState } from "react";
import {
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;

export default function SidebarJira() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    // <div className="sideBar">
    //   <div className="sideBar-top">
    //     <div className="sideBar-icon">
    //       <i className="fab fa-jira" />
    //     </div>
    //     <div
    //       className="sideBar-icon"
    //       data-toggle="modal"
    //       data-target="#searchModal"
    //       style={{ cursor: "pointer" }}
    //     >
    //       <i className="fa fa-search" />
    //       <span className="title">Search</span>
    //     </div>
    //     <div className="sideBar-icon">
    //       <i className="fa fa-plus" />
    //       <span className="title">Create Task</span>
    //     </div>
    //   </div>
    //   <div className="sideBar-bottom">
    //     <div className="sideBar-icon">
    //       <i className="fa fa-question-circle" />
    //       <span className="title">ABOUT</span>
    //     </div>
    //   </div>
    // </div>
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ fontSize: 20, marginTop: 24 }}
          items={[
            {
              key: "1",
              icon: <SearchOutlined style={{ fontSize: 20 }}/>,
              label: "Search",
            },
            {
              key: "2",
              icon: <PlusOutlined style={{ fontSize: 20 }}/>,
              label: "Create task",
            },
          ]}
        />
      </Sider>
    </Layout>
  );
}
