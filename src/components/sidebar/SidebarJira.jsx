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
