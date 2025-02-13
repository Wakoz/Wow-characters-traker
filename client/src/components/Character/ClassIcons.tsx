interface ClassIconProps {
  className: string; // Nom de la classe WoW
  size?: number; // Taille de l'icône en pixels
}

const classColors = {
  Warrior: "#C79C6E",
  Paladin: "#F58CBA",
  Hunter: "#ABD473",
  Rogue: "#FFF569",
  Priest: "#FFFFFF",
  "Death Knight": "#C41F3B",
  Shaman: "#0070DE",
  Mage: "#69CCF0",
  Warlock: "#9482C9",
  Druid: "#FF7D0A",
} as const;

export const getClassColor = (className: string): string => {
  return classColors[className as keyof typeof classColors] || "#FFFFFF";
};

export default function ClassIcon({ className, size = 32 }: ClassIconProps) {
  const viewBox = "0 0 32 32";
  const color = getClassColor(className);

  // Icônes simplifiées pour chaque classe
  const icons = {
    Warrior: (
      <path
        fill={color}
        d="M16 4L8 12v8l8 8 8-8v-8L16 4zm0 4l4 4v4l-4 4-4-4v-4l4-4z"
      />
    ),
    Paladin: (
      <path
        fill={color}
        d="M16 4L6 9v7c0 5.5 4.5 10 10 10s10-4.5 10-10V9L16 4zm0 4l6 3v5c0 3.3-2.7 6-6 6s-6-2.7-6-6v-5l6-3z"
      />
    ),
    Hunter: (
      <path
        fill={color}
        d="M28 16L22 10 16 4 10 10 4 16l6 6 6 6 6-6 6-6zm-12 4l-4-4 4-4 4 4-4 4z"
      />
    ),
    // ... autres icônes de classe
    Default: (
      <path
        fill={color}
        d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm0 4c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z"
      />
    ),
  };

  return (
    <svg width={size} height={size} viewBox={viewBox} className="class-icon">
      <title>{className} icon</title>
      {icons[className as keyof typeof icons] || icons.Default}
    </svg>
  );
}
