import { useState } from "react";
import type { WowClass, WowServer, Character } from "../../../types";
import { Link } from "react-router-dom";

// Type pour les données du formulaire
export interface CharacterFormData {
  name: string;
  class_id: string; // On garde en string pour le formulaire
  level: string; // On garde en string pour le formulaire
  server_id: string; // On garde en string pour le formulaire
}

interface CharacterFormProps {
  initialData?: Partial<Character> | null;
  onSubmit: (data: CharacterFormData) => void;
  classes: WowClass[];
  servers: WowServer[];
  onCancel?: () => void;
}

export default function CharacterForm({
  initialData,
  onSubmit,
  classes,
  servers,
}: CharacterFormProps) {
  const [formData, setFormData] = useState<CharacterFormData>({
    name: initialData?.name || "",
    class_id: initialData?.class_id?.toString() || "",
    level: initialData?.level?.toString() || "",
    server_id: initialData?.server_id?.toString() || "",
  });

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <article className="character-card">
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
