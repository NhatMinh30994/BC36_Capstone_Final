import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
const { Option } = Select;

export default function DrawerJira() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    dispatch({
      type: "OPEN_DRAWER",
    });
  };
  const onClose = () => {
    dispatch({
      type: "CLOSE_DRAWER",
    });
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        // extra
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </div>
        }
      ></Drawer>
    </>
  );
}
