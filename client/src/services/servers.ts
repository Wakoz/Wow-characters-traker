import { ENDPOINTS } from "./config";
import { getToken } from "./auth";

export interface WowServer {
  id: number;
  name: string;
}

export const getAllServers = async () => {
  const token = getToken();
  const response = await fetch(ENDPOINTS.SERVERS.BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Impossible de charger les serveurs");

  return response.json() as Promise<WowServer[]>;
};
