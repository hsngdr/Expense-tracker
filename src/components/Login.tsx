import { Button, Form, Input, Result } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IState } from "../store";
import { login } from "../store/actions/userActions";
import { LoginForm } from "../types/user";
import showError from "../utils/showError";
import showSuccess from "../utils/showSuccess";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { newSignUp: boolean };
  const dispatch = useDispatch<any>();
  const { data, error } = useSelector((state: IState) => state.user);

  const onFinish = async (values: LoginForm) => {
    dispatch(login(values));
  };
  useEffect(() => {
    error && showError(error);
  }, [error]);

  useEffect(() => {
    data.username && showSuccess("Login successful");
  }, [data.username]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [data]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h2>Login</h2>
      {state && state.newSignUp && (
        <Result
          status="success"
          title="You have successfully registered!"
          subTitle="Please Login."
        />
      )}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
