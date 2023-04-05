import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByIdApi } from "../../services/user";
import { useForm } from "antd/es/form/Form";

export default function EditUser() {
  const [form] = useForm();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getUserById();
  }, [params.userId]);

  const getUserById = async () => {
    const result = await getUserByIdApi(params.userId);
    console.log(result);
    form.setFieldsValue({
      id: result.data.content.userId,
      name: result.data.content.name,
      email: result.data.content.email,
      passWord: result.data.content.passWord,
      phoneNumber: result.data.content.phoneNumber,
    });
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <div className="container mt-4">
      <h3>Edit User</h3>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Id" name="userId">
          <Input />
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="passWord">
          <Input />
        </Form.Item>
        <Form.Item label="Phone number" name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item className="mt-3">
          <Button htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
