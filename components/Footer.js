import { ArrowUp, ArrowUpRight, Sprout } from "lucide-react";

export default function Footer({ onAccountClick }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <a className="brand" href="#" aria-label="Bandhan home">
            <Sprout size={29} strokeWidth={1.5} />
            Bandhan<span>.</span>
          </a>
          <p>
            A little time. A little kindness.
            <br />A stronger community.
          </p>
          <a className="back-top" href="#" aria-label="Back to top">
            <ArrowUp size={21} />
          </a>
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
            <a href="#events">
              Find an event <ArrowUpRight size={14} />
            </a>
            <a href="#how-it-works">How it works</a>
            <a href="#our-story">Our story</a>
            <a href="#newsletter">Stay in the loop</a>
          </div>
          <div className="footer-links">
            <span>TAKE PART</span>
            <button onClick={onAccountClick}>
              Create an event <ArrowUpRight size={14} />
            </button>
            <button onClick={onAccountClick}>Manage your events</button>
            <button onClick={onAccountClick}>Your joined events</button>
            <button onClick={onAccountClick}>Log in / Sign up</button>
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
          <a href="#our-story">
            Let’s grow together <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
