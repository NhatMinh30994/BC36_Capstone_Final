import React from "react";
import { Button, Input, Layout, notification } from "antd";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Link, useNavigate } from "react-router-dom";
import {
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { registerApi } from "../../services/user";
import { useDispatch } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await registerApi(state);
      console.log(result);

      dispatch(setUserInfoAction(result.data.content));

      notification.success({
        message: "Đăng ký thành công",
      });
      navigate("/login");
    } catch (error) {
      notification.error({
        message: "Email hoặc mật khẩu không chính xác",
      });
    }
  };

  const sider = {
    height: window.innerHeight,
    backgroundImage: "url(https://picsum.photos/800)",
  };
  const formLayout = {
    height: window.innerHeight,
  };

  return (
    <>
      <Layout>
        <Sider style={sider} width={window.innerWidth / 2}></Sider>
        <Content>
          <form
            onSubmit={handleSubmit}
            name="signin"
            className="form w-50 mx-auto d-flex flex-column justify-content-center"
          >
            <div
              style={formLayout}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <h3>Register</h3>
              <div className="mt-3">
                <Input
                  style={{ minWidth: 300 }}
                  size="large"
                  placeholder="Email"
                  prefix={<MailOutlined />}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-3">
                <Input.Password
                  style={{ minWidth: 300 }}
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  name="passWord"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-3">
                <Input
                  style={{ minWidth: 300 }}
                  size="large"
                  placeholder="Name"
                  prefix={<IdcardOutlined />}
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-3">
                <Input
                  style={{ minWidth: 300 }}
                  size="large"
                  placeholder="Phone Number"
                  prefix={<PhoneOutlined />}
                  name="phoneNumber"
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                style={{ minWidth: 300 }}
                type="primary"
                size="large"
                className="mt-3"
                htmlType="submit"
              >
                Register
              </Button>
              <Link
                className="d-flex justify-content-center mt-2 font-weight-bold"
                style={{ fontSize: 16 }}
                to="/login"
              >
                Login now!
              </Link>
            </div>
          </form>
        </Content>
      </Layout>
    </>
  );
}
