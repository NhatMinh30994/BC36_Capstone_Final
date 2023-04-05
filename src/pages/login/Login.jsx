import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Layout, Button, Form, Input, notification } from "antd";
import {
  FacebookFilled,
  LockOutlined,
  MailOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { loginApi } from "../../services/user";
import { Link, useNavigate } from "react-router-dom";
import { setUserInfoAction } from "../../store/actions/userAction";
const { Sider, Content } = Layout;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    passWord: "",
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
      const result = await loginApi(state);
      console.log(result);

      localStorage.setItem("USER_INFO_KEY", JSON.stringify(result.data.content));

      dispatch(setUserInfoAction(result.data.content));
      
      notification.success({
        message: "Đăng nhập thành công",
      });
      navigate("/");
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
          <form onSubmit={handleSubmit}>
            <div
              style={formLayout}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <h3>Login Jira</h3>
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
                <Input
                  style={{ minWidth: 300 }}
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  name="passWord"
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
                Login
              </Button>
              <Link className="d-flex justify-content-center mt-2 font-weight-bold" style={{ fontSize: 16 }} to="/register">Register now!</Link>
            </div>
          </form>
        </Content>
      </Layout>
    </>
  );
}
