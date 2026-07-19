import { motion } from "framer-motion";

export default function LoginBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Background Gradient */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1e3a8a_0%,#0f172a_40%,#020617_100%)]" />

      {/* Top Sphere */}

      <motion.div
        animate={{
          y: [-15, 15, -15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-blue-800 blur-sm"
      />

      {/* Left Sphere */}

      <motion.div
        animate={{
          y: [20, -20, 20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-24 left-10 h-48 w-48 rounded-full bg-gradient-to-br from-blue-300 via-blue-600 to-indigo-900 blur-sm"
      />

      {/* Right Sphere */}

      <motion.div
        animate={{
          y: [-10, 20, -10],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-10 top-36 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-900 blur-sm"
      />

      {/* Glow */}

      <div className="absolute left-1/4 top-1/2 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

    </div>
  );
}