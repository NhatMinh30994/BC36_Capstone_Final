import React, { useEffect } from "react";
import {
  AutoComplete,
  Avatar,
  Button,
  notification,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useProjectList from "../../hooks/useProjectList";
import ReactHtmlParser from "html-react-parser";
import { deleteProjectApi } from "../../services/project";
import { useNavigate } from "react-router-dom";

export default function ProjectManagement() {
  const navigate = useNavigate();
  const projectList = useProjectList();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  // const clearFilters = () => {
  //   setFilteredInfo({});
  // };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setIdSort = () => {
    setSortedInfo({
      order: "ascend",
      columnKey: "id",
    });
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => item2.id - item1.id,
      sortDirections: ["descend"],

      onFilter: (value, record) => record.id.includes(value),
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      onFilter: (value, record) => record.projectName.includes(value),
      sortOrder:
        sortedInfo.columnKey === "projectName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    // {
    //   title: "description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = ReactHtmlParser(text);
    //     return <div key={index}>
    //       {jsxContent}
    //     </div>
    //   }
    // },
    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
      onFilter: (value, record) => record.categoryName.includes(value),
      sortOrder:
        sortedInfo.columnKey === "categoryName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "creator",
      // dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="cyan">{text.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      onFilter: (value, record) => record.creator.includes(value),
      sortOrder: sortedInfo.columnKey === "creator" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "member",
      dataIndex: "",
      render: (text) => {
        return (
          <div>
            {text.members?.slice(0, 3).map((member, idx) => {
              return <Avatar key={idx} src={member.avatar} />;
            })}
            {text.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="rightTop"
              title={"Add user"}
              content={() => {
                return <AutoComplete style={{ width: "100%" }} />;
              }}
              trigger="click"
            >
              <Button
                style={{
                  width: "30px",
                  height: "30px",
                  padding: 0,
                  borderRadius: "50%",
                }}
              >
                +
              </Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text) => {
        // console.log(text);
        return (
          <div style={{ display: "flex" }}>
            <EditOutlined
              style={{ color: "blue", fontSize: 20, marginRight: 3 }} onClick={() => navigate(`/edit-project/${text.id}`)}
            />
            <DeleteOutlined
              style={{ color: "red", fontSize: 20, marginRight: 3 }}
              onClick={async () => {
                try {
                  if (window.confirm("Bạn xác nhận muốn xóa")) {
                    await deleteProjectApi(text.id);
                    notification.success({
                      message: "Xóa dự án thành công",
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
      <h3>Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setIdSort}>Sort id</Button>
        <Button onClick={clearAll}>Clear sorters</Button>
      </Space>
      <Table
        pagination={{ showSizeChanger: false, pageSize: 8 }}
        rowKey={"id"}
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
