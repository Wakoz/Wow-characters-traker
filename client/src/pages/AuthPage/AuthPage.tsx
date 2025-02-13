import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/auth";

export default function AuthPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        await loginUser(credentials);
      } else {
        await registerUser(credentials);
      }
      navigate("/characters");
    } catch (err) {
      setError(
        isLogin
          ? "Email ou mot de passe incorrect"
          : "Erreur lors de l'inscription",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main
      className="container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <article
          style={{
            padding: "2rem",
            backgroundColor: "#1f2937",
            border: "2px solid #f8b700",
          }}
        >
          <header style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1
              style={{
                color: "#f8b700",
                fontSize: "2rem",
                marginBottom: "2rem",
              }}
            >
              WOW
              <br />
              CHARACTERS
              <br />
              TRACKER
            </h1>

            <div className="grid" style={{ gap: "1rem" }}>
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={isLogin ? "primary" : "secondary outline"}
                style={{ margin: 0 }}
              >
                Connexion
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={!isLogin ? "primary" : "secondary outline"}
                style={{ margin: 0 }}
              >
                Inscription
              </button>
            </div>
          </header>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ marginBottom: "0.5rem" }}>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="exemple@email.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#374151" }}
                />
              </label>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ marginBottom: "0.5rem" }}>
                Mot de passe
                <input
                  type="password"
                  name="password"
                  placeholder="Votre mot de passe"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  style={{ backgroundColor: "#374151" }}
                />
              </label>
            </div>

            {error && (
              <p
                style={{
                  color: "#ff4444",
                  textAlign: "center",
                  margin: "1rem 0",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="primary"
              aria-busy={isLoading}
              disabled={isLoading}
              style={{
                width: "100%",
                backgroundColor: "#f8b700",
                border: "none",
                marginTop: "1rem",
              }}
            >
              {isLogin ? "Se connecter" : "S'inscrire"}
            </button>
          </form>
        </article>
      </div>
    </main>
  );
}
