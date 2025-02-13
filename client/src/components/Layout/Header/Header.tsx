import { useState } from "react";
import { Link } from "react-router-dom";
import { logout, getCurrentUser } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
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

        {currentUser && (
          <ul className={`nav-menu ${isMenuOpen ? "is-open" : ""}`}>
            <li>
              <Link to="/characters" className="nav-link" onClick={closeMenu}>
                Mes personnages
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="outline"
              >
                Déconnexion
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
