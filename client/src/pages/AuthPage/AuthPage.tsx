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
    <main className="auth-page">
      <div className="auth-container-wrapper">
        <article className="auth-container">
          <header className="auth-header">
            <h1 className="auth-title">
              WOW
              <br />
              CHARACTERS
              <br />
              TRACKER
            </h1>

            <div className="auth-toggle-buttons">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`auth-toggle ${isLogin ? "primary" : "secondary outline"}`}
              >
                Connexion
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`auth-toggle ${!isLogin ? "primary" : "secondary outline"}`}
              >
                Inscription
              </button>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="exemple@email.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Mot de passe
                <input
                  type="password"
                  name="password"
                  placeholder="Votre mot de passe"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </label>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button
              type="submit"
              className="auth-submit primary"
              aria-busy={isLoading}
              disabled={isLoading}
            >
              {isLogin ? "Se connecter" : "S'inscrire"}
            </button>
          </form>
        </article>
      </div>
    </main>
  );
}
