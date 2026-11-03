import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { formatEventDate } from "@/lib/events";
import EventImage from "./EventImage";

export default function EventCard({ event, compact = false }) {
  const Heading = compact ? "h3" : "h2";
  const href = `/events/${event._id}`;
  const date = new Date(event.eventDate);
  return (
    <article className="event-card live-event-card">
      <Link
        className="event-card-image-link"
        href={href}
        aria-label={`View ${event.title}`}
      >
        <EventImage
          key={event.thumbnailUrl}
          src={event.thumbnailUrl}
          title={event.title}
        />
        <span className="date-ticket">
          <strong>{date.getDate().toString().padStart(2, "0")}</strong>
          {date.toLocaleDateString("en-GB", { month: "short" }).toUpperCase()}
        </span>
      </Link>
      <div className="live-event-body">
        <span className="cause-label">{event.eventType}</span>
        <Heading>
          <Link href={href}>{event.title}</Link>
        </Heading>
        <p>
          <MapPin size={14} />
          <span>{event.location}</span>
        </p>
        <p>
          <CalendarDays size={14} />
          <time dateTime={event.eventDate}>
            {formatEventDate(event.eventDate)}
          </time>
        </p>
        <Link
          className="event-view-link"
          href={href}
          aria-label={`View event: ${event.title}`}
        >
          View Event <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
