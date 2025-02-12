import { useState } from "react";
import { loginUser } from "../../../services/auth";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser({ email, password });
      // Redirection après connexion réussie
      // On ajoutera la redirection plus tard
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h2>Connexion</h2>

      <div className={styles.longinFormGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.longinFormGroup}>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit">Se connecter</button>
    </form>
  );
}
