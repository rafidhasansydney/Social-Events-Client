"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bell,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Recycle,
  Shirt,
  ShieldCheck,
  TreePine,
  TrendingUp,
  Users,
} from "lucide-react";
import Footer from "@/components/Footer";

const palette = {
  accent: "#10b981",
  accent2: "#f59e0b",
  ink: "#0b1f16",
  display: "'Fraunces', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
};

function useCountUp(target, start, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}

function Stat({ target, suffix, label, start }) {
  const value = useCountUp(target, start);

  return (
    <div style={{ textAlign: "center", minWidth: 120 }}>
      <p
        style={{
          fontFamily: palette.display,
          fontSize: 30,
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1,
          margin: 0,
        }}
      >
        {value.toLocaleString()}
        <span style={{ color: palette.accent }}>{suffix}</span>
      </p>
      <p
        style={{
          fontSize: 12.5,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.65)",
          margin: "8px 0 0",
        }}
      >
        {label}
      </p>
    </div>
  );
}

const lineReveal = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: "0%",
    transition: { delay: 0.25 + i * 0.14, duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.55 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const steps = [
  {
    icon: CalendarPlus,
    title: "Create your event",
    text: "Post a clothes drive, a cleanup or a plantation day in minutes — add the details, set the date, done.",
  },
  {
    icon: Users,
    title: "Volunteers join in",
    text: "People nearby discover your event and join with a single click. Every join is saved and tracked.",
  },
  {
    icon: HeartHandshake,
    title: "Change happens",
    text: "Show up together, serve the community and watch your impact grow event by event.",
  },
];

const marqueeItems = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Health",
  "Food Drive",
  "Community",
  "Volunteering",
];

const galleryImages = [
  { src: "/images/cleanup.png", caption: "Riverbank cleanup at dawn" },
  { src: "/images/plantation.png", caption: "Planting hope together" },
  { src: "/images/schoolkit.png", caption: "Backpacks and big smiles" },
  { src: "/images/impact.png", caption: "Warm meals, warmer hearts" },
];

const features = [
  {
    icon: CalendarCheck,
    title: "Easy event creation",
    text: "Set up a cleanup drive, a clothes distribution or a plantation day in a couple of minutes.",
  },
  {
    icon: Users,
    title: "Join as a volunteer",
    text: "Browse events around you and join the causes you care about with a single click.",
  },
  {
    icon: MapPin,
    title: "Find events nearby",
    text: "Every event carries its location and date, so you always know where and when to show up.",
  },
  {
    icon: ShieldCheck,
    title: "Secure and trusted",
    text: "JWT-protected accounts keep your data safe and only you can edit the events you create.",
  },
  {
    icon: TrendingUp,
    title: "Track your impact",
    text: "See every event you organized or joined in one place and watch your contribution grow.",
  },
  {
    icon: Bell,
    title: "Stay updated",
    text: "Subscribe to the newsletter and never miss a new community service opportunity.",
  },
];

const demoEvents = [
  {
    title: "Winter Clothes Distribution",
    type: "Donation",
    location: "Mirpur 10, Dhaka",
    date: "12 Dec 2026",
    icon: Shirt,
    colors: ["#38bdf8", "#0ea5e9"],
  },
  {
    title: "Buriganga River Cleanup",
    type: "Cleanup",
    location: "Keraniganj, Dhaka",
    date: "18 Dec 2026",
    icon: Recycle,
    colors: ["#34d399", "#10b981"],
  },
  {
    title: "Tree Plantation Drive",
    type: "Plantation",
    location: "Dhanmondi, Dhaka",
    date: "22 Dec 2026",
    icon: TreePine,
    colors: ["#a3e635", "#65a30d"],
  },
  {
    title: "Iftar Boxes for Street Children",
    type: "Food Drive",
    location: "Old Dhaka",
    date: "05 Mar 2027",
    icon: HeartHandshake,
    colors: ["#fbbf24", "#f59e0b"],
  },
  {
    title: "Free Blood Donation Camp",
    type: "Health",
    location: "Uttara, Dhaka",
    date: "28 Dec 2026",
    icon: HeartPulse,
    colors: ["#fb7185", "#f43f5e"],
  },
  {
    title: "School Kit Distribution",
    type: "Education",
    location: "Kamrangirchar, Dhaka",
    date: "09 Jan 2027",
    icon: BookOpen,
    colors: ["#a78bfa", "#8b5cf6"],
  },
];

export default function Home() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div style={{ fontFamily: palette.body, background: "#081511" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes kenburns { from { transform: scale(1.14); } to { transform: scale(1); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,.55); }
          70% { box-shadow: 0 0 0 9px rgba(16,185,129,0); }
        }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .hero-img { animation: kenburns 9s cubic-bezier(.2,.6,.3,1) both; }
        .pulse-dot { animation: pulseDot 2.2s infinite; }
        .float-y { animation: floatY 5s ease-in-out infinite; }
        .marquee-track {
          display: flex; gap: 56px; width: max-content;
          animation: marquee 26s linear infinite;
          animation-delay: 1.2s;
        }
        .nav-link { position: relative; color: rgba(255,255,255,.78); font-size: 14.5px; font-weight: 500; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -6px; height: 2px; width: 0;
          background: ${palette.accent}; border-radius: 2px; transition: width .25s ease;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }
        .btn-primary {
          background: ${palette.accent}; color: #04150e;
          box-shadow: 0 12px 34px -10px rgba(16,185,129,.75);
          transition: transform .22s ease, box-shadow .22s ease;
        }
        .btn-primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 18px 44px -10px rgba(16,185,129,.85); }
        .btn-glass {
          background: rgba(255,255,255,.08); color: #fff;
          border: 1px solid rgba(255,255,255,.28);
          backdrop-filter: blur(10px);
          transition: transform .22s ease, background .22s ease;
        }
        .btn-glass:hover { transform: translateY(-2px); background: rgba(255,255,255,.16); }
        .nav-burger {
          display: none; width: 42px; height: 42px; border-radius: 12px;
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.24);
          backdrop-filter: blur(10px); place-items: center; cursor: pointer;
        }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-burger { display: grid; }
        }
        @media (max-width: 640px) {
          .hero-stats {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            width: 100% !important;
            gap: 18px 6px !important;
            padding: 20px !important;
          }
          .nav-login { padding: 9px 16px !important; font-size: 13.5px !important; }
        }
        .hiw-card {
          background: #fff; border: 1px solid rgba(19,42,31,.08); border-radius: 20px;
          padding: 30px 26px; position: relative; overflow: hidden;
          transition: transform .28s ease, box-shadow .28s ease;
        }
        .hiw-card:hover { transform: translateY(-6px); box-shadow: 0 22px 48px -22px rgba(19,42,31,.28); }
        .hiw-num {
          position: absolute; top: -26px; right: 2px; line-height: 1;
          font-family: ${palette.display}; font-style: italic; font-weight: 700;
          font-size: 108px; color: rgba(19,42,31,.055); pointer-events: none;
        }
        .feature-card {
          background: #fff; border: 1px solid rgba(19,42,31,.08); border-radius: 18px;
          padding: 24px 22px;
          transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 40px -20px rgba(19,42,31,.25);
          border-color: rgba(16,185,129,.35);
        }
        .event-card {
          background: #0f2419; border: 1px solid rgba(255,255,255,.09); border-radius: 18px;
          overflow: hidden; display: flex; flex-direction: column;
          transition: transform .28s ease, border-color .28s ease;
        }
        .event-card:hover {
          transform: translateY(-6px);
          border-color: rgba(16,185,129,.45);
        }
        .nl-input {
          flex: 1; min-width: 220px; padding: 14px 18px; border-radius: 12;
          border: 1.5px solid #d8ddd5; font-size: 15px; outline: none;
          font-family: inherit; transition: border-color .2s ease;
          background: #fff; color: #132a1f;
        }
        .nl-input:focus { border-color: #10b981; }
        .gallery-item {
          position: relative; overflow: hidden; border-radius: 18px; aspect-ratio: 4/3;
        }
        .gallery-item img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .5s cubic-bezier(.22,1,.36,1);
        }
        .gallery-item:hover img { transform: scale(1.07); }
        .gallery-caption {
          position: absolute; left: 12px; bottom: 12px;
          padding: 6px 14px; border-radius: 999;
          background: rgba(4,14,10,.55); backdrop-filter: blur(8px);
          color: #fff; font-size: 12.5; font-weight: 500;
          opacity: 0; transform: translateY(6px);
          transition: opacity .3s ease, transform .3s ease;
        }
        .gallery-item:hover .gallery-caption { opacity: 1; transform: translateY(0); }
        @media (max-width: 560px) {
          .nl-form { flex-direction: column; }
          .nl-input { min-width: 0; }
        }
      `}</style>

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          padding: "26px clamp(20px, 5vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${palette.accent}, ${palette.accent2})`,
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21v-8" />
              <path d="M12 13C8.7 13 6.3 10.6 6.3 7.2 9.7 7.2 12 9.6 12 13Z" />
              <path d="M12 10.8C12 7.5 14.4 5.1 17.7 5.1 17.7 8.5 15.3 10.8 12 10.8Z" />
            </svg>
          </span>
          <span
            style={{
              fontFamily: palette.display,
              fontWeight: 700,
              fontSize: 24,
              color: "#fff",
              letterSpacing: "-.02em",
            }}
          >
            Bandhan
          </span>
        </div>

        <nav className="nav-links" style={{ display: "flex", gap: 30, alignItems: "center" }}>
          <span className="nav-link">Home</span>
          <span className="nav-link">Upcoming Events</span>
          <span className="nav-link">About</span>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            className="btn-glass nav-login"
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 14.5,
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            type="button"
            className="nav-burger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d={menuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(6,17,12,.94)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,.12)",
              padding: "14px 24px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {["Home", "Upcoming Events", "About"].map((label) => (
              <span
                key={label}
                className="nav-link"
                style={{ padding: "12px 4px", fontSize: 16, color: "#fff" }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </span>
            ))}
            <button
              className="btn-glass"
              style={{
                marginTop: 12,
                padding: "12px 0",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </button>
          </motion.div>
        )}
      </motion.header>

      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/hero.png"
          alt="Volunteers distributing warm blankets and winter clothes on a sunlit Dhaka street"
          className="hero-img"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(4,14,10,.82) 2%, rgba(4,14,10,.25) 45%, rgba(4,14,10,.4) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(100deg, rgba(4,14,10,.55) 0%, rgba(4,14,10,.22) 46%, rgba(4,14,10,0) 75%)",
          }}
        />

        <div
          className="float-y"
          style={{
            position: "absolute",
            right: "8%",
            top: "18%",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(16,185,129,.35), transparent 65%)`,
            filter: "blur(30px)",
          }}
        />
        <div
          className="float-y"
          style={{
            position: "absolute",
            right: "22%",
            bottom: "12%",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(245,158,11,.28), transparent 65%)`,
            filter: "blur(26px)",
            animationDelay: "1.6s",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "140px clamp(20px, 5vw, 64px) 120px",
          }}
        >
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="show" style={{ marginBottom: 26 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,.09)",
                border: "1px solid rgba(255,255,255,.22)",
                backdropFilter: "blur(8px)",
                color: "#e6fff4",
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: ".02em",
              }}
            >
              <span
                className="pulse-dot"
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 99,
                  background: palette.accent,
                  display: "inline-block",
                }}
              />
              1,200+ volunteers already on board
            </span>
          </motion.div>

          <h1
            style={{
              fontFamily: palette.display,
              fontWeight: 700,
              fontSize: "clamp(46px, 7.5vw, 92px)",
              lineHeight: 1.02,
              letterSpacing: "-.025em",
              color: "#fff",
              margin: 0,
            }}
          >
            <span style={{ display: "block", overflow: "hidden", padding: "0.06em 0" }}>
              <motion.span
                variants={lineReveal}
                custom={0}
                initial="hidden"
                animate="show"
                style={{ display: "block" }}
              >
                Small hands.
              </motion.span>
            </span>
            <span style={{ display: "block", overflow: "hidden", padding: "0.06em 0" }}>
              <motion.span
                variants={lineReveal}
                custom={1}
                initial="hidden"
                animate="show"
                style={{ display: "block" }}
              >
                <span style={{ fontStyle: "italic", color: palette.accent }}>Huge</span> hearts.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            style={{
              marginTop: 26,
              maxWidth: 520,
              fontSize: 17,
              lineHeight: 1.75,
              color: "rgba(255,255,255,.82)",
            }}
          >
            Bandhan is where communities come together — create a social service
            event, invite volunteers and track the change you make, one event
            at a time.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            style={{ display: "flex", gap: 16, marginTop: 34, flexWrap: "wrap", alignItems: "center" }}
          >
            <button
              className="btn-primary"
              style={{
                padding: "15px 30px",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 15.5,
                border: "none",
                cursor: "pointer",
              }}
            >
              Explore Events →
            </button>
            <button
              className="btn-glass"
              style={{
                padding: "15px 28px",
                borderRadius: 14,
                fontWeight: 600,
                fontSize: 15.5,
                cursor: "pointer",
              }}
            >
              Create an Event
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: 8 }}>
              <div style={{ display: "flex" }}>
                {[
                  ["AR", "#f59e0b"],
                  ["SK", "#10b981"],
                  ["MJ", "#38bdf8"],
                  ["TA", "#fb7185"],
                ].map(([initials, color], i) => (
                  <span
                    key={initials}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 99,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: "#fff",
                      background: color,
                      border: "2px solid rgba(8,21,17,.9)",
                      marginLeft: i === 0 ? 0 : -10,
                    }}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.75)" }}>
                joined this month
              </span>
            </div>
          </motion.div>

          <motion.div
            ref={statsRef}
            className="hero-stats"
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="show"
            style={{
              marginTop: 64,
              display: "flex",
              gap: "clamp(24px, 5vw, 72px)",
              flexWrap: "wrap",
              padding: "26px clamp(24px, 4vw, 48px)",
              borderRadius: 22,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.16)",
              backdropFilter: "blur(14px)",
              width: "fit-content",
            }}
          >
            <Stat target={50} suffix="+" label="Events Organized" start={statsInView} />
            <Stat target={1200} suffix="+" label="Volunteers Joined" start={statsInView} />
            <Stat target={30} suffix="+" label="Communities Served" start={statsInView} />
            <Stat target={8500} suffix="+" label="Lives Touched" start={statsInView} />
          </motion.div>
        </div>
      </section>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.1)",
          borderBottom: "1px solid rgba(255,255,255,.1)",
          background: "#0b1f16",
          padding: "20px 0",
          overflow: "hidden",
        }}
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} style={{ display: "flex", gap: 56, flexShrink: 0 }}>
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 56,
                    fontFamily: palette.display,
                    fontSize: 21,
                    fontWeight: 600,
                    color: "rgba(255,255,255,.75)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                  <span style={{ color: palette.accent, fontSize: 15 }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.14 } },
        }}
        style={{
          background: "#faf8f2",
          padding: "clamp(72px, 10vw, 110px) clamp(20px, 5vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div
            variants={reveal}
            style={{ textAlign: "center", marginBottom: "clamp(44px, 6vw, 68px)" }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(16,185,129,.12)",
                color: "#0c7a5a",
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              How it works
            </span>
            <h2
              style={{
                fontFamily: palette.display,
                fontWeight: 700,
                fontSize: "clamp(32px, 4.5vw, 52px)",
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                color: "#132a1f",
                margin: 0,
              }}
            >
              Three steps to a{" "}
              <span style={{ fontStyle: "italic", color: palette.accent }}>
                better tomorrow
              </span>
            </h2>
            <p
              style={{
                marginTop: 16,
                fontSize: 16.5,
                lineHeight: 1.7,
                color: "rgba(19,42,31,.65)",
                maxWidth: 460,
                marginInline: "auto",
              }}
            >
              From an idea to real impact — the whole journey takes minutes.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} variants={reveal} className="hiw-card">
                  <span className="hiw-num">0{i + 1}</span>
                  <span
                    style={{
                      position: "relative",
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: `linear-gradient(135deg, ${palette.accent}, ${palette.accent2})`,
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      marginBottom: 20,
                      boxShadow: "0 12px 26px -12px rgba(16,185,129,.6)",
                    }}
                  >
                    <Icon size={24} strokeWidth={2.1} />
                  </span>
                  <h3
                    style={{
                      fontFamily: palette.display,
                      fontWeight: 700,
                      fontSize: 21,
                      color: "#132a1f",
                      margin: "0 0 10px",
                      letterSpacing: "-.01em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.7,
                      color: "rgba(19,42,31,.65)",
                      margin: 0,
                    }}
                  >
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        style={{
          background: "#ffffff",
          padding: "clamp(72px, 10vw, 110px) clamp(20px, 5vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div variants={reveal} style={{ textAlign: "center", marginBottom: "clamp(44px, 6vw, 64px)" }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(16,185,129,.12)",
                color: "#0c7a5a",
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Features
            </span>
            <h2
              style={{
                fontFamily: palette.display,
                fontWeight: 700,
                fontSize: "clamp(32px, 4.5vw, 52px)",
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                color: "#132a1f",
                margin: 0,
              }}
            >
              Everything you need{" "}
              <span style={{ fontStyle: "italic", color: palette.accent }}>to serve</span>
            </h2>
            <p
              style={{
                marginTop: 16,
                fontSize: 16.5,
                lineHeight: 1.7,
                color: "rgba(19,42,31,.65)",
                maxWidth: 480,
                marginInline: "auto",
              }}
            >
              Built for organizers and volunteers who want to make a real
              difference in their community.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} variants={reveal} className="feature-card">
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 13,
                      background: "rgba(16,185,129,.1)",
                      color: palette.accent,
                      display: "grid",
                      placeItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Icon size={21} strokeWidth={2.1} />
                  </span>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: "#132a1f",
                      margin: "0 0 8px",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "rgba(19,42,31,.62)",
                      margin: 0,
                    }}
                  >
                    {feature.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="events"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        style={{
          background: "#0b1f16",
          padding: "clamp(72px, 10vw, 110px) clamp(20px, 5vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div variants={reveal} style={{ textAlign: "center", marginBottom: "clamp(44px, 6vw, 64px)" }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(16,185,129,.16)",
                color: "#4ade80",
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Get involved
            </span>
            <h2
              style={{
                fontFamily: palette.display,
                fontWeight: 700,
                fontSize: "clamp(32px, 4.5vw, 52px)",
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                color: "#fff",
                margin: 0,
              }}
            >
              Recent{" "}
              <span style={{ fontStyle: "italic", color: palette.accent }}>upcoming events</span>
            </h2>
            <p
              style={{
                marginTop: 16,
                fontSize: 16.5,
                lineHeight: 1.7,
                color: "rgba(255,255,255,.6)",
                maxWidth: 480,
                marginInline: "auto",
              }}
            >
              The six most recent events added by organizers. Join one and be
              part of the change.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gap: 22,
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            }}
          >
            {demoEvents.map((event) => {
              const Icon = event.icon;
              return (
                <motion.div key={event.title} variants={reveal} className="event-card">
                  <div
                    style={{
                      height: 170,
                      background: `linear-gradient(135deg, ${event.colors[0]}, ${event.colors[1]})`,
                      display: "grid",
                      placeItems: "center",
                      position: "relative",
                    }}
                  >
                    <Icon size={52} strokeWidth={1.6} color="rgba(255,255,255,.9)" />
                    <span
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        padding: "5px 12px",
                        borderRadius: 999,
                        background: "rgba(4,14,10,.5)",
                        backdropFilter: "blur(6px)",
                        color: "#fff",
                        fontSize: 11.5,
                        fontWeight: 600,
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: palette.display,
                        fontWeight: 700,
                        fontSize: 19,
                        color: "#fff",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {event.title}
                    </h3>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13.5,
                        color: "rgba(255,255,255,.62)",
                        margin: "4px 0 0",
                      }}
                    >
                      <MapPin size={14} color={palette.accent} /> {event.location}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13.5,
                        color: "rgba(255,255,255,.62)",
                        margin: 0,
                      }}
                    >
                      <CalendarDays size={14} color={palette.accent} /> {event.date}
                    </p>
                    <button
                      className="btn-glass"
                      style={{
                        marginTop: 14,
                        padding: "11px 0",
                        borderRadius: 11,
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      View Event
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={reveal} style={{ textAlign: "center", marginTop: 48 }}>
            <button
              className="btn-primary"
              style={{
                padding: "14px 30px",
                borderRadius: 13,
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
              }}
            >
              View All Events →
            </button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        style={{
          background: "#ffffff",
          padding: "clamp(72px, 10vw, 110px) clamp(20px, 5vw, 64px)",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gap: "clamp(36px, 5vw, 64px)",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            alignItems: "center",
          }}
        >
          <motion.div variants={reveal}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(245,158,11,.14)",
                color: "#b45309",
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Our impact
            </span>
            <h2
              style={{
                fontFamily: palette.display,
                fontWeight: 700,
                fontSize: "clamp(30px, 4vw, 46px)",
                letterSpacing: "-.02em",
                lineHeight: 1.15,
                color: "#132a1f",
                margin: "0 0 18px",
              }}
            >
              Change begins with people who{" "}
              <span style={{ fontStyle: "italic", color: palette.accent }}>show up</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "rgba(19,42,31,.66)",
                margin: "0 0 26px",
              }}
            >
              It doesn't take much — a blanket, a meal, an afternoon of your
              time. When neighbours show up for each other, small acts quietly
              turn into movements.
            </p>
            <button
              className="btn-primary"
              style={{
                padding: "14px 28px",
                borderRadius: 13,
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
              }}
            >
              Become a Volunteer →
            </button>
          </motion.div>

          <motion.div variants={reveal} style={{ position: "relative" }}>
            <img
              src="/images/impact.png"
              alt="Volunteers serving hot meals to elderly men in a village courtyard"
              style={{
                width: "100%",
                height: "clamp(320px, 40vw, 460px)",
                objectFit: "cover",
                borderRadius: 24,
                boxShadow: "0 30px 70px -30px rgba(19,42,31,.4)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "clamp(14px, 3vw, 28px)",
                bottom: -22,
                background: "#0b1f16",
                color: "#fff",
                borderRadius: 16,
                padding: "16px 22px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 18px 40px -18px rgba(19,42,31,.5)",
              }}
            >
              <TrendingUp size={20} color="#10b981" />
              <div>
                <p style={{ margin: 0, fontFamily: palette.display, fontWeight: 700, fontSize: 20 }}>
                  8,500+
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,.6)" }}>
                  lives touched so far
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        style={{
          background: "#faf8f2",
          padding: "clamp(72px, 10vw, 110px) clamp(20px, 5vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div variants={reveal} style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 60px)" }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(16,185,129,.12)",
                color: "#0c7a5a",
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Gallery
            </span>
            <h2
              style={{
                fontFamily: palette.display,
                fontWeight: 700,
                fontSize: "clamp(30px, 4vw, 48px)",
                letterSpacing: "-.02em",
                lineHeight: 1.12,
                color: "#132a1f",
                margin: 0,
              }}
            >
              Moments of{" "}
              <span style={{ fontStyle: "italic", color: palette.accent }}>change</span>
            </h2>
            <p
              style={{
                marginTop: 14,
                fontSize: 16,
                color: "rgba(19,42,31,.62)",
              }}
            >
              Glimpses from community service events powered by our volunteers.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gap: 18,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {galleryImages.map((photo) => (
              <motion.div key={photo.src} variants={reveal} className="gallery-item">
                <img src={photo.src} alt={photo.caption} loading="lazy" />
                <span className="gallery-caption">{photo.caption}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        style={{
          background: "#faf8f2",
          padding: "clamp(72px, 10vw, 110px) clamp(20px, 5vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div
            variants={reveal}
            style={{
              maxWidth: 720,
              margin: "0 auto",
              background: "#fff",
              border: "1px solid rgba(19,42,31,.08)",
              borderRadius: 24,
              padding: "clamp(34px, 5vw, 56px)",
              textAlign: "center",
              boxShadow: "0 24px 60px -30px rgba(19,42,31,.2)",
            }}
          >
            <span
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "rgba(16,185,129,.1)",
                color: palette.accent,
                display: "inline-grid",
                placeItems: "center",
                marginBottom: 18,
              }}
            >
              <Bell size={23} strokeWidth={2.1} />
            </span>
            <h2
              style={{
                fontFamily: palette.display,
                fontWeight: 700,
                fontSize: "clamp(26px, 3.5vw, 38px)",
                letterSpacing: "-.02em",
                color: "#132a1f",
                margin: "0 0 12px",
              }}
            >
              Get new events in your inbox
            </h2>
            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.7,
                color: "rgba(19,42,31,.62)",
                maxWidth: 420,
                margin: "0 auto 26px",
              }}
            >
              Subscribe to the newsletter and be the first to know when a new
              community service event is announced near you.
            </p>

            {subscribed ? (
              <p
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 22px",
                  borderRadius: 12,
                  background: "rgba(16,185,129,.1)",
                  color: "#0c7a5a",
                  fontWeight: 600,
                  fontSize: 15,
                  margin: 0,
                }}
              >
                ✓ Thanks for subscribing! We will keep you posted.
              </p>
            ) : (
              <form
                className="nl-form"
                style={{ display: "flex", gap: 12, maxWidth: 480, margin: "0 auto" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setSubscribed(true);
                }}
              >
                <input
                  className="nl-input"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: "14px 28px",
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 15,
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
