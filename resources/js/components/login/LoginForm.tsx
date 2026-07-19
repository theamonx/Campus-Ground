import { ArrowRight } from "lucide-react";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import RememberMe from "./RememberMe";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Temporary delay to show loading animation
    setTimeout(() => {
      console.log({
        email,
        password,
      });

      setLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Email */}
      <div>
        <label className="mb-3 block text-sm font-medium text-slate-200">
          Email / Student ID
        </label>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="
            h-14
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/10
            px-5
            text-white
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-300
            focus:border-cyan-400
            focus:bg-white/15
            focus:shadow-[0_0_25px_rgba(59,130,246,.25)]
          "
        />
      </div>

      {/* Password */}
      <PasswordInput value={password} onChange={setPassword} />

      {/* Remember Me */}
      <RememberMe />

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          group
          relative
          h-14
          w-full
          overflow-hidden
          rounded-full
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_15px_40px_rgba(59,130,246,.45)]
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500" />

        {/* Shine Effect */}
        <div
          className="
            absolute
            inset-y-0
            -left-1/2
            w-1/2
            -skew-x-12
            bg-white/20
            blur-lg
            transition-all
            duration-700
            group-hover:left-full
          "
        />

        {/* Button Content */}
        <span className="relative z-10 flex h-full items-center justify-center gap-3">
          {loading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Signing In...
            </>
          ) : (
            <>
              Sign In

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </>
          )}
        </span>
      </button>

      {/* Forgot Password */}
      <div className="text-center">
        <button
          type="button"
          className="text-sm text-cyan-300 transition hover:text-white"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
}