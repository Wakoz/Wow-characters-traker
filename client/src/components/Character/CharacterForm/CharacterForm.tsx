import { useState, useEffect } from "react";
import type { WowClass, WowServer, Character, WowRace } from "../../../types";
import { Link } from "react-router-dom";

// Type pour les données du formulaire
export interface CharacterFormData {
  name: string;
  class_id: string; // On garde en string pour le formulaire
  race_id: string; // On garde en string pour le formulaire
  level: string; // On garde en string pour le formulaire
  server_id: string; // On garde en string pour le formulaire
}

interface CharacterFormProps {
  initialData?: Partial<Character> | null;
  onSubmit: (data: CharacterFormData) => void;
  classes: WowClass[];
  servers: WowServer[];
  races: WowRace[];
  onCancel?: () => void;
}

export default function CharacterForm({
  initialData,
  onSubmit,
  classes,
  servers,
  races,
}: CharacterFormProps) {
  const [formData, setFormData] = useState<CharacterFormData>({
    name: initialData?.name || "",
    class_id: initialData?.class_id?.toString() || "",
    race_id: initialData?.race_id?.toString() || "",
    level: initialData?.level?.toString() || "",
    server_id: initialData?.server_id?.toString() || "",
  });

  const [filteredRaces, setFilteredRaces] = useState<WowRace[]>(races);
  const [selectedFaction, setSelectedFaction] = useState<'Alliance' | 'Horde' | 'Tous'>(
    initialData?.faction ? initialData.faction as 'Alliance' | 'Horde' : 'Tous'
  );

  // Filtrer les races lorsque la faction change
  useEffect(() => {
    if (selectedFaction === 'Tous') {
      setFilteredRaces(races);
    } else {
      setFilteredRaces(races.filter(race => race.faction === selectedFaction));
    }
  }, [selectedFaction, races]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Si on change la race, on met à jour automatiquement la faction
    if (name === 'race_id' && value) {
      const selectedRace = races.find(race => race.id.toString() === value);
      if (selectedRace) {
        setSelectedFaction(selectedRace.faction as 'Alliance' | 'Horde');
      }
    }
  };

  const handleFactionChange = (faction: 'Alliance' | 'Horde') => {
    setSelectedFaction(faction);
    // Réinitialiser la race si on change de faction
    setFormData(prev => ({
      ...prev,
      race_id: '',
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <article className={`character-card ${selectedFaction !== 'Tous' ? selectedFaction.toLowerCase() + '-card' : ''}`}>
        <div className="grid">
          <label>
            Nom
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          {/* Sélection de faction */}
          <div className="faction-selector">
            <label>Faction</label>
            <div className="faction-buttons">
              <button
                type="button"
                className={`alliance-button ${selectedFaction === 'Alliance' ? 'selected' : ''}`}
                onClick={() => handleFactionChange('Alliance')}
              >
                Alliance
              </button>
              <button
                type="button"
                className={`horde-button ${selectedFaction === 'Horde' ? 'selected' : ''}`}
                onClick={() => handleFactionChange('Horde')}
              >
                Horde
              </button>
            </div>
          </div>

          <label>
            Race
            <select
              name="race_id"
              value={formData.race_id}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une race</option>
              {filteredRaces.map((race) => (
                <option key={race.id} value={race.id}>
                  {race.name} ({race.faction})
                </option>
              ))}
            </select>
          </label>

          <label>
            Classe
            <select
              name="class_id"
              value={formData.class_id}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une classe</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Niveau
            <input
              type="number"
              name="level"
              value={formData.level}
              onChange={handleChange}
              min="1"
              max="80"
              required
            />
          </label>

          <label>
            Serveur
            <select
              name="server_id"
              value={formData.server_id}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner un serveur</option>
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-buttons">
          <Link to="/characters" className="character-action-btn delete-btn">
            Annuler
          </Link>
          <button type="submit" className="character-action-btn edit-btn">
            {initialData ? "Modifier" : "Créer"}
          </button>
        </div>
      </article>
    </form>
  );
}