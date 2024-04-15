import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import {v4} from "uuid"
const Register = () => {
  let navigate=useNavigate();
  const [inputs, setInputs] = useState({
    id: "",
    name: "string",
    email: "string",
    password: "string",
     posts: [
      {
        id: "string",
        title: "string",
        post: "string",
        content: "string",
        created: "string",
        likes: 0
      }
    ],
    followers: [
      "string"
    ],
    following: [
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

      setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Blade</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="name"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
