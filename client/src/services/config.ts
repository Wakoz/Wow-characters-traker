export const API_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/api/auth/login`,
    REGISTER: `${API_URL}/api/auth/register`,
  },
  CHARACTERS: {
    BASE: `${API_URL}/api/characters`,
    BY_ID: (id: number) => `${API_URL}/api/characters/${id}`,
  },
  CLASSES: {
    BASE: `${API_URL}/api/classes`,
  },
  SERVERS: {
    BASE: `${API_URL}/api/servers`,
  },
} as const;
