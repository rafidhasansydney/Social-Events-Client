"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ---------- palette (single place to tweak later) ---------- */
const palette = {
  accent: "#10b981", // emerald
  accent2: "#f59e0b", // amber
  ink: "#0b1f16", // deep forest for dark areas
  display: "'Fraunces', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
};

/* ---------- small count-up hook ---------- */
function useCountUp(target, start, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
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

/* ---------- entrance variants ---------- */
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

const MARQUEE_ITEMS = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Health",
  "Food Drive",
  "Community",
  "Volunteering",
];

export default function Home() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

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
      `}</style>

      {/* ================= NAVBAR ================= */}
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

        <nav style={{ display: "flex", gap: 30, alignItems: "center" }}>
          <span className="nav-link">Home</span>
          <span className="nav-link">Upcoming Events</span>
          <span className="nav-link">About</span>
        </nav>

        <button
          className="btn-glass"
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
      </motion.header>

      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* photo with slow zoom */}
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
        {/* layered gradients for readability */}
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

        {/* floating accent orbs */}
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

        {/* hero content */}
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
            Bandhan is where communities come together — create a social
            service event, invite volunteers and track the change you make,
            one event at a time.
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

            {/* social proof avatars */}
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

          {/* stats bar */}
          <motion.div
            ref={statsRef}
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

      {/* ================= MARQUEE STRIP ================= */}
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
              {MARQUEE_ITEMS.map((item) => (
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
    </div>
  );
}
