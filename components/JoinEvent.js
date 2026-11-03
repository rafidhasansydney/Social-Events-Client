"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Check, LoaderCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { authenticatedFetch } from "@/lib/api";
import { useAuth } from "./Providers";

export default function JoinEvent({ event, ended }) {
  const { user, isPending, error: accountError, refetch } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState({ key: "", joined: false, error: "" });
  const [attempt, setAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const key = `${event._id}:${user?.id || ""}:${attempt}`;
  const returnPath = `/login?next=${encodeURIComponent(`/events/${event._id}`)}`;

  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    authenticatedFetch(`/api/events/${event._id}/participation`, {
      signal: controller.signal,
    })
      .then((result) => {
        if (!controller.signal.aborted)
          setStatus({ key, joined: result.joined, error: "" });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setStatus({ key, joined: false, error: error.message });
      });
    return () => controller.abort();
  }, [event._id, user, key]);

  async function join() {
    if (submitting.current || ended) return;
    submitting.current = true;
    setBusy(true);
    try {
      const result = await authenticatedFetch(`/api/events/${event._id}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      setStatus({ key, joined: true, error: "" });
      toast.success(
        result.alreadyJoined
          ? "You’re already part of this gathering."
          : "You’re on the list. See you there!",
      );
    } catch (error) {
      toast.error(error.message);
      if (error.status === 401) {
        await refetch();
        router.push(returnPath);
      } else setStatus({ key, joined: false, error: error.message });
    } finally {
      setBusy(false);
      submitting.current = false;
    }
  }

  if (ended)
    return (
      <div className="join-ended">
        <Check size={18} />
        <p>
          This gathering has already started.
          <Link href="/upcoming-events">
            Find your next good deed <ArrowUpRight size={14} />
          </Link>
        </p>
      </div>
    );
  if (isPending)
    return (
      <button className="button join-event-button" disabled>
        <LoaderCircle size={17} className="spin" /> Checking your account…
      </button>
    );
  if (accountError)
    return (
      <button className="button join-event-button" onClick={() => refetch()}>
        <RefreshCw size={16} /> Retry account
      </button>
    );
  if (!user)
    return (
      <>
        <Link className="button join-event-button" href={returnPath}>
          Log in to join <ArrowUpRight size={18} />
        </Link>
        <p className="join-help">A little time. A place for you.</p>
      </>
    );
  if (status.key !== key)
    return (
      <button className="button join-event-button" disabled>
        <LoaderCircle size={17} className="spin" /> Checking your place…
      </button>
    );
  if (status.error)
    return (
      <div className="join-error" role="alert">
        <p>{status.error}</p>
        <button
          className="text-link"
          onClick={() => setAttempt((value) => value + 1)}
        >
          <RefreshCw size={15} /> Try again
        </button>
      </div>
    );
  if (status.joined)
    return (
      <div className="join-confirmed" role="status">
        <Check size={21} />
        <div>
          <strong>You’re on the list.</strong>
          <p>Make a little room in your calendar. We’re glad you’re coming.</p>
        </div>
      </div>
    );
  return (
    <>
      <button
        className="button join-event-button"
        disabled={busy}
        onClick={join}
      >
        {busy ? "Joining…" : "Join Event"}
        {busy ? (
          <LoaderCircle size={18} className="spin" />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </button>
      <p className="join-help">Every pair of hands matters. Yours too.</p>
    </>
  );
}
