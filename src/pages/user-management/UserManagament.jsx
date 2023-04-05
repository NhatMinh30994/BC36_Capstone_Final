import React from "react";
import { Button, Space, Table, notification } from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useUserList from "../../hooks/useUserList";
import { deleteUserApi } from "../../services/user";
import { useNavigate } from "react-router-dom";

export default function UserManagament() {
  const navigate = useNavigate();
  const userList = useUserList();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const columns = [
    {
      title: "id",
      dataIndex: "userId",
      key: "userId",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      dataIndex: "",
      render: (text) => {
        return (
          <div style={{ display: "flex" }}>
            <EditOutlined
              style={{ color: "blue", fontSize: 20, marginRight: 3 }} onClick={() => navigate(`/edit-user/${text.userId}`)}
            />
            <DeleteOutlined
              style={{ color: "red", fontSize: 20, marginRight: 3 }}
              onClick={async () => {
                try {
                  if (window.confirm("Bạn xác nhận muốn xóa?")) {
                    await deleteUserApi(text.userId);
                    notification.success({
                      message: "Xóa user thành công",
                    });
                  }
                } catch (error) {
                  notification.error({
                    message: error.response.data.content,
                  });
                }
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="container mt-4">
      <h3>User Management</h3>
      <>
        <Space
          style={{
            marginBottom: 16,
          }}
        >
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table
          pagination={{ showSizeChanger: false }}
          rowKey={"userId"}
          columns={columns}
          dataSource={userList}
          onChange={handleChange}
        />
      </>
    </div>
  );
}
