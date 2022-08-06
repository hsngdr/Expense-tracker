import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import showError from "../utils/showError";

function SignUp() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  let navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await api().post("/users/register", values);
      navigate("/login", { state: { newSignUp: true } });
    } catch (err) {
      showError((err as any).response.data.errorMessage);
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <h2>Register</h2>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!", min: 6 },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="full_name" label="Full Name">
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUp;
