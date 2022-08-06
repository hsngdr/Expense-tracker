import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { useSelector } from "react-redux";
import { IState } from "../store";

function Home() {
  const { data } = useSelector((state: IState) => state.user);

  return (
    <div>
      <Result
        icon={<SmileOutlined />}
        title={`Dear ${data.username} Welcome to Expense Tracker.`}
      />
    </div>
  );
}

export default Home;
