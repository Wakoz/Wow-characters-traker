import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout, getCurrentUser } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  // Mise à jour de currentUser quand le chemin change (après navigation)
  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setShowConfirmLogout(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setShowConfirmLogout(false);
    setCurrentUser(null);
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="wow-header">
      <nav className="header-grid">
        <button
          type="button"
          className={`mobile-menu-toggle ${isMenuOpen ? "is-open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="wow-logo">
          WoW Characters Tracker
        </Link>

        {currentUser ? (
          <>
            <ul className={`nav-menu ${isMenuOpen ? "is-open" : ""}`}>
              <li>
                <Link to="/" className="nav-link" onClick={closeMenu}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/characters" className="nav-link" onClick={closeMenu}>
                  Mes personnages
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmLogout(true);
                    closeMenu();
                  }}
                  className="logout-button"
                >
                  <span className="logout-icon">🚪</span> Déconnexion
                </button>
              </li>
            </ul>
            
            {/* Confirmation de déconnexion */}
            {showConfirmLogout && (
              <dialog open className="logout-dialog">
                <article className="character-card">
                  <header>
                    <h3>Confirmer la déconnexion</h3>
                  </header>
                  <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                  <footer>
                    <button
                      type="button"
                      className="character-action-btn edit-btn"
                      onClick={() => setShowConfirmLogout(false)}
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      className="character-action-btn delete-btn"
                      onClick={handleLogout}
                    >
                      Déconnexion
                    </button>
                  </footer>
                </article>
              </dialog>
            )}
          </>
        ) : (
          <ul className={`nav-menu ${isMenuOpen ? "is-open" : ""}`}>
            <li>
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/auth" className="nav-link" onClick={closeMenu}>
                Connexion
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}