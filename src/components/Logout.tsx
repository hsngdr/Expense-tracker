import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IState } from "../store";
import { logout } from "../store/actions/userActions";

function Logout() {
  const { data } = useSelector((state: IState) => state.user);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout());
  }, []);
  if (!data.username) {
    navigate("/login");
  }
  return <div>Logging Out...</div>;
}

export default Logout;
