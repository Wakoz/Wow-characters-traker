// services/classes.ts
import { ENDPOINTS } from "./config";
import { getToken } from "./auth";

export interface WowClass {
  id: number;
  name: string;
}

export const getAllClasses = async () => {
  const token = getToken();
  const response = await fetch(ENDPOINTS.CLASSES.BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Impossible de charger les classes");

  return response.json() as Promise<WowClass[]>;
};
