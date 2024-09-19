import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { makeRequest } from "../../axios";

interface User {
  _id:string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  isAdmin: boolean;
}


export default function WidgetSm() {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await makeRequest("/users?new=true");
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users?.map((users)=>(
        <li className="widgetSmListItem" key={users._id}>
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{users.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
           ))}
      </ul>
    </div>
  );
}
