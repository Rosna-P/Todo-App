import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const predefinedEmail = "abc@gmail.com";
  const predefinedPassword = "Abc@123";

  const handleLogin = () => {
    if (email === predefinedEmail && password === predefinedPassword) {
      setError("");
      setLoggedIn(true);
      navigate("/todo");
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <div className="button-container">
          <button type="submit">Login</button>
          {loggedIn && (
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </form>
      {loggedIn && (
        <div className="logout-info">
          <p>You are logged in.</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
