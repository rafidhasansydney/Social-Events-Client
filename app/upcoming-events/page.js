import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UpcomingEvents from "@/components/UpcomingEvents";

export const metadata = { title: "Upcoming events | Bandhan" };

export default function UpcomingEventsPage() {
  return (
    <>
      <Header />
      <UpcomingEvents />
      <Footer />
    </>
  );
}
