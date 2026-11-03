"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin, ShieldCheck } from "lucide-react";
import { authenticatedFetch } from "@/lib/api";
import { useAuth } from "./Providers";
import Avatar from "./Avatar";
import ProfileEditor from "./ProfileEditor";

export default function Account() {
  const { user } = useAuth();
  const [verified, setVerified] = useState(null);
  const [error, setError] = useState("");
  const checkAccount = useCallback(async () => {
    setError("");
    try {
      setVerified((await authenticatedFetch("/api/me")).user);
    } catch (error) {
      setError(error.message);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      checkAccount();
    }, 0);
    return () => clearTimeout(timer);
  }, [checkAccount]);
  return (
    <main className="container account-page">
      <div className="eyebrow">YOUR PLACE IN THE COMMUNITY</div>
      <h1>
        Good to have you here,
        <br />
        <em>{user.name.split(" ")[0]}.</em>
      </h1>
      <p>Small acts start with people like you.</p>
      <section className="account-card">
        <Avatar
          key={(verified || user).image}
          user={verified || user}
          className="avatar-large"
        />
        <div>
          <h2>{(verified || user).name}</h2>
          <p>{(verified || user).email}</p>
          {(verified || user).location && (
            <p className="profile-area">
              <MapPin size={14} />
              {(verified || user).location}
            </p>
          )}
          {(verified || user).bio && (
            <p className="profile-bio">{(verified || user).bio}</p>
          )}
          <span className="account-badge">
            <ShieldCheck size={14} />
            {verified ? "Your account is ready" : "Checking your account…"}
          </span>
        </div>
      </section>
      {error && (
        <div className="form-error" role="alert">
          {error}
          <button className="text-link" onClick={checkAccount}>
            Try again
          </button>
        </div>
      )}
      <ProfileEditor
        key={`${user.id}-${(verified || user).updatedAt}`}
        member={verified || user}
        onSaved={checkAccount}
      />
      <div className="account-welcome">
        <Check size={21} />
        <p>
          You’re part of Bandhan. Find a cause close to home and make a little
          room for something good.
        </p>
        <Link href="/upcoming-events" className="button">
          Explore the community
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </main>
  );
}
