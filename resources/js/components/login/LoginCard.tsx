import { motion } from "framer-motion";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="relative w-full max-w-md"
    >
      {/* Glass Card */}

      <div
        className="
          rounded-[32px]
          border
          border-white/20
          bg-white/[0.05]
          backdrop-blur-2xl
          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
          p-10
        "
      >
        {/* Glow */}

        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 pointer-events-none" />

        {/* Logo */}

        <div className="relative z-10 flex flex-col items-center">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600/20 backdrop-blur-lg">

            <span className="text-4xl">🎓</span>

          </div>

          <p className="text-sm uppercase tracking-[6px] text-cyan-300">
            Campus Ground
          </p>

          <h1 className="mt-4 text-5xl font-bold text-white">
            Welcome
          </h1>

          <p className="mt-3 text-center text-slate-300">
            Login to continue to your campus workspace.
          </p>

        </div>

        {/* Form */}

        <div className="relative z-10 mt-10">

          <LoginForm />

        </div>

      </div>
    </motion.div>
  );
}