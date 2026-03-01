import "./login.css";
import { useState } from "react";
import { API_BASE_URL } from "../../config.js";
import GoogleLoginBtn from "../GoogleLoginBtn.jsx";

function Login({ onNavigate, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/login/` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // pass to App
      onLogin({
        user: data.user,
        token: data.token,
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSuccess(data) {
    if (data.access) localStorage.setItem("access_token", data.access);
    if (data.refresh) localStorage.setItem("refresh_token", data.refresh);

    const user = data.user || { email: data.email, name: data.name };
    const token = data.token || data.access || null;

    onLogin({
      user,
      token,
    });
  }

  function handleGoogleError(err) {
    console.error("Google login error:", err);
    setError("Google login failed. Check console.");
  }

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <p>
          Don't have an account?{" "}
          <span onClick={() => onNavigate("register")}>Register Now</span>
        </p>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            id="username"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr/>

        <GoogleLoginBtn
          endpoint="/api/auth/google-login/"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          renderId="g_id_signin_login"
        />
      </div>
    </div>
  );
}

export default Login;
