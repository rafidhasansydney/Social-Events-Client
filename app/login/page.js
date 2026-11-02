import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Log in | Bandhan" };

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="account-state" role="status">
          Getting things ready…
        </main>
      }
    >
      <AuthForm mode="login" />
    </Suspense>
  );
}
