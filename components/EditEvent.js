"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import useApiData from "@/lib/use-api-data";
import EventForm from "./EventForm";
import EventSkeleton from "./EventSkeleton";
import MemberNavigation from "./MemberNavigation";

export default function EditEvent({ params }) {
  const { id } = use(params);
  const { data, loading, error, retry } = useApiData(
    `/api/events/${encodeURIComponent(id)}/manage`,
    { authenticated: true },
  );
  if (loading) return <EventSkeleton detail />;
  if (error)
    return (
      <main className="container member-events-page">
        <MemberNavigation current="manage" />
        <div className="events-empty" role="alert">
          <h1>
            {error.status === 403
              ? "This event belongs to someone else."
              : error.status === 404
                ? "This event isn’t here."
                : "Let’s try that again."}
          </h1>
          <p>{error.message}</p>
          {![403, 404].includes(error.status) && (
            <button className="button" onClick={retry}>
              <RefreshCw size={16} />
              Try again
            </button>
          )}
          <Link href="/manage-events" className="text-link">
            Back to your events <ArrowUpRight size={17} />
          </Link>
        </div>
      </main>
    );
  return (
    <EventForm
      key={`${data.event._id}:${data.event.updatedAt}`}
      eventToEdit={data.event}
    />
  );
}
