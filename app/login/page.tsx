import { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login | Sacrament Meeting Planner",
  description: "Sign in to manage sacrament meeting schedules and details.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <LoginForm />
      </div>
    </main>
  );
}