import type { Character } from "../../../services/characters";
import CharacterCard from "../CharacterCard/CharacterCard";

interface CharacterListProps {
  characters: Character[];
  onDelete: (id: number) => void;
}

export default function CharacterList({
  characters,
  onDelete,
}: CharacterListProps) {
  if (characters.length === 0) {
    return (
      <article className="empty-state">
        <p>Aucun personnage trouvé</p>
        <p>Commencez par en créer un !</p>
      </article>
    );
  }

  return (
    <div className="character-grid">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
