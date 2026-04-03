"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   MENU
   ───────────────────────────────────────────── */

function Menu() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#vigsel", label: "Vigsel" },
    { href: "#middag", label: "Middag och fest" },
    { href: "#bra-att-veta", label: "Bra att veta" },
    { href: "#gavor", label: "Gåvor" },
    { href: "#tal", label: "Tal" },
    { href: "#osa", label: "OSA" },
    { href: "#era-bilder", label: "Era bilder" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-ivory border-b border-honeydew">
      <div className="max-w-3xl mx-auto px-5">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 py-4 text-charcoal"
        >
          <div className="flex flex-col gap-1">
            <span className="block w-6 h-0.5 bg-charcoal" />
            <span className="block w-6 h-0.5 bg-charcoal" />
            <span className="block w-6 h-0.5 bg-charcoal" />
          </div>
          <span className="font-sans text-sm tracking-[0.25em] uppercase">
            Meny
          </span>
        </button>
      </div>
      {open && (
        <div className="border-t border-honeydew bg-ivory">
          <div className="max-w-3xl mx-auto px-5 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-serif text-lg text-warm-gray hover:text-charcoal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative">
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
          <Image
            src="/images/hero.jpg"
            alt="Nathalie och Markus"
            fill
            className="object-cover object-top grayscale"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 sm:pb-16 text-white">
            <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-center leading-tight drop-shadow-lg">
              Nathalie
              <br />
              <span className="text-4xl sm:text-5xl md:text-6xl">+</span>{" "}
              Markus
            </h1>
            <p className="mt-4 font-sans text-xs sm:text-base tracking-[0.2em] uppercase drop-shadow-md">
              Gamla Uppsala Kyrka - 5/9 2026
            </p>
          </div>
        </div>
      </div>
    </section>
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
    { label: "dagar", value: timeLeft.days },
    { label: "timmar", value: timeLeft.hours },
    { label: "minuter", value: timeLeft.minutes },
    { label: "sekunder", value: timeLeft.seconds },
  ];

  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex justify-center gap-8 sm:gap-14">
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-light text-charcoal tabular-nums">
                {unit.value}
              </div>
              <div className="text-sm text-warm-gray mt-1">{unit.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADING
   ───────────────────────────────────────────── */

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-light text-charcoal text-center mb-8 tracking-wide"
      style={{ fontVariant: "small-caps" }}
    >
      {children}
    </h2>
  );
}

/* ─────────────────────────────────────────────
   VIGSEL
   ───────────────────────────────────────────── */

function Vigsel() {
  return (
    <section id="vigsel" className="py-12">
      <div className="max-w-3xl mx-auto px-5">
        <SectionHeading>Vigsel</SectionHeading>

        <div className="relative aspect-[3/2] rounded-sm overflow-hidden mb-8">
          <Image
            src="/images/church.jpg"
            alt="Gamla Uppsala Kyrka"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="bg-ivory rounded-sm p-6 sm:p-8 shadow-sm mb-6">
          <h3 className="text-xl sm:text-2xl font-medium text-charcoal mb-4">
            16:00 - Vigsel i Gamla Uppsala Kyrka
          </h3>
          <p className="text-lg text-warm-gray leading-relaxed mb-6">
            Klockan fyra börjar vår vigsel i Gamla uppsala kyrka. Kom gärna i
            god tid innan ceremonin. Parkering finns längst gatan upp mot kyrkan.
          </p>
          <p className="text-lg text-warm-gray">
            Adress: Disavägen 8, 754 40 Uppsala
          </p>
        </div>

        <div className="rounded-sm overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d17.6297!3d59.8983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465fcbf3e7328d0d%3A0x1234567890!2sGamla+Uppsala+kyrka!5e0!3m2!1ssv!2sse!4v1234567890"
            className="w-full h-[250px] block"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Gamla Uppsala Kyrka"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MIDDAG OCH FEST
   ───────────────────────────────────────────── */

function MiddagOchFest() {
  return (
    <section id="middag" className="py-12">
      <div className="max-w-3xl mx-auto px-5">
        <SectionHeading>Middag och fest</SectionHeading>

        <div className="relative aspect-[3/2] rounded-sm overflow-hidden mb-8">
          <Image
            src="/images/venue.jpg"
            alt="Kaplansgården"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="bg-ivory rounded-sm p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-medium text-charcoal mb-4">
            Middag och fest
          </h3>
          <p className="text-lg text-warm-gray leading-relaxed">
            Vi fortsätter sedan i Kaplansgården i anslutning till Kyrkan.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BRA ATT VETA
   ───────────────────────────────────────────── */

function BraAttVeta() {
  return (
    <section id="bra-att-veta" className="py-12">
      <div className="max-w-3xl mx-auto px-5">
        <SectionHeading>Bra att veta</SectionHeading>

        <div className="space-y-6">
          {/* Mat och dryck */}
          <div className="bg-ivory rounded-sm shadow-sm overflow-hidden">
            <div className="relative aspect-[3/2]">
              <Image
                src="/images/cake.jpg"
                alt="Mat och dryck"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-medium text-charcoal mb-3">
                Mat och dryck
              </h3>
              <p className="text-lg text-warm-gray leading-relaxed">
                Förrätt, buffé och bröllopstårta. Vi bjuder på dryck.
              </p>
            </div>
          </div>

          {/* Klädsel */}
          <div className="bg-ivory rounded-sm shadow-sm overflow-hidden">
            <div className="relative aspect-[3/2]">
              <Image
                src="/images/flowers.jpg"
                alt="Sommarfin klädsel"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-medium text-charcoal mb-3">
                Klädsel: Sommarfin
              </h3>
              <p className="text-lg text-warm-gray leading-relaxed">
                Vi önskar oss en härlig, somrig och festlig klädsel! Klänning,
                kjol, byxdress eller en lättare kostym - gärna i ljusa färger
                och bekvämt för en dag av kärlek och glädje.
              </p>
            </div>
          </div>

          {/* Barn */}
          <div className="bg-ivory rounded-sm shadow-sm overflow-hidden">
            <div className="relative aspect-[3/2]">
              <Image
                src="/images/children.jpg"
                alt="Barn"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-medium text-charcoal mb-3">Barn</h3>
              <p className="text-lg text-warm-gray leading-relaxed">
                Barn är välkomna både på vigseln och på festen efteråt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GÅVOR
   ───────────────────────────────────────────── */

function Gavor() {
  return (
    <section id="gavor" className="py-12">
      <div className="max-w-3xl mx-auto px-5">
        <SectionHeading>Gåvor</SectionHeading>

        <div className="bg-cream rounded-sm p-6 sm:p-8">
          <p className="text-lg text-warm-gray leading-relaxed mb-6">
            Er närvaro på vår bröllopsdag är den finaste gåvan vi kan få.
            För er som ändå önskar uppmärksamma dagen med en gåva blir vi
            väldigt glada för ett bidrag till vårt framtida hem och en
            kommande kontantinsats.
          </p>
          <p className="text-lg text-warm-gray">
            Vill ni bidra går det fint att swisha till: 079-337 51 81.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TAL
   ───────────────────────────────────────────── */

function Tal() {
  return (
    <section id="tal" className="py-12">
      <div className="max-w-3xl mx-auto px-5">
        <SectionHeading>Tal</SectionHeading>

        <div className="bg-ivory rounded-sm p-6 sm:p-8 shadow-sm">
          <p className="text-lg text-warm-gray leading-relaxed mb-6">
            Om du vill hålla tal, uppträda eller spexa får du gärna anmäla det
            nedan. Vi ser inte anmälan utan informationen skickas direkt till
            våra toastmasters Madelene och Joel.
          </p>
          <p className="text-lg text-warm-gray leading-relaxed mb-6">
            Vi har många härliga vänner och familjemedlemmar som är duktiga
            talare. Vi vill såklart höra alla så tänk på att hålla er relativt
            kort. 5 minuter brukar vara lagom.
          </p>
          <p className="text-lg text-warm-gray leading-relaxed mb-8">
            Har du frågor om tal och spex kan du mejla eller ringa våra
            toastmasters.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-lg font-semibold text-charcoal">
                Joel Stolt
              </p>
              <p className="text-warm-gray">joelstolt90@gmail.com</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-charcoal">
                Madelene Stolt
              </p>
              <p className="text-warm-gray">stolt.madelene@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   OSA
   ───────────────────────────────────────────── */

function OSA() {
  const [personCount, setPersonCount] = useState<number | null>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [names, setNames] = useState<string[]>([""]);
  const [allergies, setAllergies] = useState("");

  useEffect(() => {
    if (personCount !== null) {
      setNames((prev) => {
        const newNames = [...prev];
        while (newNames.length < personCount) newNames.push("");
        return newNames.slice(0, personCount);
      });
    }
  }, [personCount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const formData = {
      antal_personer: personCount,
      namn: names.filter(Boolean).join(", "),
      allergier: allergies || "Inga",
    };

    try {
      const res = await fetch("https://formspree.io/f/mzdkjpvy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("sent");
      } else {
        setFormState("idle");
        alert("Något gick fel. Försök igen.");
      }
    } catch {
      setFormState("idle");
      alert("Något gick fel. Försök igen.");
    }
  };

  return (
    <section id="osa" className="py-12">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="text-4xl sm:text-5xl font-light text-charcoal text-center mb-8">
          OSA
        </h2>

        {formState === "sent" ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">&#10003;</div>
            <h3 className="text-2xl text-charcoal mb-2">
              Tack för ditt svar!
            </h3>
            <p className="text-lg text-warm-gray">
              Vi ser fram emot att fira med dig.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-ivory rounded-sm p-6 sm:p-8 shadow-sm mb-8">
              <p className="text-lg text-warm-gray leading-relaxed mb-6">
                OSA i formuläret nedan senast den 30/4. Om du har frågor hör
                gärna av dig till vårt värdpar.
              </p>

              <p className="text-center text-lg text-warm-gray mb-4">
                Välj antalet personer att OSA för:
              </p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPersonCount(n)}
                    className={`w-12 h-12 text-lg font-medium rounded-sm transition-colors ${
                      personCount === n
                        ? "bg-papaya text-white"
                        : "bg-honeydew text-charcoal hover:bg-rosey"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {personCount !== null && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {names.map((name, i) => (
                  <div key={i}>
                    <label className="block text-sm text-warm-gray mb-1">
                      {personCount === 1
                        ? "Namn"
                        : `Person ${i + 1} - Namn`}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        const newNames = [...names];
                        newNames[i] = e.target.value;
                        setNames(newNames);
                      }}
                      placeholder="För- och efternamn"
                      className="w-full border border-honeydew rounded-sm px-4 py-3 text-lg text-charcoal placeholder:text-warm-gray/50"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm text-warm-gray mb-1">
                    Allergier / Matpreferenser
                  </label>
                  <textarea
                    rows={3}
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="Vegetariskt, glutenfritt, etc."
                    className="w-full border border-honeydew rounded-sm px-4 py-3 text-lg text-charcoal placeholder:text-warm-gray/50 resize-none"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="inline-block font-sans text-sm tracking-[0.15em] uppercase px-10 py-3 bg-papaya text-white hover:bg-blush transition-colors disabled:opacity-50 rounded-sm"
                  >
                    {formState === "sending" ? "Skickar..." : "Skicka OSA"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ERA BILDER
   ───────────────────────────────────────────── */

function EraBilder() {
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || files.length === 0) return;

      setUploading(true);
      setUploadCount(0);

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("upload_preset", "Bröllop_uppladdningar");
        formData.append("folder", "brollop");

        try {
          await fetch("https://api.cloudinary.com/v1_1/dqkqejzer/image/upload", {
            method: "POST",
            body: formData,
          });
          setUploadCount((prev) => prev + 1);
        } catch {
          // continue with next file
        }
      }
      setUploading(false);
    };
    input.click();
  };

  return (
    <section id="era-bilder" className="py-12">
      <div className="max-w-3xl mx-auto px-5">
        <SectionHeading>Era bilder</SectionHeading>

        <div className="bg-ivory rounded-sm p-6 sm:p-8 shadow-sm text-center">
          <p className="text-lg text-warm-gray leading-relaxed mb-6">
            Vi vore otroligt tacksamma om ni efter bröllopet ville dela med er
            av de bilder ni tagit. Ladda gärna upp dem här!
          </p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="inline-block font-sans text-sm tracking-[0.2em] uppercase px-10 py-3 bg-papaya text-white hover:bg-blush transition-colors rounded-sm disabled:opacity-50"
          >
            {uploading
              ? `Laddar upp (${uploadCount})...`
              : uploadCount > 0
              ? `${uploadCount} bilder uppladdade!`
              : "Ladda upp"}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function WeddingPage() {
  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(180deg, #FAF5EF 0%, #EDCB8E20 5%, #F49EBA25 15%, #EDCB8E20 25%, #F49EBA20 35%, #EDCB8E25 45%, #F49EBA30 55%, #EDCB8E20 65%, #F49EBA25 75%, #EDCB8E20 85%, #F49EBA15 95%, #FAF5EF 100%)" }}>
      <Menu />
      <Hero />
      <Countdown />
      <div className="h-px bg-honeydew max-w-3xl mx-auto" />
      <Vigsel />
      <MiddagOchFest />
      <BraAttVeta />
      <Gavor />
      <Tal />
      <OSA />
      <EraBilder />
    </main>
  );
}
