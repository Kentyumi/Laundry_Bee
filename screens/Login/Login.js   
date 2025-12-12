// src/screens/Login/Login.js
import React, { useState } from "react";
import "./Login.css";

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ACCOUNTS = {
    "0901962534": "Yumi170220",
    "0368462426": "Uyenkute123",
    "beeXinhDep": "BeeXinh123",
  };

  const handleLogin = () => {
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (ACCOUNTS[username] && ACCOUNTS[username] === password) {
      setError("");
      localStorage.setItem("currentUser", username);
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="login-card fade-in">
      {/* Logo */}
      <div className="logo-box">
        <div className="circle">
          <img src="https://i.imgur.com/dy7QF0S.png" alt="Bee Laundry Logo" />
        </div>
        <h1>Bee Laundry</h1>
        <p className="sub">Welcome back!</p>
      </div>

      {/* Inputs */}
      <div className="input-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Số điện thoại hoặc Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Login button */}
      <button className="btn-login" onClick={handleLogin}>
        Đăng nhập
      </button>

      {/* Error */}
      <div className="error">{error}</div>
    </div>
  );
}
