import { useState } from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email && !password) return;
    login(email, password);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      {/* navbar */}
      <Navbar />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label>Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <Button type="primary" onClick={() => {}}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
