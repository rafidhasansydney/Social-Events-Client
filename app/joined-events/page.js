import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireAuth from "@/components/RequireAuth";
import MemberEvents from "@/components/MemberEvents";

export const metadata = { title: "Joined Events | Bandhan" };

export default function JoinedEventsPage() {
  return (
    <>
      <Header />
      <RequireAuth>
        <MemberEvents mode="joined" />
      </RequireAuth>
      <Footer />
    </>
  );
}
