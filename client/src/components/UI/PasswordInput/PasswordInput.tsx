// src/components/UI/PasswordInput/PasswordInput.tsx
import { useState } from "react";

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}

export default function PasswordInput({
  name,
  value,
  onChange,
  placeholder = "Votre mot de passe",
  required = false,
  minLength,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container" style={{ position: "relative" }}>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        style={{ paddingRight: "40px" }}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          padding: "5px",
          cursor: "pointer",
          margin: 0,
        }}
        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>
  );
}