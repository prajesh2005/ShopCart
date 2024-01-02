import React from "react";
import "../App.css";
import { useState } from "react";
import axios from "axios";

const Login = ({ token, setToken }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = () => {

    //after entering wrong credentials ....this will clear the input fields 
    setError("")
    setPassword("")
    setUserName("")

    axios({
      url: "https://reqres.in/api/login",
      // url: "https://fakestoreapi.com/auth/login",
      method: "POST",
      data: {
        username: userName,
        password: password,
      },
    })
      .then((res) => {
        console.log(res.data.token);
        setToken(res.data.token);
        localStorage.setItem("userToken",res.data.token)
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data);
      });
  };

  return (
    <div className="login">
      <div className="login-inputs">
        {/* <label htmlFor="username">Enter Username: </label> */}
        <input
          type="text"
          placeholder="UserName..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        {/* <label htmlFor="password">Enter Password: </label> */}
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <small className="error-msg">Invalid Credentials</small>}
        <button className="login-btn" onClick={loginHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;