import { useState, useEffect } from "react";
import { getAllCharacters, deleteCharacter } from "../../services/characters";
import { getAllClasses, type WowClass } from "../../services/classes";
import { getAllServers, type WowServer } from "../../services/servers";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CharactersPage.module.css";

type Character = {
  id: number;
  name: string;
  class_id: number;
  level: number;
  server_id: number;
  class_name?: string;
  server_name?: string;
};

export default function CharactersPage() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [classes, setClasses] = useState<WowClass[]>([]);
  const [servers, setServers] = useState<WowServer[]>([]);
  const [filters, setFilters] = useState({
    class: 0,
    minLevel: 0,
    maxLevel: 80,
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const filteredCharacters = characters.filter((character) => {
    const classMatch =
      filters.class === 0 || character.class_id === filters.class;
    const minLevelMatch = character.level >= filters.minLevel;
    const maxLevelMatch = character.level <= filters.maxLevel;

    return classMatch && minLevelMatch && maxLevelMatch;
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [charactersData, classesData, serversData] = await Promise.all([
          getAllCharacters(),
          getAllClasses(),
          getAllServers(),
        ]);

        // Enrichir les personnages avec les noms de classe et de serveur
        const enrichedCharacters = charactersData.map((character) => {
          const characterClass = classesData.find(
            (c) => c.id === character.class_id,
          );
          const characterServer = serversData.find(
            (s) => s.id === character.server_id,
          );

          return {
            ...character,
            class_name: characterClass
              ? characterClass.name
              : "Classe inconnue",
            server_name: characterServer
              ? characterServer.name
              : "Serveur inconnu",
          };
        });

        setCharacters(enrichedCharacters);
        setClasses(classesData);
        setServers(serversData);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (characterId: number) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce personnage ?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCharacter(characterId);

      const updatedCharacters = await getAllCharacters();
      setCharacters(updatedCharacters);

      setError("");
    } catch (err) {
      setError("Erreur lors de la suppression du personnage");
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === "class" ? Number(value) : Number(value),
    }));
  };

  const resetFilters = () => {
    setFilters({
      class: 0,
      minLevel: 0,
      maxLevel: 80,
    });
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div className={styles.charactersError}>{error}</div>;

  return (
    <div className={styles.charactersContainer}>
      <div className={styles.charactersHeader}>
        <h1 className={styles.charactersTitle}>Mes personnages</h1>
        <div className={styles.charactersActions}>
          <Link to="/characters/new" className={styles.addButton}>
            + Add
          </Link>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
          >
            Filter ▼
          </button>
        </div>
      </div>

      {isFilterModalOpen && (
        <div className={styles.filterModal}>
          <div className={styles.filterContent}>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
            >
              <option value={0}>Toutes les classes</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>

            <div className={styles.levelFilters}>
              <input
                type="number"
                name="minLevel"
                placeholder="Niveau min"
                value={filters.minLevel}
                onChange={handleFilterChange}
                min={1}
                max={80}
              />
              <input
                type="number"
                name="maxLevel"
                placeholder="Niveau max"
                value={filters.maxLevel}
                onChange={handleFilterChange}
                min={1}
                max={80}
              />
            </div>

            <div className={styles.filterActions}>
              <button type="button" onClick={resetFilters}>
                Réinitialiser
              </button>
              <button type="button" onClick={() => setIsFilterModalOpen(false)}>
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.charactersList}>
        {filteredCharacters.map((character) => (
          <div key={character.id} className={styles.charactersCard}>
            <h3>{character.name}</h3>
            <p>Niveau {character.level}</p>
            <p>{character.class_name}</p>
            <p>{character.server_name}</p>
            <div className={styles.characterCardActions}>
              <Link
                to={`/characters/edit/${character.id}`}
                className={styles.editButton}
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(character.id)}
                className={styles.deleteButton}
                type="button"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}

        {filteredCharacters.length === 0 && (
          <p className={styles.noCharactersMessage}>
            Aucun personnage ne correspond aux filtres sélectionnés.
          </p>
        )}
      </div>
    </div>
  );
}
