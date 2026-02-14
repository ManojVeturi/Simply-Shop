import "./register.css";
import { useState } from "react";
import { API_BASE_URL } from "../../config.js";
import GoogleLoginBtn from "../GoogleLoginBtn.jsx";

function Register({ onNavigate }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!strongPasswordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character."
      );
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // DRF validation errors
        const firstError =
          data?.username?.[0] ||
          data?.email?.[0] ||
          data?.password?.[0] ||
          data?.detail ||
          "Registration failed.";
        throw new Error(firstError);
      }

      setSuccess("Registration successful! You can now login.");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // after 1–2 seconds, go to login (or user can click)
      setTimeout(() => onNavigate("login"), 1000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // Google register success
  function handleGoogleSuccess(data) {
    // If backend created user and returned tokens, auto-login or redirect
    if (data.created) {
      if (data.access) localStorage.setItem("access_token", data.access);
      if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
      // redirect to welcome/dashboard
      window.location.href = "/welcome";
      return;
    }

    // If backend replied that user already exists:
    if (data.created === false) {
      setSuccess("Account already exists. Please login instead.");
      setTimeout(() => onNavigate("login"), 1200);
      return;
    }

    // Fallback: if returned tokens without 'created' flag
    if (data.access) {
      localStorage.setItem("access_token", data.access);
      if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
      window.location.href = "/welcome";
    }
  }

  function handleGoogleError(err) {
    console.error("Google registration error:", err);
    setError("Google registration failed. Check console.");
  }

  return (
    <div className="register">
      <div className="register-container">
        <h1>Register</h1>

        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="register-input"
            type="text"
            id="username"
            placeholder="Enter your Name / Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="register-input"
            type="email"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="register-input"
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="register-input"
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <hr/>

        <GoogleLoginBtn
          endpoint="/api/auth/google-register/"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          renderId="g_id_signin_register"
        />

        <p>
          Already have an account?{" "}
          <span onClick={() => onNavigate("login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
