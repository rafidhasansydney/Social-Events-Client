"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  Sprout,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient, safeReturnPath } from "@/lib/auth-client";
import { useAuth } from "./Providers";

function GoogleMark() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.74 2.98-4.31 2.98-7.35Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.75-5.59-4.1H3.07v2.58A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.94A6 6 0 0 1 6.1 12c0-.67.11-1.33.31-1.94V7.48H3.07A10 10 0 0 0 2 12c0 1.61.38 3.14 1.07 4.52l3.34-2.58Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.48l3.34 2.58C7.2 7.71 9.4 5.96 12 5.96Z"
      />
    </svg>
  );
}

export default function AuthForm({ mode }) {
  const registering = mode === "register";
  const router = useRouter();
  const search = useSearchParams();
  const next = safeReturnPath(search.get("next"));
  const { user, isPending, refetch } = useAuth();
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && !isPending) router.replace(next);
  }, [user, isPending, router, next]);

  async function submit(event) {
    event.preventDefault();
    if (busy || googleBusy) return;
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const name = String(data.get("name") || "").trim();
    const image = String(data.get("image") || "").trim();
    if (
      registering &&
      (!/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        password.length < 6)
    ) {
      setError(
        "Your password needs at least 6 characters, an uppercase and a lowercase letter.",
      );
      return;
    }
    if (registering) {
      try {
        if (!name || !["http:", "https:"].includes(new URL(image).protocol))
          throw new Error();
      } catch {
        setError(
          "Enter your name and a valid HTTP or HTTPS profile image URL.",
        );
        return;
      }
    }
    setBusy(true);
    try {
      const result = registering
        ? await authClient.signUp.email({ name, email, image, password })
        : await authClient.signIn.email({ email, password });
      if (result.error)
        throw new Error(
          result.error.message || "Unable to sign in. Please try again.",
        );
      await refetch();
      toast.success(
        registering
          ? "Welcome to Bandhan. Good starts with you."
          : "Welcome back. It’s good to see you.",
      );
      router.replace(next);
      router.refresh();
    } catch (error) {
      setError(error.message || "We couldn’t connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function googleLogin() {
    setError("");
    setGoogleBusy(true);
    try {
      const callback = new URL(next, window.location.origin).href;
      const returnUrl = new URL(callback);
      returnUrl.searchParams.set("auth", "google");
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: returnUrl.href,
        newUserCallbackURL: returnUrl.href,
        errorCallbackURL: `${window.location.origin}/login?error=google`,
      });
      if (result.error)
        throw new Error(result.error.message || "Unable to connect to Google.");
    } catch (error) {
      setError(error.message);
      setGoogleBusy(false);
    }
  }

  const displayedError =
    error ||
    (search.has("error")
      ? "Google sign-in didn’t finish. Please try again or use your email."
      : "");
  return (
    <main className="auth-page">
      <section className="auth-story">
        <Image
          src="/images/hero.png"
          alt="Volunteers sharing winter blankets with neighbours in Dhaka"
          fill
          sizes="(max-width: 800px) 100vw, 48vw"
          preload
        />
        <div className="auth-story-overlay">
          <Link className="brand" href="/" aria-label="Bandhan home">
            <Sprout size={29} strokeWidth={1.5} />
            Bandhan<span>.</span>
          </Link>
          <div>
            <span className="eyebrow">FOR THE PLACE WE CALL HOME</span>
            <h1>
              A little time.
              <br /> A lasting <em>bond.</em>
            </h1>
            <p>
              Find a cause close to your heart.
              <br />
              Meet the people who care about it too.
            </p>
          </div>
          <span className="auth-photo-note">
            Small acts. Stronger communities.
          </span>
        </div>
      </section>
      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <Link href="/" className="auth-back">
            ← Back to the community
          </Link>
          <div className="eyebrow">
            {registering
              ? "YOUR NEXT GOOD THING STARTS HERE"
              : "GOOD TO HAVE YOU HERE AGAIN"}
          </div>
          <h2>
            {registering ? (
              <>
                Make yourself
                <br />
                <em>part of the story.</em>
              </>
            ) : (
              <>
                Welcome
                <br />
                <em>back, neighbour.</em>
              </>
            )}
          </h2>
          <p className="auth-intro">
            {registering
              ? "A few details, and you’re one of us."
              : "Pick up where you left a little good behind."}
          </p>
          <button
            className="google-button"
            onClick={googleLogin}
            disabled={busy || googleBusy}
          >
            {googleBusy ? (
              <LoaderCircle className="spin" size={19} />
            ) : (
              <GoogleMark />
            )}
            Continue with Google
          </button>
          <div className="auth-divider">
            <span>or continue with email</span>
          </div>
          <form onSubmit={submit} className="auth-form">
            {registering && (
              <div className="form-field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="How should we call you?"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </div>
            )}
            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                maxLength={254}
              />
            </div>
            {registering && (
              <div className="form-field">
                <label htmlFor="image">Profile photo URL</label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://…"
                  required
                  maxLength={2048}
                />
                <small>A direct link to a photo you’d like to use.</small>
              </div>
            )}
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={visible ? "text" : "password"}
                  placeholder={registering ? "Make it yours" : "Your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={
                    registering ? "new-password" : "current-password"
                  }
                  required
                  minLength={registering ? 6 : 1}
                  maxLength={128}
                  aria-describedby={registering ? "password-rules" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  aria-label={visible ? "Hide password" : "Show password"}
                >
                  {visible ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {registering && (
                <div id="password-rules" className="password-rules">
                  {[
                    [password.length >= 6, "6+ characters"],
                    [/[A-Z]/.test(password), "Uppercase"],
                    [/[a-z]/.test(password), "Lowercase"],
                  ].map(([met, text]) => (
                    <span key={text} className={met ? "met" : ""}>
                      <Check size={12} />
                      {text}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {displayedError && (
              <p className="form-error" role="alert">
                {displayedError}
              </p>
            )}
            <button
              className="button auth-submit"
              type="submit"
              disabled={busy || googleBusy}
            >
              {busy ? (
                <>
                  <LoaderCircle className="spin" size={18} />
                  {registering ? "Creating your account…" : "Logging in…"}
                </>
              ) : (
                <>
                  {registering ? "Join the community" : "Log in"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          <p className="auth-switch">
            {registering
              ? "Already part of the community?"
              : "New around here?"}{" "}
            <Link
              href={`${registering ? "/login" : "/register"}?next=${encodeURIComponent(next)}`}
            >
              {registering ? "Log in" : "Make yourself at home"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
