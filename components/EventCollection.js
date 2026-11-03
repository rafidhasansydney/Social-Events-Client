"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, RefreshCw, Search, Sprout, X } from "lucide-react";
import { EVENT_TYPES } from "@/lib/events";
import usePublicData from "@/lib/use-public-data";
import EventCard from "./EventCard";
import EventSkeleton from "./EventSkeleton";

export default function EventCollection({ compact = false }) {
  const [category, setCategory] = useState("All events");
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const query = new URLSearchParams();
  if (compact) query.set("limit", "6");
  if (category !== "All events") query.set("type", category);
  if (search) query.set("q", search);
  const { data, error, loading, retry } = usePublicData(
    `/api/events${query.size ? `?${query}` : ""}`,
  );
  const events = data?.events || [];
  const filtered = category !== "All events" || Boolean(search);

  function clear() {
    setCategory("All events");
    setDraft("");
    setSearch("");
  }

  return (
    <div className="event-collection">
      {!compact && (
        <form
          className="event-search"
          onSubmit={(event) => {
            event.preventDefault();
            setSearch(draft.trim());
          }}
          role="search"
          aria-label="Search upcoming events"
        >
          <Search size={18} />
          <label className="sr-only" htmlFor="event-search">
            Search by event or location
          </label>
          <input
            id="event-search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={100}
            placeholder="Find a cause, a gathering, a neighbourhood…"
          />
          {draft && (
            <button
              type="button"
              className="search-clear"
              aria-label="Clear search"
              onClick={() => {
                setDraft("");
                setSearch("");
              }}
            >
              <X size={17} />
            </button>
          )}
          <button className="button small" type="submit">
            Search
          </button>
        </form>
      )}
      <div className="event-toolbar">
        <div
          className="category-tabs"
          role="group"
          aria-label="Filter events by cause"
        >
          {["All events", ...EVENT_TYPES].map((type) => (
            <button
              key={type}
              className={category === type ? "selected" : ""}
              aria-pressed={category === type}
              onClick={() => setCategory(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      {!loading && !error && events.length > 0 && (
        <div className="upcoming-count">
          <span className="event-count-copy">
            {events.length} {filtered ? "matching" : "upcoming"}{" "}
            {events.length === 1 ? "gathering" : "gatherings"}
            {compact ? " to explore" : ""}
          </span>
          <span>SOONEST FIRST</span>
        </div>
      )}
      {loading ? (
        <EventSkeleton />
      ) : error ? (
        <div className="events-empty" role="alert">
          <h2>Let’s try that again.</h2>
          <p>{error.message}</p>
          <button className="button" onClick={retry}>
            <RefreshCw size={16} /> Try again
          </button>
        </div>
      ) : !events.length ? (
        <div className="events-empty">
          <Sprout size={36} strokeWidth={1.3} />
          <h2>
            {filtered
              ? "A little further to look."
              : "The next good thing could start with you."}
          </h2>
          <p>
            {filtered
              ? "No upcoming gatherings match those filters. Try another cause or neighbourhood."
              : "No upcoming gatherings yet. Bring your first idea to the community."}
          </p>
          {filtered ? (
            <button className="text-link" onClick={clear}>
              Clear filters <ArrowUpRight size={17} />
            </button>
          ) : (
            <Link className="text-link" href="/create-event">
              Create an event <ArrowUpRight size={17} />
            </Link>
          )}
        </div>
      ) : (
        <div className="events-grid live-events-grid">
          {events.map((event) => (
            <EventCard key={event._id} event={event} compact={compact} />
          ))}
        </div>
      )}
      {compact && (
        <div className="collection-footer">
          <p>
            <i /> A few hours from you. A better day for someone else.
          </p>
          <Link href="/upcoming-events" className="text-link">
            All upcoming events <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
