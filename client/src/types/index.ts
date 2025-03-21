export interface User {
  id: number;
  email: string;
}

export interface WowRace {
  id: number;
  name: string;
  faction: 'Alliance' | 'Horde' | 'Neutre';
}
export interface Character {
  id: number;
  name: string;
  class_id: number;
  race_id: number;
  level: number;
  server_id: number;
  user_id: number;
  class_name?: string;
  race_name?: string;
  server_name?: string;
  faction?: 'Alliance' | 'Horde' | 'Neutre';
}

export interface WowClass {
  id: number;
  name: string;
}

export interface WowServer {
  id: number;
  name: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
