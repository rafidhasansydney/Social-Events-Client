import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EventCollection from "./EventCollection";

export default function UpcomingEvents() {
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
      <EventCollection />
    </main>
  );
}
