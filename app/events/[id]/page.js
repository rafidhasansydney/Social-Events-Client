import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventDetails from "@/components/EventDetails";
import EventSkeleton from "@/components/EventSkeleton";

export const metadata = { title: "Event details | Bandhan" };

async function EventContent({ params }) {
  const { id } = await params;
  return <EventDetails id={id} />;
}

export default function EventPage({ params }) {
  return (
    <>
      <Header />
      <Suspense fallback={<EventSkeleton detail />}>
        <EventContent params={params} />
      </Suspense>
      <Footer />
    </>
  );
}
