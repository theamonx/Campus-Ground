import { ArrowRight } from "lucide-react";

type LoginButtonProps = {
  loading?: boolean;
};

export default function LoginButton({
  loading = false,
}: LoginButtonProps) {
  return (
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
      active:scale-[.98]
      disabled:cursor-not-allowed
      disabled:opacity-70
      "
    >
      {/* Gradient */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-r
        from-sky-500
        via-blue-500
        to-indigo-500
      "
      />

      {/* Shine */}

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

      {/* Content */}

      <span className="relative z-10 flex items-center justify-center gap-3">
        {loading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Signing In...
          </>
        ) : (
          <>
            Sign In

            <ArrowRight
              size={19}
              className="
              transition-all
              duration-300
              group-hover:translate-x-2
            "
            />
          </>
        )}
      </span>
    </button>
  );
}