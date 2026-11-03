"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Pencil,
  RefreshCw,
  Sprout,
  Trash2,
} from "lucide-react";
import useApiData from "@/lib/use-api-data";
import { formatEventDate } from "@/lib/events";
import MemberNavigation from "./MemberNavigation";
import EventCard from "./EventCard";
import EventImage from "./EventImage";
import EventSkeleton from "./EventSkeleton";
import DeleteEventDialog from "./DeleteEventDialog";

export default function MemberEvents({ mode }) {
  const managing = mode === "manage";
  const { data, error, loading, retry } = useApiData(
    managing ? "/api/events/mine" : "/api/events/joined",
    { authenticated: true },
  );
  const [filter, setFilter] = useState("all");
  const [deleting, setDeleting] = useState(null);
  const events = data?.events || [];
  const visible = events.filter(
    (event) =>
      filter === "all" ||
      (filter === "past" ? event.hasStarted : !event.hasStarted),
  );

  return (
    <main className="container member-events-page">
      <MemberNavigation current={mode} />
      <div className="upcoming-heading">
        <div className="event-page-heading">
          <div className="eyebrow">
            <i />
            {managing ? "MANAGE EVENTS" : "JOINED EVENTS"}
          </div>
          <h1>
            {managing ? (
              <>
                Your ideas.
                <br />
                <em>Your events.</em>
              </>
            ) : (
              <>
                The good you’re
                <br />
                <em>part of.</em>
              </>
            )}
          </h1>
          <p>
            {managing
              ? "Everything you’ve brought to the community. Update the plan, check the details, or remove an event you no longer need."
              : "The gatherings you’ve joined, in date order. Open an event for the latest time, place and details."}
          </p>
        </div>
        <Link
          className="button"
          href={managing ? "/create-event" : "/upcoming-events"}
        >
          {managing ? "Create Event" : "Explore events"}
          <ArrowUpRight size={17} />
        </Link>
      </div>
      {!loading && !error && events.length > 0 && (
        <div
          className="member-event-filters"
          role="group"
          aria-label="Filter your events"
        >
          {[
            ["all", "All"],
            ["upcoming", "Upcoming"],
            ["past", "Past"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={filter === value ? "selected" : ""}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
              <span>
                {
                  events.filter(
                    (event) =>
                      value === "all" ||
                      (value === "past" ? event.hasStarted : !event.hasStarted),
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
      )}
      {loading ? (
        <EventSkeleton count={3} />
      ) : error ? (
        <div className="events-empty" role="alert">
          <h2>Let’s try that again.</h2>
          <p>{error.message}</p>
          <button className="button" onClick={retry}>
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      ) : !visible.length ? (
        <div className="events-empty">
          <Sprout size={35} strokeWidth={1.3} />
          <h2>
            {events.length
              ? "No events in this view."
              : managing
                ? "Your first good idea starts here."
                : "There’s a place waiting for you."}
          </h2>
          <p>
            {events.length
              ? "Choose another view to see the rest of your events."
              : managing
                ? "Create an event and it will appear here, ready for you to edit or delete."
                : "Find a gathering you care about and join it. Your own events are kept under Manage Events."}
          </p>
          {events.length ? (
            <button className="text-link" onClick={() => setFilter("all")}>
              Show all events <ArrowUpRight size={17} />
            </button>
          ) : (
            <Link
              className="text-link"
              href={managing ? "/create-event" : "/upcoming-events"}
            >
              {managing ? "Create your first event" : "Find an event"}
              <ArrowUpRight size={17} />
            </Link>
          )}
        </div>
      ) : managing ? (
        <div className="managed-events">
          {visible.map((event) => (
            <article className="managed-event" key={event._id}>
              <Link
                className="managed-event-photo"
                href={`/events/${event._id}`}
                aria-label={`View ${event.title}`}
              >
                <EventImage src={event.thumbnailUrl} title={event.title} />
              </Link>
              <div className="managed-event-info">
                <div className="managed-event-labels">
                  <span className="cause-label">{event.eventType}</span>
                  <span
                    className={`event-status ${event.hasStarted ? "past" : ""}`}
                  >
                    {event.hasStarted ? "Past event" : "Upcoming"}
                  </span>
                </div>
                <h2>
                  <Link href={`/events/${event._id}`}>{event.title}</Link>
                </h2>
                <p>
                  <MapPin size={14} />
                  {event.location}
                </p>
                <p>
                  <CalendarDays size={14} />
                  <time dateTime={event.eventDate}>
                    {formatEventDate(event.eventDate)}
                  </time>
                </p>
              </div>
              <div className="managed-event-actions">
                <Link
                  className="button small"
                  href={`/manage-events/${event._id}/edit`}
                  aria-label={`Edit ${event.title}`}
                >
                  <Pencil size={15} />
                  Edit
                </Link>
                <button
                  className="delete-event-trigger"
                  onClick={() => setDeleting(event)}
                  aria-label={`Delete ${event.title}`}
                >
                  <Trash2 size={15} />
                  Delete
                </button>
                <Link className="text-link" href={`/events/${event._id}`}>
                  View Event <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="events-grid live-events-grid">
          {visible.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
      {deleting && (
        <DeleteEventDialog event={deleting} onClose={() => setDeleting(null)} />
      )}
    </main>
  );
}
