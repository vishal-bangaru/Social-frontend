import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import {v4} from "uuid"
const Register = () => {
  let navigate=useNavigate();
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

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let data={...inputs,id:v4()};
     
      await axios.post("https://localhost:7015/students/InsertStudent", data);
      navigate("/login");
    } catch (err) {

      setErr("Username Already Exists");
    }
  };


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Blade</h1>
          <p>
          
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          {err && <p style={{color: 'red'}}>{err}</p>}
          <form>
            <input
              type="text"
              placeholder="Username"
              name="name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
