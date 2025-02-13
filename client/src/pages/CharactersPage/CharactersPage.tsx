import { useState, useEffect } from "react";
import { getAllCharacters, deleteCharacter } from "../../services/characters";
import { getAllClasses } from "../../services/classes";
import { getAllServers } from "../../services/servers";
import CharacterList from "../../components/Character/CharacterList/CharacterList";
import { Link } from "react-router-dom";
import type { Character, WowClass, WowServer } from "../../types/index";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [classes, setClasses] = useState<WowClass[]>([]);
  const [servers, setServers] = useState<WowServer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    class: 0,
    minLevel: 0,
    maxLevel: 80,
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [charactersData, classesData, serversData] = await Promise.all([
        getAllCharacters(),
        getAllClasses(),
        getAllServers(),
      ]);

      const enrichedCharacters = charactersData.map((character) => ({
        ...character,
        class_name:
          classesData.find((c) => c.id === character.class_id)?.name ||
          "Classe inconnue",
        server_name:
          serversData.find((s) => s.id === character.server_id)?.name ||
          "Serveur inconnu",
      }));

      setCharacters(enrichedCharacters);
      setClasses(classesData);
      setServers(serversData);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (characterId: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce personnage ?"))
      return;

    try {
      await deleteCharacter(characterId);
      await fetchData();
    } catch (err) {
      setError("Erreur lors de la suppression du personnage");
    }
  };

  const filteredCharacters = characters.filter((character) => {
    const classMatch =
      filters.class === 0 || character.class_id === filters.class;
    const minLevelMatch = character.level >= filters.minLevel;
    const maxLevelMatch = character.level <= filters.maxLevel;
    return classMatch && minLevelMatch && maxLevelMatch;
  });

  return (
    <div className="container characters-page">
      <div className="wow-page-header">
        <h1>Mes personnages</h1>
        <div className="character-actions">
          {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
          <Link to="/characters/new" role="button" className="primary">
            + Nouveau personnage
          </Link>
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className="outline"
          >
            Filtres
          </button>
        </div>
      </div>

      {isLoading ? (
        <article aria-busy="true" className="loading-card">
          <p>Chargement de vos personnages...</p>
        </article>
      ) : error ? (
        <article className="error-card">
          <p>{error}</p>
        </article>
      ) : (
        <CharacterList
          characters={filteredCharacters}
          onDelete={handleDelete}
        />
      )}

      {isFilterModalOpen && (
        <dialog open>
          <article>
            <header>
              <h3>Filtres</h3>
              <button
                type="button"
                aria-label="Close"
                className="close"
                onClick={() => setIsFilterModalOpen(false)}
              />
            </header>

            <label>
              Classe
              <select
                name="class"
                value={filters.class}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    class: Number(e.target.value),
                  }))
                }
              >
                <option value={0}>Toutes les classes</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid">
              <label>
                Niveau minimum
                <input
                  type="number"
                  name="minLevel"
                  value={filters.minLevel}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minLevel: Number(e.target.value),
                    }))
                  }
                  min={1}
                  max={80}
                />
              </label>

              <label>
                Niveau maximum
                <input
                  type="number"
                  name="maxLevel"
                  value={filters.maxLevel}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxLevel: Number(e.target.value),
                    }))
                  }
                  min={1}
                  max={80}
                />
              </label>
            </div>

            <footer>
              <button
                type="button"
                className="secondary outline"
                onClick={() => {
                  setFilters({
                    class: 0,
                    minLevel: 0,
                    maxLevel: 80,
                  });
                }}
              >
                Réinitialiser
              </button>
              <button type="button" onClick={() => setIsFilterModalOpen(false)}>
                Appliquer
              </button>
            </footer>
          </article>
        </dialog>
      )}
    </div>
  );
}
