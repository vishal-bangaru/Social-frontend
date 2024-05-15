import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    id: "string",
    type:"string",
    user_id: "string",
    name: "string",
    email: "string",
    password: "string",
    followers: [
      "string"
    ],
    following: [
      "string"
    ],
    requests:[
      "string"
    ],
    approvals:[
      "string"
    ]
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/")
    } catch (err) {
      console.log(err.response);
      setErr("Invalid Username/Password");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Social Blade</h1>
          <p>
            
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          {err && <p style={{color: 'red'}}>{err}</p>}
          <form>
            <input
              type="text"
              placeholder="Username"
              name="name"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
              <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
