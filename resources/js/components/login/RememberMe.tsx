import { useState } from "react";

export default function RememberMe() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex items-center justify-between">

      <label className="flex cursor-pointer items-center gap-3">

        <button
          type="button"
          onClick={() => setChecked(!checked)}
          className={`
            flex h-5 w-5 items-center justify-center rounded-md border
            transition-all duration-300
            ${
              checked
                ? "border-cyan-400 bg-cyan-400"
                : "border-white/20 bg-white/5"
            }
          `}
        >
          {checked && (
            <div className="h-2 w-2 rounded-full bg-slate-900" />
          )}
        </button>

        <span className="text-sm text-slate-300">
          Remember me
        </span>

      </label>

      <button
        type="button"
        className="text-sm text-cyan-300 transition hover:text-white"
      >
        Need Help?
      </button>

    </div>
  );
}