// src/pages/characters/CharacterFormPage.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCharacter,
  updateCharacter,
  getCharacterById,
} from "../../services/characters";
import { getAllClasses, type WowClass } from "../../services/classes";
import { getAllServers, type WowServer } from "../../services/servers";
import { getCurrentUser } from "../../services/auth";
import styles from "./CharactersEditPage.module.css";

export default function CharacterFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [character, setCharacter] = useState({
    name: "",
    class_id: 0,
    level: 1,
    server_id: 0,
  });

  const [classes, setClasses] = useState<WowClass[]>([]);
  const [servers, setServers] = useState<WowServer[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesData, serversData] = await Promise.all([
          getAllClasses(),
          getAllServers(),
        ]);

        setClasses(classesData);
        setServers(serversData);

        if (isEditing) {
          const characterData = await getCharacterById(Number(id));
          setCharacter(characterData);
        }
      } catch (err) {
        setError("Erreur lors du chargement des données");
      }
    };

    fetchData();
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUser = getCurrentUser();

    if (!currentUser) {
      setError("Utilisateur non connecté");
      return;
    }

    try {
      const characterData = {
        ...character,
        user_id: currentUser.id,
      };

      if (isEditing) {
        await updateCharacter({
          ...characterData,
          id: Number(id),
        });
      } else {
        await createCharacter(characterData);
      }

      navigate("/characters");
    } catch (err) {
      setError("Erreur lors de l'enregistrement du personnage");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>{isEditing ? "Modifier un personnage" : "Créer un personnage"}</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du personnage"
          value={character.name}
          onChange={(e) =>
            setCharacter({
              ...character,
              name: e.target.value,
            })
          }
          required
        />

        <select
          value={character.class_id}
          onChange={(e) =>
            setCharacter({
              ...character,
              class_id: Number(e.target.value),
            })
          }
          required
        >
          <option value="">Sélectionnez une classe</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>

        <select
          value={character.server_id}
          onChange={(e) =>
            setCharacter({
              ...character,
              server_id: Number(e.target.value),
            })
          }
          required
        >
          <option value="">Sélectionnez un serveur</option>
          {servers.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Niveau"
          min="1"
          max="80"
          value={character.level}
          onChange={(e) =>
            setCharacter({
              ...character,
              level: Number(e.target.value),
            })
          }
          required
        />

        <div className={styles.EditButtonGroup}>
          <button className={styles.buttonEditPage} type="submit">
            {isEditing ? "Modifier" : "Créer"}
          </button>
          <button
            className={styles.buttonEditPage}
            type="button"
            onClick={() => navigate("/characters")}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
