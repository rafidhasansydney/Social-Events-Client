"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  RefreshCw,
  Sprout,
} from "lucide-react";
import { formatEventDate } from "@/lib/events";
import EventImage from "./EventImage";

export default function UpcomingEvents() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/events", {
          signal: controller.signal,
          cache: "no-store",
        });
        const result = await response.json().catch(() => null);
        if (!result)
          throw new Error(
            "Events are temporarily unavailable. Please try again shortly.",
          );
        if (!response.ok)
          throw new Error(
            result.error?.message || "We couldn’t load the events.",
          );
        setEvents(result.events);
        setError("");
      } catch (error) {
        if (!controller.signal.aborted)
          setError(
            error instanceof TypeError
              ? "Check your connection and try again."
              : error.message,
          );
      }
    }
    load();
    return () => controller.abort();
  }, [attempt]);

  return (
    <main className="container upcoming-page">
      <div className="upcoming-heading">
        <div className="event-page-heading">
          <div className="eyebrow">
            <i /> GOOD THINGS, JUST AROUND THE CORNER
          </div>
          <h1>
            Make time for
            <br />
            <em>something good.</em>
          </h1>
          <p>
            Small gatherings. Shared purpose. Find an upcoming event and a
            reason to step outside.
          </p>
        </div>
        <Link className="button" href="/create-event">
          Start an event <ArrowUpRight size={18} />
        </Link>
      </div>
      {error ? (
        <div className="events-empty" role="alert">
          <h2>Let’s try that again.</h2>
          <p>{error}</p>
          <button
            className="button"
            onClick={() => {
              setError("");
              setAttempt((value) => value + 1);
            }}
          >
            <RefreshCw size={16} /> Try again
          </button>
        </div>
      ) : events === null ? (
        <div className="account-state" role="status">
          <span className="loading-ring" />
          <p>Finding good things near you…</p>
        </div>
      ) : events.length === 0 ? (
        <div className="events-empty">
          <Sprout size={37} strokeWidth={1.3} />
          <h2>
            The next good thing
            <br />
            could start with you.
          </h2>
          <p>
            No upcoming gatherings yet. Bring your first idea to the community.
          </p>
          <Link href="/create-event" className="text-link">
            Create the first event <ArrowUpRight size={17} />
          </Link>
        </div>
      ) : (
        <>
          <div className="upcoming-count">
            {events.length} upcoming{" "}
            {events.length === 1 ? "gathering" : "gatherings"}
            <span>SOONEST FIRST</span>
          </div>
          <div className="events-grid upcoming-grid">
            {events.map((event) => (
              <article key={event._id} className="event-card upcoming-card">
                <EventImage src={event.thumbnailUrl} title={event.title} />
                <div className="upcoming-card-body">
                  <span className="cause-label">{event.eventType}</span>
                  <h2>{event.title}</h2>
                  <p>
                    <MapPin size={15} />
                    <span>{event.location}</span>
                  </p>
                  <p>
                    <CalendarDays size={15} />
                    <time dateTime={event.eventDate}>
                      {formatEventDate(event.eventDate)}
                    </time>
                  </p>
                  <details>
                    <summary>About this gathering</summary>
                    <p>{event.description}</p>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
