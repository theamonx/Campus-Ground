import LoginBackground from "@/components/login/LoginBackground";
import LoginCard from "@/components/login/LoginCard";
import LoginButton from "@/components/login/LoginButton";

export default function LoginPage() {
  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950 p-8">

      <LoginBackground />

      <div className="relative z-10 flex h-full w-full items-center justify-center p-8">

        <LoginCard />

      </div>

    </main>
  );
}
