import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireAuth from "@/components/RequireAuth";
import EditEvent from "@/components/EditEvent";
import EventSkeleton from "@/components/EventSkeleton";

export const metadata = { title: "Edit Event | Bandhan" };

export default function EditEventPage({ params }) {
  return (
    <>
      <Header />
      <Suspense fallback={<EventSkeleton detail />}>
        <RequireAuth>
          <EditEvent params={params} />
        </RequireAuth>
      </Suspense>
      <Footer />
    </>
  );
}
