"use client";

import { useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Providers";

const events = [
  {
    id: 1,
    title: "A little warmth. A lot of love.",
    type: "Donation",
    location: "Mirpur 10, Dhaka",
    day: "12",
    month: "DEC",
    image: "/images/hero.png",
    alt: "Volunteers sharing warm blankets with neighbours",
    description:
      "Help sort and distribute winter clothes and blankets. A few hours of your time can make the colder days a little easier for a family nearby.",
  },
  {
    id: 2,
    title: "A cleaner river starts with us.",
    type: "Cleanup",
    location: "Keraniganj, Dhaka",
    day: "18",
    month: "DEC",
    image: "/images/cleanup.png",
    alt: "Community volunteers cleaning a riverbank",
    description:
      "Spend a morning helping clean the riverbank. Bring a reusable water bottle, comfortable shoes and a willing pair of hands.",
  },
  {
    id: 3,
    title: "Leave something green behind.",
    type: "Plantation",
    location: "Dhanmondi, Dhaka",
    day: "22",
    month: "DEC",
    image: "/images/sapling.jpg",
    alt: "Hands holding a young green sapling",
    description:
      "Plant a sapling and help make our neighbourhood greener. Everyone is welcome, whether this is your first tree or your fiftieth.",
  },
  {
    id: 4,
    title: "A warm meal goes a long way.",
    type: "Donation",
    location: "Old Dhaka",
    day: "26",
    month: "DEC",
    image: "/images/impact.png",
    alt: "Volunteers serving meals to their community",
    description:
      "Join the team preparing and sharing fresh meals with neighbours. Help with packing, serving or simply making people feel welcome.",
  },
  {
    id: 5,
    title: "Make room for a greener city.",
    type: "Plantation",
    location: "Uttara, Dhaka",
    day: "28",
    month: "DEC",
    image: "/images/plantation.png",
    alt: "A group planting trees together",
    description:
      "Get your hands in the soil and plant trees in shared neighbourhood spaces. A morning well spent, with something lasting to show for it.",
  },
  {
    id: 6,
    title: "Small backpacks. Big beginnings.",
    type: "Education",
    location: "Kamrangirchar, Dhaka",
    day: "09",
    month: "JAN",
    image: "/images/schoolkit.png",
    alt: "Children receiving school supplies",
    description:
      "Help pack notebooks, pencils and school essentials for children getting ready for a new term. Give their next chapter a good start.",
  },
];
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
  const [category, setCategory] = useState("All events");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notice, setNotice] = useState("");
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const reduced = useReducedMotion();
  const visibleEvents =
    category === "All events"
      ? events
      : events.filter((event) => event.type === category);
  useEffect(() => {
    if (!selectedEvent) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleKey(event) {
      if (event.key === "Escape") setSelectedEvent(null);
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll("button, a[href]");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      openerRef.current?.focus();
    };
  }, [selectedEvent]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 5500);
    return () => clearTimeout(timer);
  }, [notice]);
  function accountNotice() {
    router.push(user ? "/create-event" : "/login?next=%2Fcreate-event");
  }
  function preview(event, target) {
    openerRef.current = target;
    setSelectedEvent(event);
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
          <div className="event-toolbar">
            <div
              className="category-tabs"
              role="group"
              aria-label="Filter events by cause"
            >
              {[
                "All events",
                "Cleanup",
                "Plantation",
                "Donation",
                "Education",
              ].map((item) => (
                <button
                  key={item}
                  className={category === item ? "selected" : ""}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                  {category === item && (
                    <span>
                      {item === "All events"
                        ? events.length
                        : events.filter((event) => event.type === item).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <span className="sample-label">A preview of what’s to come</span>
          </div>
          <motion.div layout={!reduced} className="events-grid">
            <AnimatePresence mode="popLayout">
              {visibleEvents.map((event) => (
                <motion.article
                  layout={!reduced}
                  key={event.id}
                  className="event-card"
                  initial={{ opacity: 0, y: reduced ? 0 : 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    className="event-image"
                    aria-label={`View ${event.title}`}
                    onClick={(e) => preview(event, e.currentTarget)}
                  >
                    <Image
                      src={event.image}
                      alt={event.alt}
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                    <span className="date-ticket">
                      <strong>{event.day}</strong>
                      {event.month}
                    </span>
                    <span
                      className={`event-category ${event.type.toLowerCase()}`}
                    >
                      {event.type}
                    </span>
                    <span className="image-arrow">
                      <ArrowUpRight size={22} />
                    </span>
                  </button>
                  <div className="event-body">
                    <p>
                      <MapPin size={13} />
                      {event.location}
                    </p>
                    <h3>
                      <button onClick={(e) => preview(event, e.currentTarget)}>
                        {event.title}
                      </button>
                    </h3>
                    <div className="event-bottom">
                      <span>Every pair of hands matters.</span>
                      <button
                        aria-label={`Explore ${event.title}`}
                        onClick={(e) => preview(event, e.currentTarget)}
                      >
                        <ArrowUpRight size={19} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="events-end">
            <i />A few hours from you. A better day for someone else.
          </p>
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
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedEvent(null);
            }}
          >
            <motion.section
              ref={dialogRef}
              className="event-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="event-dialog-title"
              initial={{ y: reduced ? 0 : 20 }}
              animate={{ y: 0 }}
            >
              <div className="dialog-image">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.alt}
                  fill
                  sizes="620px"
                />
                <button
                  ref={closeRef}
                  className="dialog-close"
                  aria-label="Close event preview"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X size={21} />
                </button>
              </div>
              <div className="dialog-body">
                <div className="eyebrow">
                  {selectedEvent.type} / EVENT PREVIEW
                </div>
                <h2 id="event-dialog-title">{selectedEvent.title}</h2>
                <p className="dialog-location">
                  <MapPin size={15} />
                  {selectedEvent.location} · {selectedEvent.day}{" "}
                  {selectedEvent.month}{" "}
                  {selectedEvent.month === "JAN" ? "2027" : "2026"}
                </p>
                <p>{selectedEvent.description}</p>
                <div className="dialog-note">
                  This is a sample event. Joining will be available when
                  registration opens.
                </div>
                <button
                  className="button"
                  onClick={() => setSelectedEvent(null)}
                >
                  Keep exploring <ArrowRight size={17} />
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
