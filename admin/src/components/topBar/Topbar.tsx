import { Language, NotificationsNone, Settings } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import "./topbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";


export default function Topbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('persist:root'); 
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper"> 
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer" onClick={handleLogout}>
            <LogoutIcon />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
