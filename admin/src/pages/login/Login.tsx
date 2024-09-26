import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { RootState } from "../../redux/store";
import "./login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.user);

  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick}>Login</button>
        {error && <div className="login-error">Something went wrong...</div>}
        <div className="login-footer">
          <p>
            <a href="/forgot-password">Forgot password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
