import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

type PasswordInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function PasswordInput({
  value,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-slate-200">
        Password
      </label>

      <div
        className="
          flex
          h-14
          items-center
          rounded-2xl
          border
          border-white/10
          bg-white/10
          px-5
          transition-all
          duration-300
          focus-within:border-cyan-400
          focus-within:bg-white/15
          focus-within:shadow-[0_0_25px_rgba(59,130,246,.25)]
        "
      >
        <Lock
          size={18}
          className="mr-3 text-slate-400"
        />

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your password"
          className="
            flex-1
            bg-transparent
            text-white
            placeholder:text-slate-400
            outline-none
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-slate-400 transition hover:text-cyan-300"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
    </div>
  );
}