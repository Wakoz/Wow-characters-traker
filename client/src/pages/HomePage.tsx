// src/pages/HomePage/HomePage.tsx
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

export default function HomePage() {
  const currentUser = getCurrentUser();
  
  return (
    <main className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">
          Bienvenue à toi jeune aventurier !
        </h1>
        <p className="hero-description">
          Gérez et suivez facilement vos personnages World of Warcraft. 
          Organisez, cataloguez et gardez une trace de tous vos héros.
        </p>
        
        <Link 
          to={currentUser ? "/characters" : "/auth"} 
          role="button" 
          className="hero-button primary"
        >
          <span className="icon">👤</span>
          {currentUser ? "Mes Personnages" : "Commencer"}
        </Link>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          {/* Feature 1 */}
          <article className="feature-card">
            <div className="feature-icon">🎮</div>
            <h2 className="feature-title">
              Suivi de personnages
            </h2>
            <p className="feature-description">
              Suivez tous vos personnages avec facilité. Niveau, classe, serveur et race - tout est à portée de main.
            </p>
          </article>

          {/* Feature 2 */}
          <article className="feature-card">
            <div className="feature-icon">🖥️</div>
            <h2 className="feature-title">
              Multi-serveurs
            </h2>
            <p className="feature-description">
              Gérez vos personnages sur différents serveurs. Une vue centralisée de tous vos héros.
            </p>
          </article>

          {/* Feature 3 */}
          <article className="feature-card">
            <div className="feature-icon">👥</div>
            <h2 className="feature-title">
              Alliance & Horde
            </h2>
            <p className="feature-description">
              Gardez une trace de tous vos personnages, qu'ils soient de l'Alliance ou de la Horde.
            </p>
          </article>
        </div>
      </div>

      {/* Classes Section */}
      <div className="classes-section">
        <h2 className="section-title">Classes disponibles</h2>
        <div className="classes-grid">
          <div className="class-tag warrior">Guerrier</div>
          <div className="class-tag paladin">Paladin</div>
          <div className="class-tag hunter">Chasseur</div>
          <div className="class-tag rogue">Voleur</div>
          <div className="class-tag priest">Prêtre</div>
          <div className="class-tag deathknight">Chevalier de la mort</div>
          <div className="class-tag shaman">Chaman</div>
          <div className="class-tag mage">Mage</div>
          <div className="class-tag warlock">Démoniste</div>
          <div className="class-tag monk">Moine</div>
          <div className="class-tag druid">Druide</div>
          <div className="class-tag demonhunter">Chasseur de démons</div>
          <div className="class-tag evoker">Évocateur</div>
        </div>
      </div>
    </main>
  );
}