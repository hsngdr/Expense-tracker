import { Layout, Menu } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IState } from "../store";
import { isLoggedIn } from "../store/actions/userActions";
const { Header } = Layout;

function AppHeader() {
  const dispatch = useDispatch<any>();
  const { data, loading } = useSelector((state: IState) => state.user);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  const location = useLocation();
  const { pathname } = location;

  const loginMenuItems = [
    {
      key: "/categories",
      label: <Link to="/categories">Categories </Link>,
    },
    {
      key: "/records",
      label: <Link to="/records">Records </Link>,
    },
    {
      key: "/Logout",
      label: <Link to="/logout">Logout </Link>,
    },
  ];

  const logouMenuItems = loading
    ? []
    : [
        {
          key: "/login",
          label: <Link to="/login">Login </Link>,
        },
        {
          key: "/register",
          label: <Link to="/register">Register </Link>,
        },
      ];
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={data.username ? loginMenuItems : logouMenuItems}
      />
    </Header>
  );
}

export default AppHeader;
