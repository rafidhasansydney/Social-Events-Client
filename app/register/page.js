import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Join the community | Bandhan" };

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main className="account-state" role="status">
          Getting things ready…
        </main>
      }
    >
      <AuthForm mode="register" />
    </Suspense>
  );
}
