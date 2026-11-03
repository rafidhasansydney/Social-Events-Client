import Link from "next/link";
import { ArrowUpRight, Signpost } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container section">
        <div className="events-empty">
          <Signpost size={36} strokeWidth={1.4} aria-hidden="true" />
          <span className="eyebrow">404 / A LITTLE OFF THE PATH</span>
          <h1>This page has moved on.</h1>
          <p>
            There’s still plenty of good to be part of. Find a gathering near
            you or head back to the community.
          </p>
          <Link href="/upcoming-events" className="button">
            Explore events <ArrowUpRight size={17} />
          </Link>
          <Link href="/" className="text-link">
            Back to the community
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
