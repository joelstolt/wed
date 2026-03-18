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
  Heart,
  ChevronDown,
  Send,
  Check,
  Sparkles,
  Sun,
  CarFront,
  Shirt,
} from "lucide-react";
import Image from "next/image";

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
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-fuchsia/40 to-coral/40" />
      <Sparkles className="w-4 h-4 text-coral/60" />
      <div className="h-px w-16 bg-gradient-to-r from-coral/40 via-sunset/40 to-transparent" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   COUNTDOWN
   ───────────────────────────────────────────── */

function Countdown() {
  const targetDate = new Date("2026-09-05T16:00:00");

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
            <div className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-heading tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="font-sans text-[11px] tracking-[0.25em] uppercase text-muted mt-2">
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
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(226,61,128,0.12)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a
          href="#"
          className="font-display text-lg tracking-wide text-heading hover:text-fuchsia transition-colors"
        >
          N <span className="text-fuchsia">&</span> M
        </a>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] tracking-[0.15em] uppercase text-muted hover:text-fuchsia transition-colors hidden sm:block"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#osa"
            className="font-sans text-[12px] tracking-[0.2em] uppercase px-5 py-2 border border-fuchsia/40 text-fuchsia hover:bg-fuchsia hover:text-white transition-all duration-300 sm:hidden"
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
      {/* Background gradient — warm tropical */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush/40 via-cream to-cream" />

      {/* Decorative gradient circles */}
      <motion.div
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-fuchsia/10" />
      </motion.div>
      <motion.div
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-coral/[0.07]" />
      </motion.div>

      {/* Decorative warm glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sunset/10 via-coral/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-fuchsia/8 via-blush/5 to-transparent rounded-full blur-3xl" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-[11px] tracking-[0.35em] uppercase text-muted mb-8"
        >
          Vi gifter oss
        </motion.p>

        <h1 className="font-display font-light leading-[0.9] mb-6">
          <SplitText
            text="Natalie"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-heading block"
            delay={0.4}
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-body italic text-3xl sm:text-4xl md:text-5xl text-fuchsia inline-block my-4"
          >
            &
          </motion.span>
          <SplitText
            text="Markus"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-heading block"
            delay={1.0}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <Ornament className="mb-6" />
          <p className="font-body text-xl sm:text-2xl text-muted font-light tracking-wide">
            5 September 2026 — Gamla Uppsala
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
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted/60">
            Scrolla
          </span>
          <ChevronDown className="w-4 h-4 text-muted/60" />
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
    <section id="countdown" className="py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-muted mb-10">
            Nedräkning till den stora dagen
          </p>
        </Reveal>
        <Countdown />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURED PHOTO
   ───────────────────────────────────────────── */

function FeaturedPhoto() {
  return (
    <section className="py-20 bg-gradient-to-b from-cream via-blush/20 to-cream">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-sm overflow-hidden shadow-2xl shadow-fuchsia/10">
            <Image
              src="/images/photo-4.jpg"
              alt="Natalie och Markus"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-heading/20 via-transparent to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="text-center mt-10">
            <blockquote className="font-body text-2xl sm:text-3xl md:text-4xl font-light italic text-heading leading-relaxed">
              Jag visste att det var du, redan innan vi hade sagt ett ord till
              varandra.
            </blockquote>
            <Ornament className="mt-8" />
          </div>
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
    image: "/images/photo-2.jpg",
  },
  {
    year: "2020",
    title: "Första resan",
    description:
      "Vi packade bilen och körde till Toskana. Två veckor bland olivträd och solnedgångar — vi visste att det här var något speciellt.",
    image: null,
  },
  {
    year: "2022",
    title: "Vi flyttade ihop",
    description:
      "En liten lägenhet i Linnéstan blev vårt första gemensamma hem. Väggar fulla av konst, kök som alltid doftade gott och en balkong med utsikt.",
    image: "/images/photo-1.jpg",
  },
  {
    year: "2025",
    title: "Frieriet",
    description:
      "Under en promenad längs kusten i Båstad, med solnedgången som fond, ställde Markus frågan. Svaret var ett tveklöst ja — med tårar av glädje.",
    image: "/images/photo-5.jpg",
  },
];

function OurStory() {
  return (
    <section id="vår-historia" className="py-28 bg-cream">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-muted mb-4">
              Vår Historia
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-heading">
              Hur allt började
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Timeline line — warm gradient */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-fuchsia/25 to-transparent hidden md:block" />

          {storyEvents.map((event, i) => (
            <Reveal
              key={event.year}
              delay={i * 0.15}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <div
                className={`relative flex items-start mb-20 last:mb-0 ${
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
                  <span className="font-display text-5xl font-light text-fuchsia/30">
                    {event.year}
                  </span>
                  <h3 className="font-display text-2xl text-heading mt-2 mb-3">
                    {event.title}
                  </h3>
                  <p className="font-body text-lg text-muted font-light leading-relaxed">
                    {event.description}
                  </p>

                  {event.image && (
                    <div className="mt-6 relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg shadow-fuchsia/5 max-w-sm mx-auto md:mx-0 md:ml-auto">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  )}
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-fuchsia to-coral border-2 border-cream hidden md:block mt-4" />

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
   GALLERY
   ───────────────────────────────────────────── */

function GallerySection() {
  const images = [
    { src: "/images/photo-1.jpg", alt: "Natalie & Markus — Jul", aspect: "aspect-square" },
    { src: "/images/photo-3.jpg", alt: "Natalie & Markus — Tillsammans", aspect: "aspect-[3/4]" },
    { src: "/images/photo-5.jpg", alt: "Natalie & Markus — Med blomma", aspect: "aspect-square" },
    { src: "/images/photo-2.jpg", alt: "Natalie & Markus — Svartvit", aspect: "aspect-[3/4]" },
    { src: "/images/photo-4.jpg", alt: "Natalie & Markus — Kyss", aspect: "aspect-square" },
  ];

  return (
    <section className="py-28 bg-blush/20">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-muted mb-4">
              Minnen
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-heading">
              Bilder från vår resa
            </h2>
          </div>
        </Reveal>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className="relative overflow-hidden rounded-sm shadow-lg shadow-fuchsia/5 group break-inside-avoid"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={img.aspect === "aspect-square" ? 600 : 800}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Warm hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-fuchsia/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="text-center font-body text-muted font-light mt-10 text-lg italic">
            Fler bilder läggs till allt eftersom — håll utkik!
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WEDDING DETAILS
   ───────────────────────────────────────────── */

function WeddingDetails() {
  return (
    <section id="bröllopet" className="py-28 bg-wine text-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4">
              Bröllopet
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light">
              Dag & Plats
            </h2>
          </div>
        </Reveal>

        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.10] rounded-sm p-10 md:p-14 text-center">
              <Church className="w-10 h-10 text-blush mx-auto mb-6" strokeWidth={1.2} />
              <h3 className="font-display text-3xl md:text-4xl mb-2">Vigsel</h3>
              <div className="flex items-center justify-center gap-2 text-white/50 mb-6">
                <Calendar className="w-4 h-4" />
                <span className="font-sans text-[13px] tracking-[0.15em] uppercase">
                  5 September 2026
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-white/70">
                  <Clock className="w-4 h-4 text-blush/80" />
                  <span className="font-body text-xl">
                    Ceremonin börjar kl 16:00
                  </span>
                </div>
                <p className="font-body text-lg text-white/50">
                  Vi önskar att ni är på plats senast kl 15:30
                </p>
              </div>

              <div className="border-t border-white/10 pt-8">
                <p className="font-body text-xl font-medium text-blush mb-1">
                  Gamla Uppsala Kyrka
                </p>
                <p className="font-body text-base text-white/40 mb-1">
                  Disavägen 8
                </p>
                <p className="font-body text-base text-white/40">
                  754 40 Uppsala
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-white/40">
              <MapPin className="w-4 h-4" />
              <span className="font-sans text-[12px] tracking-[0.2em] uppercase">
                Gamla Uppsala Kyrka, Uppsala
              </span>
            </div>
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
      icon: Shirt,
      title: "Klädkod",
      description: "Sommarfint. Tänk elegant och ledigt — njut av sensommarkvällen i stil.",
    },
    {
      icon: CarFront,
      title: "Parkering",
      description:
        "Parkering finns längs gatan i direkt anslutning till kyrkan. Kom gärna i god tid.",
    },
    {
      icon: Sun,
      title: "Väder",
      description:
        "September i Uppsala kan bjuda på både sol och svalka. Ta med en sjal eller kavaj för kvällen.",
    },
    {
      icon: Heart,
      title: "Gåvor",
      description:
        "Er närvaro är den finaste gåvan. Önskas ändå bidra uppskattas en slant till bröllopsfonden.",
    },
  ];

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-muted mb-4">
              Bra att veta
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-heading">
              Praktisk Information
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="border-t border-fuchsia/15 pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-5 h-5 text-fuchsia/60" strokeWidth={1.5} />
                  <h3 className="font-display text-xl text-heading">
                    {item.title}
                  </h3>
                </div>
                <p className="font-body text-lg text-muted font-light leading-relaxed">
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
    "w-full bg-transparent border-b border-peach px-0 py-3 font-body text-lg text-heading placeholder:text-muted/40 focus:border-fuchsia transition-colors";
  const labelClasses =
    "font-sans text-[11px] tracking-[0.2em] uppercase text-muted block mb-2";

  return (
    <section id="osa" className="py-28 bg-blush/20">
      <div className="max-w-2xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-muted mb-4">
              Anmälan
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-heading mb-4">
              O.S.A.
            </h2>
            <p className="font-body text-xl text-muted font-light">
              Vänligen svara senast den 1 juli 2026
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
                className="w-20 h-20 rounded-full bg-sage/30 flex items-center justify-center mx-auto mb-8"
              >
                <Check className="w-10 h-10 text-wine" />
              </motion.div>
              <h3 className="font-display text-3xl text-heading mb-3">
                Tack för ditt svar!
              </h3>
              <p className="font-body text-xl text-muted font-light">
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
                            ? "border-fuchsia bg-fuchsia/10 text-heading"
                            : "border-peach text-muted hover:border-fuchsia/50"
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
                    className="group relative inline-flex items-center gap-3 font-sans text-[12px] tracking-[0.25em] uppercase px-12 py-4 bg-fuchsia text-white hover:bg-wine transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
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
   FOOTER
   ───────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="py-20 bg-heading text-white/60">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <p className="font-display text-4xl sm:text-5xl font-light text-white/90 mb-4">
            Natalie <span className="text-fuchsia">&</span> Markus
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-xl font-light mb-8">
            5 September 2026 — Gamla Uppsala Kyrka
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Ornament className="mb-8" />
        </Reveal>
        <Reveal delay={0.3}>
          <div className="space-y-1">
            <p className="font-body text-sm text-white/30">
              Frågor? Kontakta oss på{" "}
              <a
                href="mailto:natalie.markus2026@gmail.com"
                className="text-fuchsia/60 hover:text-fuchsia transition-colors underline underline-offset-4"
              >
                natalie.markus2026@gmail.com
              </a>
            </p>
            <p className="font-body text-xs text-white/20 mt-6">
              Med kärlek, N & M
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
      <FeaturedPhoto />
      <OurStory />
      <GallerySection />
      <WeddingDetails />
      <PracticalInfo />
      <RSVPForm />
      <Footer />
    </main>
  );
}
