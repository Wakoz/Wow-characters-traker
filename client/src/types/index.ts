export interface IUser {
  id: number;
  email: string;
  createdAt: Date;
}

export interface ICharacter {
  id: number;
  name: string;
  class: WoWClass;
  level: number;
  server: Server;
  userId: number;
}

export enum WoWClass {
  WARRIOR = "Warrior",
  PALADIN = "Paladin",
  HUNTER = "Hunter",
  ROGUE = "Rogue",
  PRIEST = "Priest",
  MAGE = "Mage",
  WARLOCK = "Warlock",
  DRUID = "Druid",
  SHAMAN = "Shaman",
  DEATH_KNIGHT = "Death Knight",
}

export enum Server {
  ARCHIMONDE = "Archimonde",
  SYLVANAS = "Sylvanas",
  HYJAL = "Hyjal",
  ILLIDAN = "Illidan",
}
