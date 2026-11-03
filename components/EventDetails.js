"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Link2,
  MapPin,
  RefreshCw,
  Sprout,
} from "lucide-react";
import toast from "react-hot-toast";
import usePublicData from "@/lib/use-public-data";
import { formatEventDate } from "@/lib/events";
import EventImage from "./EventImage";
import EventSkeleton from "./EventSkeleton";
import JoinEvent from "./JoinEvent";

export default function EventDetails({ id }) {
  const { data, error, loading, retry } = usePublicData(
    `/api/events/${encodeURIComponent(id)}`,
  );
  const [expiredFor, setExpiredFor] = useState(null);
  useEffect(() => {
    if (!data?.event) return;
    const date = data.event.eventDate;
    let timer;
    function checkDate() {
      const remaining = new Date(date).getTime() - Date.now();
      if (remaining <= 0) setExpiredFor(date);
      else timer = setTimeout(checkDate, Math.min(remaining, 2_147_483_647));
    }
    timer = setTimeout(checkDate, 0);
    return () => clearTimeout(timer);
  }, [data]);
  if (loading) return <EventSkeleton detail />;
  if (error)
    return (
      <main className="container event-details-page">
        <div className="events-empty" role="alert">
          <Sprout size={32} strokeWidth={1.3} />
          <h1>
            {error.status === 404
              ? "This gathering isn’t here."
              : "Let’s try that again."}
          </h1>
          <p>
            {error.status === 404
              ? "The link may be incorrect, or the event may have been removed. There’s still plenty of good to discover."
              : error.message}
          </p>
          {error.status !== 404 && (
            <button className="button" onClick={retry}>
              <RefreshCw size={16} /> Try again
            </button>
          )}
          <Link href="/upcoming-events" className="text-link">
            Explore upcoming events <ArrowUpRight size={17} />
          </Link>
        </div>
      </main>
    );
  const event = data.event;
  const date = new Date(event.eventDate);
  const ended = Boolean(data.hasStarted || expiredFor === event.eventDate);

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied. Good things are better together.");
    } catch {
      toast.error(
        "Copy the address from your browser to share this gathering.",
      );
    }
  }

  return (
    <main className="container event-details-page">
      <div className="detail-navigation">
        <Link className="event-back" href="/upcoming-events">
          <ArrowLeft size={15} /> All upcoming events
        </Link>
        <button className="text-link" onClick={share}>
          <Link2 size={16} /> Copy link
        </button>
      </div>
      <div className="detail-heading">
        <div className="eyebrow">
          <i /> {ended ? "A MOMENT SHARED" : "A LITTLE TIME. A LITTLE GOOD."}
        </div>
        <span className="cause-label">{event.eventType}</span>
        <h1>{event.title}</h1>
        <div className="detail-summary">
          <p>
            <MapPin size={16} />
            {event.location}
          </p>
          <p>
            <CalendarDays size={16} />
            <time dateTime={event.eventDate}>
              {formatEventDate(event.eventDate)}
            </time>
          </p>
        </div>
      </div>
      <div className="detail-hero">
        <EventImage
          key={event.thumbnailUrl}
          src={event.thumbnailUrl}
          title={event.title}
        />
      </div>
      <div className="detail-layout">
        <section className="detail-story" aria-labelledby="about-event">
          <div className="eyebrow">THE GOOD WE CAN DO TOGETHER</div>
          <h2 id="about-event">About this gathering.</h2>
          <p className="event-description">{event.description}</p>
          <div className="detail-kindness">
            <Sprout size={27} strokeWidth={1.3} />
            <p>
              A little time from each of us can mean a lot to the place we call
              home.
            </p>
          </div>
        </section>
        <aside className="detail-invitation" aria-label="Event invitation">
          <div className="eyebrow">
            {ended ? "THIS GATHERING" : "MAKE A LITTLE ROOM"}
          </div>
          <h2>{ended ? "A moment of good." : "There’s a place for you."}</h2>
          <div className="invitation-detail">
            <CalendarDays size={19} />
            <div>
              <span>WHEN</span>
              <time dateTime={event.eventDate}>
                {date.toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <small>
                <Clock3 size={12} />
                {date.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                · Your local time
              </small>
            </div>
          </div>
          <div className="invitation-detail">
            <MapPin size={19} />
            <div>
              <span>WHERE</span>
              <p>{event.location}</p>
            </div>
          </div>
          <JoinEvent key={event._id} event={event} ended={ended} />
        </aside>
      </div>
    </main>
  );
}
