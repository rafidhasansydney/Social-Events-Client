"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  MapPin,
  Sprout,
  Users,
  X,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import EventCollection from "@/components/EventCollection";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Providers";

const gallery = [
  {
    image: "/images/cleanup.png",
    title: "Many hands, one cleaner river.",
    label: "THE ENVIRONMENT",
  },
  {
    image: "/images/schoolkit.png",
    title: "A little help for a new beginning.",
    label: "THE NEXT GENERATION",
  },
  {
    image: "/images/plantation.png",
    title: "Good things take roots.",
    label: "A GREENER TOMORROW",
  },
  {
    image: "/images/impact.png",
    title: "More than a meal. A moment of care.",
    label: "OUR NEIGHBOURS",
  },
];
function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 5500);
    return () => clearTimeout(timer);
  }, [notice]);
  function accountNotice() {
    router.push(user ? "/create-event" : "/login?next=%2Fcreate-event");
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        Small acts. Stronger communities.{" "}
        <a href="#events">
          Find your next good deed <ArrowUpRight size={12} />
        </a>
      </div>
      <Header />
      <main id="main">
        <section className="hero container">
          <Reveal className="hero-copy">
            <div className="eyebrow">
              <i />
              GOOD PEOPLE. GOOD THINGS.
            </div>
            <h1>
              Small acts.
              <br />A <em>world</em> of
              <br />
              difference<span>.</span>
            </h1>
            <p>
              You don’t have to change the whole world.
              <br />
              Start with the community around you.
            </p>
            <div className="hero-actions">
              <a className="button" href="#events">
                Find your people <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#how-it-works">
                See how it works <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-footnote">
              <span aria-hidden="true">✳</span>
              <p>
                For the neighbours.
                <br />
                <strong>For the place we call home.</strong>
              </p>
            </div>
          </Reveal>
          <Reveal className="hero-visual" delay={0.12}>
            <div className="hero-photo">
              <Image
                src="/images/hero.png"
                alt="Neighbours in Dhaka sharing warm winter blankets"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                preload
              />
              <div className="photo-caption">
                <i />A little kindness, close to home.
                <span>DHAKA, BANGLADESH</span>
              </div>
            </div>
            <div className="hero-note">
              <Heart size={25} strokeWidth={1.3} />
              <div>
                Good things happen
                <br />
                <strong>when we show up.</strong>
              </div>
              <span aria-hidden="true">✳</span>
            </div>
            <div className="round-stamp" aria-hidden="true">
              <span>ROOTED IN COMMUNITY</span>
              <Sprout size={29} strokeWidth={1.3} />
              <span>GROWING TOGETHER</span>
            </div>
          </Reveal>
          <a className="hero-scroll" href="#events">
            <ArrowDown size={14} /> THERE’S A PLACE FOR YOU HERE
          </a>
        </section>
        <div className="cause-strip">
          <div className="container cause-inner">
            <p>
              Different causes.
              <br />
              <strong>The same big heart.</strong>
            </p>
            <div>
              <Leaf size={19} />A greener city
            </div>
            <span>✳</span>
            <div>
              <Heart size={19} />A kinder community
            </div>
            <span>✳</span>
            <div>
              <Users size={19} />A better tomorrow
            </div>
          </div>
        </div>
        <section className="section container" id="events">
          <Reveal className="section-heading">
            <div>
              <div className="eyebrow">01 / FIND YOUR NEXT GOOD DEED</div>
              <h2>
                Make your next
                <br />
                weekend <em>mean something.</em>
              </h2>
            </div>
            <p>
              A cleanup by the river. A tree in the ground.
              <br />
              Find a cause close to your heart, and close to home.
            </p>
          </Reveal>
          <EventCollection compact />
        </section>
        <section className="how-section" id="how-it-works">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <div className="eyebrow">
                  02 / FROM A LITTLE IDEA TO REAL CHANGE
                </div>
                <h2>
                  Big hearts.
                  <br />
                  <em>Simple beginnings.</em>
                </h2>
              </div>
              <p>
                No special skills. No grand gestures.
                <br />
                Just you, showing up for something good.
              </p>
            </Reveal>
            <div className="steps-grid">
              {[
                {
                  number: "01",
                  icon: MapPin,
                  title: "Find what moves you.",
                  text: "Browse local events and pick a cause that feels like yours. A greener street, a warmer winter, a child’s first school kit.",
                },
                {
                  number: "02",
                  icon: Users,
                  title: "Bring yourself along.",
                  text: "Choose your event, join the team and make a little room in your calendar. There’s always space for one more.",
                },
                {
                  number: "03",
                  icon: Sprout,
                  title: "Leave a little good behind.",
                  text: "Meet your neighbours. Lend a hand. Go home knowing your time made someone else’s day a little better.",
                },
              ].map((step, i) => (
                <Reveal className="step" key={step.number} delay={i * 0.08}>
                  <div className="step-top">
                    <span>{step.number}</span>
                    <step.icon size={26} strokeWidth={1.4} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="organizer-note">
              <p>
                <strong>Have an idea of your own?</strong> Bring people together
                for a cause you care about.
              </p>
              <button className="text-link" onClick={accountNotice}>
                Start something good <ArrowUpRight size={18} />
              </button>
            </Reveal>
          </div>
        </section>
        <section className="section container story-section" id="our-story">
          <Reveal className="story-images">
            <div className="story-main">
              <Image
                src="/images/community.jpg"
                alt="Children smiling and making peace signs together"
                fill
                sizes="(max-width: 760px) 100vw, 45vw"
              />
            </div>
            <div className="story-small">
              <Image
                src="/images/sapling.jpg"
                alt="A small sapling ready to take root"
                fill
                sizes="220px"
              />
            </div>
            <span>Small moments. Lasting meaning.</span>
          </Reveal>
          <Reveal className="story-copy">
            <div className="eyebrow">03 / A BOND THAT BRINGS US TOGETHER</div>
            <h2>
              Not strangers.
              <br />
              <em>Just neighbours</em>
              <br />
              we haven’t met.
            </h2>
            <p>
              Bandhan means a bond. The kind that forms when you share a
              morning, plant a tree together or hand someone a meal.
            </p>
            <p>
              We’re making it easier to find those moments. A place for people
              who believe a better community starts with caring for the person
              next to them.
            </p>
            <div className="story-signature">
              <Sprout size={28} strokeWidth={1.4} />
              <span>
                Made for the places we call home.
                <br />
                <strong>Rooted in Bangladesh. Open to everyone.</strong>
              </span>
            </div>
          </Reveal>
        </section>
        <section className="gallery-section">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <div className="eyebrow">
                  04 / THIS IS WHAT TOGETHER LOOKS LIKE
                </div>
                <h2>
                  A little less scrolling.
                  <br />
                  <em>A little more showing up.</em>
                </h2>
              </div>
              <div className="gallery-controls">
                <button
                  aria-label="Previous photographs"
                  onClick={() =>
                    setGalleryIndex(
                      (galleryIndex - 1 + gallery.length) % gallery.length,
                    )
                  }
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  aria-label="Next photographs"
                  onClick={() =>
                    setGalleryIndex((galleryIndex + 1) % gallery.length)
                  }
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </Reveal>
            <div className="gallery-grid">
              {[0, 1, 2].map((offset) => {
                const photo = gallery[(galleryIndex + offset) % gallery.length];
                return (
                  <div className={`gallery-photo photo-${offset}`} key={offset}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={photo.image}
                        className="gallery-image-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.25 }}
                      >
                        <Image
                          src={photo.image}
                          alt={photo.title}
                          fill
                          sizes="(max-width: 480px) 100vw, 40vw"
                        />
                        <div className="gallery-overlay">
                          <span>{photo.label}</span>
                          <h3>{photo.title}</h3>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <div className="gallery-pagination">
              {gallery.map((photo, i) => (
                <button
                  key={photo.image}
                  aria-label={`Show photograph ${i + 1}`}
                  aria-pressed={galleryIndex === i}
                  className={galleryIndex === i ? "current" : ""}
                  onClick={() => setGalleryIndex(i)}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="newsletter-section container" id="newsletter">
          <Reveal className="newsletter-panel">
            <div className="newsletter-art" aria-hidden="true">
              <ArrowUpRight />
              <span>
                Good things
                <br />
                are growing.
              </span>
              <Sprout />
            </div>
            <div className="newsletter-copy">
              <div className="eyebrow">A LITTLE GOOD IN YOUR INBOX</div>
              <h2>
                Stay close to
                <br />
                <em>what matters.</em>
              </h2>
              <p>
                Community stories and opportunities to lend a hand.
                <br />
                Leave your inbox a little kinder than you found it.
              </p>
              <form
                className="newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setNotice(
                    "Thanks for your interest. Newsletter subscriptions will open soon.",
                  );
                }}
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  Your email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  required
                  autoComplete="email"
                />
                <button type="submit" aria-label="Get newsletter updates">
                  <ArrowRight size={21} />
                </button>
              </form>
              <span className="newsletter-fineprint">
                An occasional note. Always something worth opening.
              </span>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <AnimatePresence>
        {notice && (
          <motion.div
            className="notice"
            role="status"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Check size={18} />
            <p>{notice}</p>
            <button
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <X size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
