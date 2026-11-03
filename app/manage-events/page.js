import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireAuth from "@/components/RequireAuth";
import MemberEvents from "@/components/MemberEvents";

export const metadata = { title: "Manage Events | Bandhan" };

export default function ManageEventsPage() {
  return (
    <>
      <Header />
      <RequireAuth>
        <MemberEvents mode="manage" />
      </RequireAuth>
      <Footer />
    </>
  );
}
