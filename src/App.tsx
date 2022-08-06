import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout } from "antd";
import Login from "./components/Login";
import Categories from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";

const { Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout>
        <AppHeader />
        <Content
          className="site-layout"
          style={{ padding: "50px", marginTop: 64 }}
        >
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/categories" element={<Categories />} />
              <Route path="/records" element={<Records />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>Expense Tracker</Footer>
      </Layout>
    </>
  );
}

export default App;
