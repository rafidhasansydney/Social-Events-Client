import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireAuth from "@/components/RequireAuth";
import CreateEvent from "@/components/CreateEvent";

export const metadata = { title: "Create an event | Bandhan" };

export default function CreateEventPage() {
  return (
    <>
      <Header />
      <RequireAuth>
        <CreateEvent />
      </RequireAuth>
      <Footer />
    </>
  );
}
