// src/pages/characters/CharacterFormPage.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCharacter,
  getCharacterById,
  updateCharacter,
} from "../../services/characters";
import { getAllClasses } from "../../services/classes";
import { getAllServers } from "../../services/servers";
import type { Character, WowClass, WowServer } from "../../types/index";
import CharacterForm, {
  type CharacterFormData,
} from "../../components/Character/CharacterForm/CharacterForm";

export default function CharacterFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classes, setClasses] = useState<WowClass[]>([]);
  const [servers, setServers] = useState<WowServer[]>([]);
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

        if (id) {
          const characterData = await getCharacterById(Number(id));
          setCharacter(characterData);
        }
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (formData: CharacterFormData) => {
    try {
      const characterData = {
        name: formData.name,
        class_id: Number(formData.class_id),
        level: Number(formData.level),
        server_id: Number(formData.server_id),
      };

      if (id) {
        await updateCharacter({
          ...characterData,
          id: Number(id),
          user_id: character?.user_id as number,
        });
      } else {
        await createCharacter({
          ...characterData,
          user_id: character?.user_id as number,
        });
      }
      navigate("/characters");
    } catch (err) {
      setError("Erreur lors de l'enregistrement du personnage");
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div className="container">
      <h1>{id ? "Modifier le personnage" : "Créer un personnage"}</h1>
      <CharacterForm
        initialData={character}
        onSubmit={handleSubmit}
        classes={classes}
        servers={servers}
      />
    </div>
  );
}
