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
import { getAllRaces } from "../../services/races";
import type { Character, WowClass, WowServer, WowRace } from "../../types/index";
import CharacterForm, {
  type CharacterFormData,
} from "../../components/Character/CharacterForm/CharacterForm";
import { getCurrentUser } from "../../services/auth";

export default function CharacterFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classes, setClasses] = useState<WowClass[]>([]);
  const [servers, setServers] = useState<WowServer[]>([]);
  const [races, setRaces] = useState<WowRace[]>([]);
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesData, serversData, racesData] = await Promise.all([
          getAllClasses(),
          getAllServers(),
          getAllRaces(),
        ]);

        setClasses(classesData);
        setServers(serversData);
        setRaces(racesData);

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
      // Obtenir l'utilisateur actuel
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        setError("Utilisateur non connecté");
        return;
      }
  
      // Trouver la race sélectionnée pour obtenir la faction
      const selectedRace = races.find(r => r.id.toString() === formData.race_id);
      
      const characterData = {
        name: formData.name,
        class_id: Number(formData.class_id),
        race_id: Number(formData.race_id),
        level: Number(formData.level),
        server_id: Number(formData.server_id),
        faction: selectedRace?.faction || 'Neutre'
      };
  
      if (id) {
        // Pour une mise à jour, utilisez l'ID utilisateur du personnage existant
        await updateCharacter({
          ...characterData,
          id: Number(id),
          user_id: character?.user_id as number,
        });
      } else {
        // Pour une création, utilisez l'ID de l'utilisateur connecté
        await createCharacter({
          ...characterData,
          user_id: currentUser.id,
        });
      }
      navigate("/characters");
    } catch (err) {
      setError("Erreur lors de l'enregistrement du personnage");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <article aria-busy="true" className="loading-card">
        <p>Chargement des données...</p>
      </article>
    );
  }
  
  if (error) {
    return (
      <article className="error-card">
        <p>{error}</p>
      </article>
    );
  }

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h1>{id ? "Modifier le personnage" : "Créer un personnage"}</h1>
      <CharacterForm
        initialData={character}
        onSubmit={handleSubmit}
        classes={classes}
        servers={servers}
        races={races}
      />
    </div>
  );
}