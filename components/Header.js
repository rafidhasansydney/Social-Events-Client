"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CalendarPlus,
  CalendarCheck,
  LayoutList,
  LogOut,
  Menu,
  Sprout,
  UserRound,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "./Providers";
import Avatar from "./Avatar";

function HeaderContent() {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { user, isPending, error, refetch } = useAuth();
  const path = usePathname();
  const router = useRouter();
  const links = [
    ["Home", "/"],
    ["Upcoming Events", "/upcoming-events"],
    ...(user
      ? [
          ["Manage Events", "/manage-events"],
          ["Joined Events", "/joined-events"],
        ]
      : [
          ["How it works", "/#how-it-works"],
          ["Our story", "/#our-story"],
        ]),
  ];

  async function signOut() {
    setSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error)
        throw new Error(result.error.message || "Unable to log out.");
      toast.success("You’re logged out. See you again soon.");
      setOpen(false);
      router.replace("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Bandhan home">
          <Sprout size={29} strokeWidth={1.5} />
          Bandhan<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, href]) => (
            <Link
              href={href}
              key={name}
              className={href === path ? "active" : ""}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          {isPending ? (
            <span
              className="session-placeholder"
              aria-label="Loading your account"
            />
          ) : error ? (
            <button className="login-link" onClick={() => refetch()}>
              Retry account
            </button>
          ) : user ? (
            <details className="profile-menu">
              <summary aria-label={`Account menu for ${user.name}`}>
                <Avatar key={user.image} user={user} />
                <span>{user.name.split(" ")[0]}</span>
              </summary>
              <div className="profile-dropdown">
                <p>
                  {user.name}
                  <small>{user.email}</small>
                </p>
                <Link href="/account">
                  <UserRound size={16} />
                  Your account
                </Link>
                <Link href="/create-event">
                  <CalendarPlus size={16} />
                  Create Event
                </Link>
                <Link href="/manage-events">
                  <LayoutList size={16} />
                  Manage Events
                </Link>
                <Link href="/joined-events">
                  <CalendarCheck size={16} />
                  Joined Events
                </Link>
                <button onClick={signOut} disabled={signingOut}>
                  <LogOut size={16} />
                  {signingOut ? "Logging out…" : "Log out"}
                </button>
              </div>
            </details>
          ) : (
            <>
              <Link className="login-link" href="/login">
                Log in <ArrowUpRight size={14} />
              </Link>
              <Link className="button small" href="/register">
                Get involved <ArrowUpRight size={16} />
              </Link>
            </>
          )}
          <button
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(([name, href]) => (
            <Link key={name} href={href} onClick={() => setOpen(false)}>
              {name}
              <ArrowUpRight size={17} />
            </Link>
          ))}
          {!user && !isPending && (
            <Link href="/login" onClick={() => setOpen(false)}>
              Log in <ArrowUpRight size={17} />
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default function Header() {
  return (
    <Suspense
      fallback={
        <header className="site-header">
          <div className="container header-inner">
            <Link className="brand" href="/" aria-label="Bandhan home">
              <Sprout size={29} strokeWidth={1.5} />
              Bandhan<span>.</span>
            </Link>
            <span
              className="session-placeholder"
              aria-label="Loading navigation"
            />
          </div>
        </header>
      }
    >
      <HeaderContent />
    </Suspense>
  );
}
