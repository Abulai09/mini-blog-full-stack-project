import { LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { logOutAC } from "../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector( state => state.auth )

  const handleLogout = () => {
    dispatch(logOutAC());
    localStorage.removeItem("token"); // Удаляем токен
    navigate("/login"); // Перенаправляем на страницу логина
  };

  return (
    <div className="header">
      <div className="logo">Navbar</div>
      <div className="menu">
        <Link to="/login">login</Link>
        <Link to="/main">main</Link>
        { auth.isAuth && <Link to="/profile">profile</Link>}
      </div>
      <div className="logOut">
        <button onClick={handleLogout}>
          <LogoutOutlined />
        </button>
      </div>
    </div>
  );
};

export default Header;
