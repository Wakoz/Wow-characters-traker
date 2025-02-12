// src/pages/auth/index.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import styles from "./Auth.module.css";

export default function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Pour switcher entre login et register

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser({ email, password });
      navigate("/characters");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Wow Characters Tracker</h1>

      <div className={styles.authTabs}>
        <button
          type="button"
          className={isLogin ? styles.authButton : ""}
          onClick={() => setIsLogin(true)}
        >
          Connexion
        </button>
        <button
          type="button"
          className={!isLogin ? styles.authButton : ""}
          onClick={() => setIsLogin(false)}
        >
          Inscription
        </button>
      </div>

      <form className={styles.authForm} onSubmit={handleSubmit}>
        <div className={styles.authInputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && <p className={styles.authError}>{error}</p>}

        <button className={styles.authButton} type="submit">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
