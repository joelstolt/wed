"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  MapPin,
  Clock,
  Calendar,
  Church,
  Wine,
  Music,
  Heart,
  ChevronDown,
  Send,
  Check,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────
   ANIMATION HELPERS
   ───────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={char === " " ? "w-[0.3em]" : ""}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px w-16 bg-gold/40" />
      <Sparkles className="w-4 h-4 text-gold/60" />
      <div className="h-px w-16 bg-gold/40" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   COUNTDOWN
   ───────────────────────────────────────────── */

function Countdown() {
  const targetDate = new Date("2026-08-23T15:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Dagar", value: timeLeft.days },
    { label: "Timmar", value: timeLeft.hours },
    { label: "Minuter", value: timeLeft.minutes },
    { label: "Sekunder", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-6 sm:gap-10 justify-center">
      {units.map((unit, i) => (
        <Reveal key={unit.label} delay={i * 0.1}>
          <div className="text-center">
            <div className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="font-sans text-[11px] tracking-[0.25em] uppercase text-warm-gray mt-2">
              {unit.label}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV
   ───────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#vår-historia", label: "Vår Historia" },
    { href: "#bröllopet", label: "Bröllopet" },
    { href: "#osa", label: "OSA" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(184,148,90,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a
          href="#"
          className="font-display text-lg tracking-wide text-charcoal hover:text-gold transition-colors"
        >
          N <span className="text-gold">&</span> M
        </a>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] tracking-[0.15em] uppercase text-warm-gray hover:text-gold transition-colors hidden sm:block"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#osa"
            className="font-sans text-[12px] tracking-[0.2em] uppercase px-5 py-2 border border-gold/40 text-gold hover:bg-gold hover:text-ivory transition-all duration-300 sm:hidden"
          >
            OSA
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-ivory" />

      {/* Decorative circles */}
      <motion.div
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-gold/10" />
      </motion.div>
      <motion.div
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-gold/[0.07]" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-[11px] tracking-[0.35em] uppercase text-warm-gray mb-8"
        >
          Vi gifter oss
        </motion.p>

        <h1 className="font-display font-light leading-[0.9] mb-6">
          <SplitText
            text="Natalie"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-charcoal block"
            delay={0.4}
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-body italic text-3xl sm:text-4xl md:text-5xl text-gold inline-block my-4"
          >
            &
          </motion.span>
          <SplitText
            text="Markus"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-charcoal block"
            delay={1.0}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <Ornament className="mb-6" />
          <p className="font-body text-xl sm:text-2xl text-warm-gray font-light tracking-wide">
            23 Augusti 2026 — Båstad
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            document
              .getElementById("countdown")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-light-gray">
            Scrolla
          </span>
          <ChevronDown className="w-4 h-4 text-light-gray" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COUNTDOWN SECTION
   ───────────────────────────────────────────── */

function CountdownSection() {
  return (
    <section id="countdown" className="py-28 bg-ivory">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-warm-gray mb-10">
            Nedräkning till den stora dagen
          </p>
        </Reveal>
        <Countdown />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   QUOTE
   ───────────────────────────────────────────── */

function QuoteSection() {
  return (
    <section className="py-28 bg-cream/50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <div className="relative">
            <span className="font-display text-8xl text-gold/20 absolute -top-10 left-1/2 -translate-x-1/2">
              &ldquo;
            </span>
            <blockquote className="font-body text-2xl sm:text-3xl md:text-4xl font-light italic text-charcoal leading-relaxed pt-8">
              Jag visste att det var du, redan innan vi hade sagt ett ord till
              varandra.
            </blockquote>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <Ornament className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   OUR STORY
   ───────────────────────────────────────────── */

const storyEvents = [
  {
    year: "2019",
    title: "Vi träffades",
    description:
      "En slumpmässig kväll på en takterrass i Göteborg förändrade allt. Våra blickar möttes över en grupp vänner, och samtalet som följde tog aldrig slut.",
  },
  {
    year: "2020",
    title: "Första resan",
    description:
      "Vi packade bilen och körde till Toskana. Två veckor bland olivträd och solnedgångar — vi visste att det här var något speciellt.",
  },
  {
    year: "2022",
    title: "Vi flyttade ihop",
    description:
      "En liten lägenhet i Linnéstan blev vårt första gemensamma hem. Väggar fulla av konst, kök som alltid doftade gott och en balkong med utsikt.",
  },
  {
    year: "2025",
    title: "Frieriet",
    description:
      "Under en promenad längs kusten i Båstad, med solnedgången som fond, ställde Markus frågan. Svaret var ett tveklöst ja — med tårar av glädje.",
  },
];

function OurStory() {
  return (
    <section id="vår-historia" className="py-28 bg-ivory">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-warm-gray mb-4">
              Vår Historia
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal">
              Hur allt började
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block" />

          {storyEvents.map((event, i) => (
            <Reveal
              key={event.year}
              delay={i * 0.15}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <div
                className={`relative flex items-center mb-16 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
              >
                <div
                  className={`md:w-1/2 ${
                    i % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:pl-16 md:text-left"
                  } text-center md:text-inherit`}
                >
                  <span className="font-display text-5xl font-light text-gold/40">
                    {event.year}
                  </span>
                  <h3 className="font-display text-2xl text-charcoal mt-2 mb-3">
                    {event.title}
                  </h3>
                  <p className="font-body text-lg text-warm-gray font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold/60 border-2 border-ivory hidden md:block" />

                <div className="md:w-1/2" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WEDDING DETAILS
   ───────────────────────────────────────────── */

const details = [
  {
    icon: Church,
    title: "Vigsel",
    time: "15:00",
    location: "Norrvikens Trädgårdar",
    address: "Kattviksgatan 52, 269 71 Båstad",
    description:
      "Ceremonin hålls i den vackra Renässansträdgården. Vi samlas kl 14:30 för att ta plats.",
  },
  {
    icon: Wine,
    title: "Middag & Fest",
    time: "17:00",
    location: "Orangeriet, Norrviken",
    address: "Samma adress som vigselplatsen",
    description:
      "Mingel med champagne kl 17, trerätters middag kl 18. Därefter dans och firande in i natten.",
  },
  {
    icon: Music,
    title: "Kvällsfest",
    time: "21:00",
    location: "Orangeriet, Norrviken",
    address: "Samma plats — festen fortsätter!",
    description:
      "Liveband och DJ tar vid. Bar öppen till 02:00. Kvällsmat serveras kl 23.",
  },
];

function WeddingDetails() {
  return (
    <section id="bröllopet" className="py-28 bg-sage-deep text-ivory">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-ivory/50 mb-4">
              Bröllopet
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light">
              Dag & Plats
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {details.map((detail, i) => (
            <Reveal key={detail.title} delay={i * 0.15}>
              <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-sm p-8 text-center h-full hover:bg-white/[0.10] transition-colors duration-500">
                <detail.icon className="w-8 h-8 text-gold-light mx-auto mb-5" strokeWidth={1.2} />
                <h3 className="font-display text-2xl mb-1">{detail.title}</h3>
                <div className="flex items-center justify-center gap-2 text-ivory/50 mb-5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-sans text-[12px] tracking-[0.15em] uppercase">
                    {detail.time}
                  </span>
                </div>
                <p className="font-body text-lg font-medium text-gold-light mb-1">
                  {detail.location}
                </p>
                <p className="font-body text-sm text-ivory/40 mb-5">
                  {detail.address}
                </p>
                <p className="font-body text-base text-ivory/70 font-light leading-relaxed">
                  {detail.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-ivory/40">
              <MapPin className="w-4 h-4" />
              <span className="font-sans text-[12px] tracking-[0.2em] uppercase">
                Norrvikens Trädgårdar, Båstad
              </span>
            </div>
            <p className="font-body text-ivory/50 mt-3 font-light">
              Parkering finns på området. Båstad station ligger 5 min bort med
              taxi.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRACTICAL INFO
   ───────────────────────────────────────────── */

function PracticalInfo() {
  const items = [
    {
      title: "Klädkod",
      description: "Kavaj. Tänk elegant sommar — ljusa toner uppmuntras.",
    },
    {
      title: "Boende",
      description:
        "Vi har förhandlat priser på Hotel Skansen och Torekov Hotell. Ange kod NM2026.",
    },
    {
      title: "Gåvor",
      description:
        "Er närvaro är den finaste gåvan. Önskas ändå bidra uppskattas en slant till bröllopsfonden.",
    },
    {
      title: "Transport",
      description:
        "Bussar avgår kl 14:00 från Båstad Centrum till Norrviken och tar er hem igen efter festen.",
    },
  ];

  return (
    <section className="py-28 bg-ivory">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-warm-gray mb-4">
              Bra att veta
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-charcoal">
              Praktisk Information
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="border-t border-gold/20 pt-6">
                <h3 className="font-display text-xl text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-lg text-warm-gray font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   RSVP FORM
   ───────────────────────────────────────────── */

function RSVPForm() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [attending, setAttending] = useState<string>("");
  const [guests, setGuests] = useState("1");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("sent");
  };

  const inputClasses =
    "w-full bg-transparent border-b border-champagne px-0 py-3 font-body text-lg text-charcoal placeholder:text-light-gray focus:border-gold transition-colors";
  const labelClasses =
    "font-sans text-[11px] tracking-[0.2em] uppercase text-warm-gray block mb-2";

  return (
    <section id="osa" className="py-28 bg-cream/50">
      <div className="max-w-2xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-warm-gray mb-4">
              Anmälan
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal mb-4">
              O.S.A.
            </h2>
            <p className="font-body text-xl text-warm-gray font-light">
              Vänligen svara senast den 1 juni 2026
            </p>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {formState === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-8"
              >
                <Check className="w-10 h-10 text-sage" />
              </motion.div>
              <h3 className="font-display text-3xl text-charcoal mb-3">
                Tack för ditt svar!
              </h3>
              <p className="font-body text-xl text-warm-gray font-light">
                Vi ser så mycket fram emot att fira med dig.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Reveal delay={0.1}>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClasses}>Förnamn</label>
                    <input
                      type="text"
                      required
                      placeholder="Ditt förnamn"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Efternamn</label>
                    <input
                      type="text"
                      required
                      placeholder="Ditt efternamn"
                      className={inputClasses}
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div>
                  <label className={labelClasses}>E-post</label>
                  <input
                    type="email"
                    required
                    placeholder="din@email.se"
                    className={inputClasses}
                  />
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div>
                  <label className={labelClasses}>Kommer du?</label>
                  <div className="flex gap-4 mt-3">
                    {[
                      { value: "yes", label: "Jag kommer gärna!" },
                      { value: "no", label: "Tyvärr kan jag inte" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAttending(option.value)}
                        className={`flex-1 py-4 px-6 border font-body text-lg transition-all duration-300 rounded-sm ${
                          attending === option.value
                            ? "border-gold bg-gold/10 text-charcoal"
                            : "border-champagne text-warm-gray hover:border-gold/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              <AnimatePresence>
                {attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-10 overflow-hidden"
                  >
                    <div>
                      <label className={labelClasses}>Antal gäster</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className={`${inputClasses} cursor-pointer`}
                      >
                        <option value="1">1 person</option>
                        <option value="2">2 personer</option>
                        <option value="3">3 personer</option>
                        <option value="4">4 personer</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClasses}>
                        Matpreferenser / Allergier
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Vegetariskt, glutenfritt, etc."
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        Låtönskningar till festen
                      </label>
                      <input
                        type="text"
                        placeholder="Vilken låt får dig att dansa?"
                        className={inputClasses}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Reveal delay={0.4}>
                <div>
                  <label className={labelClasses}>
                    Meddelande till brudparet
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Några ord till oss..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={!attending || formState === "sending"}
                    className="group relative inline-flex items-center gap-3 font-sans text-[12px] tracking-[0.25em] uppercase px-12 py-4 bg-charcoal text-ivory hover:bg-olive transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {formState === "sending" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Heart className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                    {formState === "sending" ? "Skickar..." : "Skicka svar"}
                  </button>
                </div>
              </Reveal>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GALLERY / MOOD SECTION
   ───────────────────────────────────────────── */

function GallerySection() {
  const images = [
    { aspect: "aspect-[3/4]", span: "row-span-2", bg: "bg-champagne/60" },
    { aspect: "aspect-square", span: "", bg: "bg-sage/20" },
    { aspect: "aspect-[4/3]", span: "", bg: "bg-gold/10" },
    { aspect: "aspect-[3/4]", span: "row-span-2", bg: "bg-cream" },
    { aspect: "aspect-square", span: "", bg: "bg-sage-deep/10" },
    { aspect: "aspect-[4/3]", span: "", bg: "bg-champagne/40" },
  ];

  return (
    <section className="py-28 bg-ivory">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-warm-gray mb-4">
              Minnen
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-charcoal">
              Bilder från vår resa
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
          {images.map((img, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className={`${img.aspect} ${img.span} ${img.bg} rounded-sm overflow-hidden relative group`}
              >
                {/* Placeholder with elegant overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                    <Heart
                      className="w-8 h-8 text-gold mx-auto mb-2"
                      strokeWidth={1}
                    />
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-warm-gray">
                      Foto {i + 1}
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="text-center font-body text-warm-gray font-light mt-10 text-lg italic">
            Fler bilder läggs till allt eftersom — håll utkik!
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="py-20 bg-charcoal text-ivory/60">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <p className="font-display text-4xl sm:text-5xl font-light text-ivory/90 mb-4">
            Natalie <span className="text-gold">&</span> Markus
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-xl font-light mb-8">
            23 Augusti 2026 — Norrvikens Trädgårdar, Båstad
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Ornament className="mb-8" />
        </Reveal>
        <Reveal delay={0.3}>
          <div className="space-y-1">
            <p className="font-body text-sm text-ivory/30">
              Frågor? Kontakta oss på{" "}
              <a
                href="mailto:natalie.markus2026@gmail.com"
                className="text-gold/60 hover:text-gold transition-colors underline underline-offset-4"
              >
                natalie.markus2026@gmail.com
              </a>
            </p>
            <p className="font-body text-xs text-ivory/20 mt-6">
              Med kärlek, N & M ♥
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function WeddingPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <CountdownSection />
      <QuoteSection />
      <OurStory />
      <GallerySection />
      <WeddingDetails />
      <PracticalInfo />
      <RSVPForm />
      <Footer />
    </main>
  );
}
