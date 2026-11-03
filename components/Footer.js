import Link from "next/link";
import { ArrowUp, ArrowUpRight, Sprout } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link className="brand" href="/" aria-label="Bandhan home">
            <Sprout size={29} strokeWidth={1.5} />
            Bandhan<span>.</span>
          </Link>
          <p>
            A little time. A little kindness.
            <br />A stronger community.
          </p>
          <Link className="back-top" href="#" aria-label="Back to top">
            <ArrowUp size={21} />
          </Link>
        </div>
        <div className="footer-main">
          <div className="footer-message">
            <h2>
              Good starts
              <br />
              with <em>us.</em>
              <span>✳</span>
            </h2>
            <p>
              Find your people. Leave your mark.
              <br />
              Right here, where you belong.
            </p>
          </div>
          <div className="footer-links">
            <span>EXPLORE</span>
            <Link href="/upcoming-events">
              Find an event <ArrowUpRight size={14} />
            </Link>
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/#our-story">Our story</Link>
            <Link href="/#newsletter">Stay in the loop</Link>
          </div>
          <div className="footer-links">
            <span>TAKE PART</span>
            <Link href="/register">
              Join the community <ArrowUpRight size={14} />
            </Link>
            <Link href="/account">Your account</Link>
            <Link href="/create-event">Create an event</Link>
            <Link href="/manage-events">Manage your events</Link>
            <Link href="/joined-events">Your joined events</Link>
            <Link href="/login">Log in</Link>
          </div>
          <div className="footer-place">
            <span>OUR CORNER OF THE WORLD</span>
            <p>
              Bangladesh.
              <br />
              <em>And wherever kindness grows.</em>
            </p>
            <div>
              <i />
              Open hearts. Open doors.
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Bandhan. Made with care.</span>
          <span>For people. For community. For good.</span>
          <Link href="/#our-story">
            Let’s grow together <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
