import Account from "@/components/Account";
import Header from "@/components/Header";
import RequireAuth from "@/components/RequireAuth";
import Footer from "@/components/Footer";

export const metadata = { title: "Your account | Bandhan" };

export default function AccountPage() {
  return (
    <>
      <Header />
      <RequireAuth>
        <Account />
      </RequireAuth>
      <Footer />
    </>
  );
}
