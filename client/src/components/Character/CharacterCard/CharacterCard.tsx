import type { Character } from "../../../types";
import ClassIcon, { getClassColor } from "../ClassIcons";
import { Link } from "react-router-dom";

interface CharacterCardProps {
  character: Character;
  onDelete: (id: number) => void;
}

export default function CharacterCard({
  character,
  onDelete,
}: CharacterCardProps) {
  const classColor = getClassColor(character.class_name || "");
  const faction = character.faction || "Neutre";
  
  const handleDelete = () => {
    if (
      window.confirm(
        `Voulez-vous vraiment supprimer le personnage ${character.name} ?`,
      )
    ) {
      onDelete(character.id);
    }
  };

  return (
    <article 
      className={`character-card ${faction.toLowerCase()}-card`} 
      style={{ borderColor: classColor }}
    >
      <header>
        <div className="character-info">
          <ClassIcon className={character.class_name || ""} size={40} />
          <div>
            <h3 style={{ color: classColor }}>{character.name}</h3>
            <div className="character-level">Niveau {character.level}</div>
          </div>
        </div>
      </header>

      <div className="character-details">
        <p>Race: {character.race_name}</p>
        <p>Classe: {character.class_name}</p>
        <p>Serveur: {character.server_name}</p>
        <p>
          <span className={`faction-badge ${faction.toLowerCase()}-badge`}>
            Faction: {faction}
          </span>
        </p>
      </div>

      <footer>
        <Link
          to={`/characters/edit/${character.id}`}
          className="character-action-btn edit-btn"
        >
          Modifier
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="character-action-btn delete-btn"
        >
          Supprimer
        </button>
      </footer>
    </article>
  );
}