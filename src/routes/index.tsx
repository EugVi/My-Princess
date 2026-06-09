import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One Day — For Frieda" },
      {
        name: "description",
        content:
          "A story about a girl who wanted peace. For Frieda, on her 16th birthday.",
      },
      { property: "og:title", content: "One Day" },
      { property: "og:description", content: "A story about a girl who wanted peace." },
    ],
  }),
  component: OneDayBook,
});

/* ─────────────────────────────────────────
   Stars — clickable, with secret messages
───────────────────────────────────────── */

function Stars({ count = 60 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.2 + 0.5,
        dur: 2.5 + Math.random() * 6,
        delay: Math.random() * 6,
        hue:
          Math.random() > 0.88
            ? "#C9A6FF"
            : Math.random() > 0.72
              ? "#7AB6FF"
              : Math.random() > 0.55
                ? "#E8C77A"
                : "#F8F7F2",
      })),
    [count],
  );

  const messages = useMemo(
    () => [
      "You were always the main character.",
      "Some people are worth writing books about.",
      "You are loved more than you realize.",
      "One day became today.",
      "You found a little reminder: you are seen.",
      "The stars have been watching over you.",
      "Every great story needed someone like you in it.",
    ],
    [],
  );

  const [revealed, setRevealed] = useState<string | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <button
          key={s.id}
          onClick={(e) => {
            e.stopPropagation();
            const msg = messages[s.id % messages.length];
            setRevealed(msg);
            setTimeout(() => setRevealed(null), 5500);
          }}
          className="star pointer-events-auto absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.hue,
            boxShadow: `0 0 ${s.size * 5}px ${s.hue}, 0 0 ${s.size * 14}px ${s.hue}44`,
            ["--dur" as string]: `${s.dur}s`,
            ["--delay" as string]: `${s.delay}s`,
          }}
          aria-label="A star"
        />
      ))}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 px-7 py-3.5 rounded-full paper text-xs sm:text-sm text-[var(--ink)] italic font-serif"
            style={{ boxShadow: "0 0 48px rgba(201,166,255,0.30)" }}
          >
            {revealed}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   Shooting Stars — appear on the cover
───────────────────────────────────────── */

function ShootingStars() {
  const shots = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        top: 5 + Math.random() * 40,
        left: 5 + Math.random() * 60,
        dur: 2.2 + Math.random() * 2,
        delay: 4 + i * 7 + Math.random() * 8,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shots.map((s) => (
        <span
          key={s.id}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            ["--dur" as string]: `${s.dur}s`,
            ["--delay" as string]: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Dust motes — golden + violet variants
───────────────────────────────────────── */

function Dust({ count = 22, purple = false }: { count?: number; purple?: boolean }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        bottom: -8 - Math.random() * 18,
        size: 1.4 + Math.random() * 2.8,
        dur: 20 + Math.random() * 24,
        delay: Math.random() * 26,
        dx: -55 + Math.random() * 110,
        op: 0.28 + Math.random() * 0.5,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m) => (
        <span
          key={m.id}
          className={purple ? "dust-purple" : "dust"}
          style={{
            left: `${m.left}%`,
            bottom: `${m.bottom}%`,
            width: m.size,
            height: m.size,
            ["--dur" as string]: `${m.dur}s`,
            ["--delay" as string]: `${m.delay}s`,
            ["--dx" as string]: `${m.dx}px`,
            ["--mo" as string]: `${m.op}`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Rain
───────────────────────────────────────── */

function Rain() {
  const drops = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        dur: 3.5 + Math.random() * 5,
        delay: Math.random() * 8,
        h: 16 + Math.random() * 48,
        op: 0.25 + Math.random() * 0.32,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((d) => (
        <span
          key={d.id}
          className="rain absolute w-px"
          style={{
            left: `${d.left}%`,
            height: d.h,
            opacity: d.op,
            background:
              "linear-gradient(to bottom, transparent, rgba(122,182,255,0.55), transparent)",
            ["--dur" as string]: `${d.dur}s`,
            ["--delay" as string]: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Secret — tappable word with hidden message
───────────────────────────────────────── */

function Secret({
  children,
  message,
  className = "",
}: {
  children: ReactNode;
  message: string;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        onClick={() => {
          setShow(true);
          setTimeout(() => setShow(false), 5200);
        }}
        className={`text-[var(--purple-soft)] underline decoration-dotted underline-offset-4 hover:text-[var(--gold)] transition-colors duration-500 ${className}`}
      >
        {children}
      </button>
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 -top-16 z-40 whitespace-normal w-72 text-center text-xs italic font-serif text-[var(--ink)] paper rounded-xl px-5 py-3.5"
            style={{ boxShadow: "0 0 50px rgba(201,166,255,0.35)" }}
          >
            {message}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ─────────────────────────────────────────
   Typewriter
───────────────────────────────────────── */

function Typewriter({
  text,
  speed = 52,
  className = "",
  delay = 300,
}: {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | null = null;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);
  return <span className={`${className} ${done ? "" : "caret"}`}>{shown}</span>;
}

/* ─────────────────────────────────────────
   Timed Whisper — appears after dwell
───────────────────────────────────────── */

function TimedWhisper({ message, after = 6000 }: { message: string; after?: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), after);
    return () => clearTimeout(t);
  }, [after]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed bottom-28 left-1/2 -translate-x-1/2 z-40 max-w-sm w-[88%] text-center"
        >
          <p className="font-serif italic text-sm sm:text-base text-[var(--purple-soft)] text-glow">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   Flourish divider
───────────────────────────────────────── */

function Flourish({ slim = false }: { slim?: boolean }) {
  return (
    <div className={`${slim ? "flourish-sm" : "flourish"} my-7 sm:my-10`} aria-hidden>
      <span className="glyph">{slim ? "· · ·" : "✦ ❦ ✦"}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Vintage Music Player
───────────────────────────────────────── */

const PLAYLIST = [
  {
    title: "2AM",
    artist: "SZA",
    src: "/audio/2am-sza.mp3",
    note: "For the nights when your thoughts refuse to sleep.",
  },
  {
    title: "Hopeless Romantic",
    artist: "KWN",
    src: "/audio/hopeless-romantic-kwn.mp3",
    note: "For the part of you that still believes love should feel deep.",
  },
  {
    title: "Broken Clocks",
    artist: "SZA",
    src: "/audio/broken-clocks-sza.mp3",
    note: "For the moments that feel unfinished, but still meaningful.",
  },
  {
    title: "Tides",
    artist: "Shekhinah",
    src: "/audio/tides-shekinah.mp3",
    note: "For emotions that come and go like waves.",
  },
  {
    title: "Love Me Slowly",
    artist: "Elaine",
    src: "/audio/love-me-slowly-elaine.mp3",
    note: "For the kind of love that does not rush what is real.",
  },
  {
    title: "Don't",
    artist: "Bryson Tiller",
    src: "/audio/dont-bryson-tiller.mp3",
    note: "For the feelings that are complicated but still honest.",
  },
  {
    title: "Exchange",
    artist: "Bryson Tiller",
    src: "/audio/exchange-bryson-tiller.mp3",
    note: "For memories that stay, even when time moves.",
  },
];

const TARGET_VOLUME = 0.28;

function fadeVolume(
  audio: HTMLAudioElement,
  to: number,
  ms: number,
  onDone?: () => void,
) {
  const from = audio.volume;
  const clampedTo = Math.max(0, Math.min(1, to));
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    const v = from + (clampedTo - from) * t;
    audio.volume = Math.max(0, Math.min(1, v));
    if (t < 1) requestAnimationFrame(step);
    else onDone?.();
  };
  requestAnimationFrame(step);
}

function MusicButton() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const current = PLAYLIST[track];

  useEffect(() => {
    const a = new Audio();
    a.preload = "none";
    a.volume = 0;
    a.crossOrigin = "anonymous";
    audioRef.current = a;
    const onEnded = () => setTrack((t) => (t + 1) % PLAYLIST.length);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("ended", onEnded);
      a.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const targetSrc = window.location.origin + current.src;
    if (a.src !== targetSrc) {
      const swap = () => {
        a.src = current.src;
        a.load();
        if (playing) {
          a.play().then(() => fadeVolume(a, TARGET_VOLUME, 1200)).catch(() => {});
        }
      };
      if (!a.paused) fadeVolume(a, 0, 400, swap);
      else swap();
      return;
    }
    if (playing) {
      a.play().then(() => fadeVolume(a, TARGET_VOLUME, 1200)).catch(() => {});
    } else {
      fadeVolume(a, 0, 600, () => a.pause());
    }
  }, [track, playing, current.src]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ index: number }>).detail;
      if (typeof detail?.index === "number") {
        setTrack(detail.index);
        setPlaying(true);
        setHasStarted(true);
      }
    };
    window.addEventListener("oneday:playtrack", handler);
    return () => window.removeEventListener("oneday:playtrack", handler);
  }, []);

  const start = () => {
    setPlaying(true);
    setHasStarted(true);
  };
  const toggle = () => {
    setPlaying((p) => !p);
    setHasStarted(true);
  };
  const next = () => {
    setTrack((t) => (t + 1) % PLAYLIST.length);
    setPlaying(true);
    setHasStarted(true);
  };
  const prev = () => {
    setTrack((t) => (t - 1 + PLAYLIST.length) % PLAYLIST.length);
    setPlaying(true);
    setHasStarted(true);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        onClick={() => {
          setOpen(true);
          if (!hasStarted) start();
        }}
        className="fixed bottom-5 right-5 z-50 paper rounded-full px-4 py-2.5 text-xs sm:text-sm font-serif italic text-[var(--ink)] hover:text-[var(--gold)] transition-colors shadow-[0_0_40px_rgba(168,85,247,0.18)] max-w-[78vw]"
        aria-label="Open music player"
      >
        <span className="inline-flex items-center gap-2.5 min-w-0">
          <span
            className="shrink-0 w-2 h-2 rounded-full bg-[var(--gold)]"
            style={playing ? { animation: "heartbeat 2s ease-in-out infinite" } : {}}
          />
          <span className="truncate">
            {hasStarted
              ? playing
                ? `Now playing · ${current.title}`
                : `Paused · ${current.title}`
              : "Play while reading"}
          </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/88 backdrop-blur-md flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 44, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 44, opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
              className="vintage-player max-w-sm w-full p-6 sm:p-8"
            >
              <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80 text-center font-display">
                Phonograph &middot; Side A
              </p>
              <div className="mt-5 flex items-center gap-5">
                <div className={`vinyl ${playing ? "spinning" : ""}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-serif italic text-xl text-[#f5e6c2] truncate text-glow-soft">
                    {current.title}
                  </p>
                  <p className="text-xs italic text-[#d8c89a]/70 mt-1 truncate">
                    {current.artist}
                  </p>
                  <p className="text-[10px] text-[#d8c89a]/55 italic mt-2 leading-snug">
                    {current.note}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between px-2">
                <button
                  onClick={prev}
                  aria-label="Previous track"
                  className="brass-knob hover:brightness-110 transition"
                />
                <button
                  onClick={toggle}
                  aria-label={playing ? "Pause" : "Play"}
                  className="brass-knob hover:brightness-110 transition"
                  style={{ width: 56, height: 56 }}
                >
                  <span className="sr-only">{playing ? "Pause" : "Play"}</span>
                </button>
                <button
                  onClick={next}
                  aria-label="Next track"
                  className="brass-knob hover:brightness-110 transition"
                />
              </div>
              <p className="mt-5 text-[10px] uppercase tracking-[0.4em] text-[#d8c89a]/55 text-center italic">
                {hasStarted
                  ? playing
                    ? "now playing"
                    : "paused"
                  : "tap play to begin"}
              </p>
              <div className="mt-5 max-h-40 overflow-y-auto pr-1">
                <ul className="divide-y divide-[#3a2a10]/50">
                  {PLAYLIST.map((s, i) => (
                    <li key={s.title}>
                      <button
                        onClick={() => {
                          setTrack(i);
                          setPlaying(true);
                          setHasStarted(true);
                        }}
                        className={`w-full flex items-baseline justify-between gap-4 py-2 text-left transition ${
                          i === track
                            ? "text-[var(--gold)]"
                            : "text-[#d8c89a]/80 hover:text-[#f5e6c2]"
                        }`}
                      >
                        <span className="font-serif italic text-sm truncate">{s.title}</span>
                        <span className="text-[10px] uppercase tracking-[0.25em] opacity-70 truncate">
                          {s.artist}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mt-5 w-full text-[10px] uppercase tracking-[0.44em] text-[#d8c89a]/60 hover:text-[#f5e6c2] transition-colors"
              >
                Close the lid
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────
   Soundtrack chapter
───────────────────────────────────────── */

function Soundtrack() {
  const playAt = (i: number) =>
    window.dispatchEvent(new CustomEvent("oneday:playtrack", { detail: { index: i } }));
  return (
    <PageShell chapterLabel="A Soundtrack" title="Songs to Read Her By">
      <P>Every story deserves its own music.</P>
      <P>
        These are the songs that hum quietly between the lines &mdash; the ones
        that sound like late nights, like soft hands, like the kind of love that
        lingers.
      </P>
      <Flourish />
      <div className="grid gap-3 pt-2">
        {PLAYLIST.map((s, i) => (
          <motion.button
            key={s.title}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 * i, duration: 0.65 }}
            whileHover={{ x: 7, transition: { duration: 0.22 } }}
            onClick={() => playAt(i)}
            className="paper rounded-xl p-5 flex items-start gap-4 text-left hover:border-[var(--gold)]/45 transition-colors group"
          >
            <span className="mt-1 text-[var(--gold)] text-lg" aria-hidden>
              &#9834;
            </span>
            <span className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-serif italic text-lg sm:text-xl text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors truncate">
                  {s.title}
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] shrink-0">
                  {s.artist}
                </p>
              </div>
              <p className="mt-2 text-sm italic font-serif text-[var(--muted)] leading-relaxed">
                {s.note}
              </p>
            </span>
          </motion.button>
        ))}
      </div>
      <p className="text-center text-[10px] uppercase tracking-[0.44em] text-[var(--gold)]/55 pt-6">
        tap any song to let it play while you read
      </p>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Page Shell — the book-page container
───────────────────────────────────────── */

function PageShell({
  children,
  variant = "default",
  chapterLabel,
  title,
  numeralLabel,
  extraBg,
}: {
  children: ReactNode;
  variant?: "default" | "dark" | "cover" | "final" | "hug" | "oneday";
  chapterLabel?: string;
  title?: ReactNode;
  numeralLabel?: string;
  extraBg?: ReactNode;
}) {
  const bg =
    variant === "dark"
      ? "bg-midnight"
      : variant === "cover"
        ? "bg-cover-velvet"
        : variant === "final"
          ? "bg-midnight"
          : variant === "hug"
            ? "bg-hug"
            : variant === "oneday"
              ? "bg-oneday"
              : "bg-library";

  const isFinal = variant === "final";

  return (
    <div
      className={`relative min-h-screen w-full ${bg} vignette flex flex-col items-center justify-center px-4 sm:px-8 py-24 overflow-hidden ${isFinal ? "serene final-still" : ""}`}
    >
      {/* fog transition */}
      <div className="fog-layer" aria-hidden />

      {/* ambient glows */}
      <div
        className="moon-glow"
        style={{ top: "-200px", left: "50%", transform: "translateX(-50%)" }}
      />
      {variant !== "dark" && (
        <div
          className="candle-glow"
          style={{ bottom: "-130px", right: "-90px" }}
        />
      )}

      {/* extra per-chapter atmosphere */}
      {extraBg}

      <Stars count={variant === "cover" || isFinal ? 110 : variant === "hug" ? 75 : 65} />
      <Dust count={variant === "dark" ? 12 : variant === "hug" ? 20 : 26} purple={variant === "oneday"} />
      {variant !== "dark" && <Dust count={8} purple />}
      {variant === "dark" && <Rain />}

      {/* decorative numeral behind everything */}
      {numeralLabel && (
        <div
          aria-hidden
          className="chapter-numeral pointer-events-none absolute"
          style={{ top: "16%", right: "-2%", opacity: 0.055, mixBlendMode: "screen" }}
        >
          {numeralLabel}
        </div>
      )}

      {/* the book page */}
      <div className="relative z-10 w-full max-w-2xl" style={{ perspective: "1800px" }}>
        <motion.div
          initial={{
            opacity: 0,
            rotateY: isFinal ? 0 : -26,
            x: isFinal ? 0 : -48,
            y: isFinal ? 22 : 0,
          }}
          animate={{ opacity: 1, rotateY: 0, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            rotateY: isFinal ? 0 : 26,
            x: isFinal ? 0 : 48,
          }}
          transition={{
            duration: isFinal ? 2.8 : 1.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
          className="relative paper page-grain page-gilt book-spine page-corner page-halo rounded-[8px] sm:rounded-[12px] px-7 sm:px-14 py-14 sm:py-20"
        >
          {chapterLabel && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.9 }}
              className="font-display text-[10px] sm:text-xs uppercase tracking-[0.6em] text-[var(--gold)]/80 text-center mb-6"
            >
              ✦ &nbsp;{chapterLabel}&nbsp; ✦
            </motion.p>
          )}
          {title && (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.54,
                  duration: isFinal ? 2.4 : 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display italic text-3xl sm:text-5xl text-center text-[var(--ink)] text-glow leading-[1.12] ink-stroke pb-2"
              >
                {title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.95, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "center" }}
              >
                <Flourish />
              </motion.div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isFinal ? 1.6 : 0.9, duration: isFinal ? 2.4 : 1.2 }}
            className="font-serif text-lg sm:text-xl leading-[2.1] text-[var(--ink)]/92 space-y-5 [&>p:first-of-type]:dropcap"
          >
            {children}
          </motion.div>
        </motion.div>

        {/* chapter footer label */}
        <div className="mt-5 text-center text-[10px] uppercase tracking-[0.54em] text-[var(--muted)]">
          {chapterLabel ? `~ ${chapterLabel} ~` : ""}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Utility paragraph
───────────────────────────────────────── */

function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={className}>{children}</p>;
}

/* ─────────────────────────────────────────
   COVER
───────────────────────────────────────── */

function Cover({ onOpen }: { onOpen: () => void }) {
  const [taps, setTaps] = useState(0);
  const [easter, setEaster] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), {
    stiffness: 72,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-9, 9]), {
    stiffness: 72,
    damping: 18,
  });

  useEffect(() => {
    if (taps >= 3) {
      setEaster(true);
      setTaps(0);
      const t = setTimeout(() => setEaster(false), 6000);
      return () => clearTimeout(t);
    }
  }, [taps]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full bg-cover-velvet vignette flex items-center justify-center px-5 py-20 overflow-hidden"
    >
      {/* ambient layers */}
      <div
        className="moon-glow"
        style={{ top: "-180px", left: "50%", transform: "translateX(-50%)" }}
      />
      <div className="candle-glow" style={{ bottom: "-100px", left: "-70px" }} />
      <div
        className="candle-glow"
        style={{ top: "-80px", right: "-70px", opacity: 0.55 }}
      />

      {/* altar light rising from below */}
      <div className="altar-light" aria-hidden />

      <Stars count={140} />
      <ShootingStars />
      <Dust count={32} />
      <Dust count={14} purple />

      {/* book card with 3-D tilt */}
      <div
        style={{ perspective: "2400px" }}
        className="relative z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          initial={{ y: 55, opacity: 0, rotateX: 18, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative paper page-grain rounded-[14px] px-8 sm:px-14 py-16 sm:py-22 max-w-md w-full text-center"
        >
          {/* gilded inner border */}
          <div
            className="pointer-events-none absolute inset-[10px] rounded-[10px]"
            style={{ border: "1px solid rgba(232, 199, 122, 0.30)" }}
          />
          {/* outer glow halo */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[14px]"
            style={{
              boxShadow:
                "0 0 160px rgba(168,85,247,0.32), 0 80px 120px -40px rgba(0,0,0,0.95), inset 0 0 120px rgba(201,166,255,0.08)",
            }}
          />
          {/* book spine strip on left edge */}
          <div
            className="pointer-events-none absolute top-8 bottom-8 left-4 flex items-center"
            aria-hidden
          >
            <span className="book-spine-title opacity-40">One Day</span>
          </div>

          {/* Edition line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="flex justify-center mb-8"
          >
            <span className="cover-edition">A Private Edition</span>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.75, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => setTaps((t) => t + 1)}
              className="relative font-display italic text-5xl sm:text-7xl leading-none cover-title-shimmer hover:scale-[1.02] transition-transform duration-700"
              style={{ letterSpacing: "-0.01em" }}
            >
              One Day
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1.1 }}
            style={{ transformOrigin: "center" }}
          >
            <Flourish />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.0 }}
            className="relative font-serif italic text-base sm:text-lg text-[var(--ink)]/88"
          >
            A story about a girl who wanted{" "}
            <Secret message="I hope you find it. I hope you keep it. I hope you never have to beg for it.">
              peace
            </Secret>
            .
          </motion.p>

          {/* Dedication */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.85, duration: 1.2 }}
            className="relative mt-10 text-xs sm:text-sm text-[var(--muted)] tracking-wider font-serif italic"
          >
            For Frieda, on her 16th birthday.
          </motion.p>

          {/* Open button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 1.0 }}
          >
            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 60px rgba(201,166,255,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpen}
              className="relative mt-11 inline-flex items-center gap-3 px-9 py-3.5 rounded-full border border-[var(--gold)]/44 text-[var(--ink)] hover:border-[var(--gold)]/80 hover:bg-[var(--gold)]/7 transition-all font-serif italic text-glow-gold"
            >
              Open the book
              <span aria-hidden>&rarr;</span>
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {easter && (
              <motion.p
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.9 }}
                className="relative mt-7 text-xs italic font-serif text-[var(--lime)]/92"
              >
                One day, you will realize this was always about you.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* First-load whisper */}
      <TimedWhisper message="Some stories are written for one person." after={9000} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Prologue
───────────────────────────────────────── */

function Prologue() {
  return (
    <PageShell chapterLabel="Prologue" title="Before the First Page" numeralLabel="P">
      <P>There are people you meet and understand quickly.</P>
      <P>And then there are people like her.</P>
      <P>
        The kind of person who feels like a mystery written in a language you
        want to spend time learning.
      </P>
      <P>
        She was intelligent, but not in a loud way.
        <br />
        Soft, but not weak.
        <br />
        Calm, but carrying storms no one could easily see.
      </P>
      <P>
        She had this way of seeming strong even when something inside her was
        tired.
        <br />
        This way of smiling like everything was fine, even when her silence said
        something else.
        <br />
        This way of making people feel safe, while still looking for peace
        herself.
      </P>
      <P>And maybe that is why this story had to be written.</P>
      <P>
        Not because she asked for it.
        <br />
        Not because she needed a gift.
        <br />
        But because some people deserve to be reminded that they are seen.
      </P>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Chapter I
───────────────────────────────────────── */

function ChapterI() {
  return (
    <PageShell
      chapterLabel="Chapter I"
      title="The Girl Who Wanted Peace"
      numeralLabel="I"
    >
      <P>
        If someone asked her what she wanted from life, she might not ask for
        the loudest kind of happiness.
      </P>
      <P>
        She might not ask for attention.
        <br />
        Or expensive things.
        <br />
        Or a perfect world.
      </P>
      <P>
        She would ask for{" "}
        <Secret message="I hope you find it. I hope you keep it. I hope you never have to beg for it.">
          peace
        </Secret>
        .
      </P>
      <P>
        Not because she is empty.
        <br />
        But because she has carried too much in silence.
      </P>
      <P>
        Peace in her thoughts.
        <br />
        Peace in her heart.
        <br />
        Peace in the places where she overthinks.
        <br />
        Peace in the parts of her that became tired from trying to keep
        everything together.
      </P>
      <P>
        She is the kind of girl who can care about people even when they do not
        care for her the same way.
        <br />
        The kind of girl who tries to keep things right, even when it costs her
        comfort.
        <br />
        The kind of girl who sometimes protects others so much that she forgets
        she also deserves protection.
      </P>
      <P>And maybe one day, she will stop thinking she has to carry everything alone.</P>
      <P>Maybe one day, she will believe that peace is not something she has to beg life for.</P>
      <P>Maybe one day, she will understand that she deserves it.</P>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Chapter II
───────────────────────────────────────── */

function ChapterII() {
  return (
    <PageShell
      variant="dark"
      chapterLabel="Chapter II"
      title="When It's Just Too Much"
      numeralLabel="II"
    >
      <P>Sometimes she does not explain.</P>
      <P>She just becomes quieter.</P>
      <P>Colder.</P>
      <P>More distant.</P>
      <P>
        Not because she stopped caring.
        <br />
        Not because she wants to hurt anyone.
        <br />
        But because something inside her becomes heavy, and she does not always
        know how to hand that weight to someone else.
      </P>
      <P>When asked what is wrong, she says:</P>
      <motion.p
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif italic text-2xl sm:text-3xl text-center text-[var(--purple-soft)] text-glow py-6"
      >
        &ldquo;It&apos;s just too much.&rdquo;
      </motion.p>
      <P>And maybe those words mean more than they sound.</P>
      <P className="">
        Maybe they mean:
        <br />
        <em>&ldquo;I do not know where to begin.&rdquo;</em>
      </P>
      <P>
        Maybe they mean:
        <br />
        <em>&ldquo;I am tired, but I do not want to worry you.&rdquo;</em>
      </P>
      <P>
        Maybe they mean:
        <br />
        <em>
          &ldquo;I wish someone understood without forcing me to explain
          everything.&rdquo;
        </em>
      </P>
      <P>
        Maybe they mean:
        <br />
        <em>&ldquo;Please notice me, even when I am trying to hide.&rdquo;</em>
      </P>
      <P>So this page is for that version of her.</P>
      <P>
        The one who goes quiet.
        <br />
        The one who overthinks.
        <br />
        The one who feels too much and says too little.
        <br />
        The one who still deserves softness, even when she does not know how to
        ask for it.
      </P>
      <div className="my-7 paper rounded-xl p-5 sm:p-6 border-l-2 border-[var(--blue)]/55">
        <p className="font-serif italic text-base sm:text-lg text-[var(--ink)]/92 leading-relaxed">
          If today feels like too much, you do not have to solve everything
          tonight. You only have to breathe. You only have to remember that you
          are not alone.
        </p>
      </div>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Chapter III — One Day (special)
───────────────────────────────────────── */

const ONE_DAY_ECHOES = [
  {
    top: "6%",
    left: "3%",
    size: "text-2xl sm:text-3xl",
    dur: 11,
    delay: 0,
    peak: 0.26,
    tx0: "0px",
    ty0: "0px",
    tx1: "20px",
    ty1: "-26px",
  },
  {
    top: "14%",
    right: "4%",
    size: "text-xl sm:text-2xl",
    dur: 13,
    delay: 1.8,
    peak: 0.20,
    tx0: "0px",
    ty0: "0px",
    tx1: "-16px",
    ty1: "-20px",
  },
  {
    top: "38%",
    left: "0%",
    size: "text-lg sm:text-xl",
    dur: 9,
    delay: 3.5,
    peak: 0.18,
    tx0: "0px",
    ty0: "0px",
    tx1: "24px",
    ty1: "-12px",
  },
  {
    bottom: "22%",
    right: "3%",
    size: "text-xl sm:text-2xl",
    dur: 12,
    delay: 0.9,
    peak: 0.22,
    tx0: "0px",
    ty0: "0px",
    tx1: "-20px",
    ty1: "-24px",
  },
  {
    bottom: "6%",
    left: "7%",
    size: "text-2xl sm:text-3xl",
    dur: 14,
    delay: 2.6,
    peak: 0.16,
    tx0: "0px",
    ty0: "0px",
    tx1: "14px",
    ty1: "-30px",
  },
  {
    top: "55%",
    left: "48%",
    size: "text-base sm:text-lg",
    dur: 16,
    delay: 5.2,
    peak: 0.10,
    tx0: "-14px",
    ty0: "0px",
    tx1: "10px",
    ty1: "-22px",
  },
];

function ChapterIII() {
  return (
    <PageShell variant="oneday" chapterLabel="Chapter III" title="One Day" numeralLabel="III">
      {/* floating "one day" echoes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {ONE_DAY_ECHOES.map((e, i) => (
          <span
            key={i}
            className={`phrase-echo ${e.size}`}
            style={{
              ...(e.top !== undefined ? { top: e.top } : {}),
              ...("bottom" in e ? { bottom: (e as { bottom?: string }).bottom } : {}),
              ...(e.left !== undefined ? { left: e.left } : {}),
              ...((e as { right?: string }).right !== undefined
                ? { right: (e as { right?: string }).right }
                : {}),
              ["--dur" as string]: `${e.dur}s`,
              ["--delay" as string]: `${e.delay}s`,
              ["--peak" as string]: `${e.peak}`,
              ["--tx0" as string]: e.tx0,
              ["--ty0" as string]: e.ty0,
              ["--tx1" as string]: e.tx1,
              ["--ty1" as string]: e.ty1,
            }}
          >
            one day
          </span>
        ))}
      </div>

      <P>She says it often.</P>

      {/* THE anchor — "One Day." as the emotional center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, filter: "blur(14px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="oneday-anchor my-2"
      >
        <p
          className="font-display italic text-4xl sm:text-6xl text-center text-glow leading-none"
          style={{
            background:
              "linear-gradient(135deg, var(--purple-soft) 0%, #fff 45%, var(--purple-soft) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.04em",
          }}
        >
          &ldquo;One day.&rdquo;
        </p>
      </motion.div>

      <P>
        One day I will tell you.
        <br />
        One day you will know.
        <br />
        One day I will explain.
        <br />
        One day.
      </P>
      <P>At first, it sounds like a delay.</P>
      <P>But maybe it is not.</P>
      <P>
        Maybe &ldquo;one day&rdquo; is the door she leaves slightly open when
        she is not ready to let someone all the way in.
      </P>
      <P>
        Maybe it is her way of saying:
        <br />
        <em>&ldquo;I want to tell you, but not yet.&rdquo;</em>
      </P>
      <P>
        Maybe it is her way of protecting the parts of herself that have not
        always been handled gently.
      </P>
      <P>And that is okay.</P>
      <P>
        Because not every chapter has to be opened immediately.
        <br />
        Not every feeling has to be explained before it is understood.
        <br />
        Not every secret has to be forced out of a heart that is still learning
        how safe it is.
      </P>
      <P>So, Frieda&hellip;</P>
      <P>
        One day, maybe you will tell me everything.
        <br />
        One day, maybe you will not feel the need to hide so much.
        <br />
        One day, maybe you will trust that your heart is not a burden.
      </P>
      <P>
        But even before that day comes,
        <br />I hope you know this:
      </P>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.6, delay: 0.25 }}
        className="space-y-3 py-3"
      >
        <p className="font-serif italic text-xl sm:text-2xl text-center text-[var(--ink)] text-glow">
          You are not loved only when you explain yourself.
        </p>
        <p className="font-serif italic text-xl sm:text-2xl text-center text-[var(--ink)] text-glow">
          You are loved even in silence.
        </p>
      </motion.div>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Chapter IV — The Hug (emotional center)
───────────────────────────────────────── */

function ChapterIV() {
  return (
    <PageShell
      variant="hug"
      chapterLabel="Chapter IV"
      title="The Hug"
      numeralLabel="IV"
    >
      {/* Three expanding breath rings */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className="breathe-ring"
          style={{
            width: 240,
            height: 240,
            animationDelay: "0s",
            ["--br-dur" as string]: "6s",
          }}
        />
        <div
          className="breathe-ring"
          style={{
            width: 370,
            height: 370,
            animationDelay: "1.5s",
            borderColor: "rgba(201,166,255,0.13)",
            ["--br-dur" as string]: "7s",
          }}
        />
        <div
          className="breathe-ring"
          style={{
            width: 520,
            height: 520,
            animationDelay: "3s",
            borderColor: "rgba(232,199,122,0.08)",
            ["--br-dur" as string]: "8s",
          }}
        />
        {/* warm amber center glow */}
        <div
          className="hug-glow"
          style={{
            width: 340,
            height: 340,
            background:
              "radial-gradient(circle, rgba(232,199,122,0.16), rgba(201,166,255,0.10) 45%, transparent 72%)",
          }}
        />
        {/* outer warmth fill */}
        <div
          className="hug-warmth"
          style={{
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(232,199,122,0.08), transparent 68%)",
          }}
        />
      </div>

      <P>There is a memory I think about more than you probably realize.</P>
      <P>We had not seen each other for some time.</P>
      <P>
        And when we finally did, we{" "}
        <Secret message="Some memories stay warm forever.">hugged</Secret>.
      </P>
      <P>
        Not a normal hug.
        <br />
        Not the kind people give because they are supposed to.
      </P>
      <P>It felt like something quiet was being said without words.</P>
      <P>
        I remember holding you.
        <br />I remember feeling you close.
        <br />I remember that moment where I thought I should let go, because
        maybe that was the right thing to do.
      </P>
      <P>But then you held on.</P>

      {/* The emotional climax of this chapter — maximum restraint */}
      <motion.p
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif italic text-2xl sm:text-3xl text-center text-[var(--gold)] text-glow-gold py-6"
      >
        You stopped me from breaking the hug.
      </motion.p>

      <P>And for a few more seconds, the world felt softer.</P>
      <P>
        Maybe you did not think much of it.
        <br />
        Maybe, to you, it was only a hug.
      </P>
      <P>But to me, it felt like being chosen in a language no one else could hear.</P>
      <Flourish slim />
      <P>That is why I love your hugs.</P>
      <P>
        Not only because they are warm.
        <br />
        Not only because I like having you in my arms.
      </P>
      <P>But because somehow, when I hold you, I feel safe.</P>
      <P>
        And the beautiful thing is&hellip;
        <br />
        you make me want to give that same safety back to you.
      </P>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Chapter V
───────────────────────────────────────── */

const CARDS = [
  {
    title: "Your Strength",
    body: [
      "You are strong in a way that does not always look dramatic.",
      "Not the loud kind.\nNot the kind that needs to prove itself.",
      "Your strength is quieter.",
      "It is in the way you keep going when your mind is full.\nIn the way you care, even after being disappointed.\nIn the way you try to keep peace, even when you are the one who needs it most.",
      "I hope one day you stop underestimating that.",
    ],
  },
  {
    title: "Your Smile",
    body: [
      "You once said your smile might be something you admire about yourself.",
      "I agree.",
      "But not only because it is beautiful.",
      "I love your smile because it feels like a small glimpse of the softer version of you.\nThe version that forgets to act serious.\nThe version that blushes and tries to recover her posture.\nThe version that tries to look angry but somehow becomes even cuter.",
      "Your smile has a way of making a moment feel lighter.",
    ],
  },
  {
    title: "Your Mind",
    body: [
      "You are intelligent in a way that makes people want to listen.",
      "Academically, yes.\nBut also in life.",
      "You notice things.\nYou think deeply.\nYou understand more than people expect.\nYou carry thoughts that are bigger than what you show.",
      "Sometimes that mind overthinks.\nSometimes it becomes too much.\nBut it is still one of the most beautiful parts of you.",
    ],
  },
  {
    title: "Your Heart",
    body: [
      "Your heart is softer than you let people see.",
      "You care.\nYou try.\nYou consider people.\nYou worry about how your actions affect others.",
      "And even when some people do not deserve that much access to your kindness, you still try to do things the right way.",
      "That says a lot about you.",
      "But I hope you learn that being kind does not mean abandoning yourself.",
    ],
  },
  {
    title: "Your Mystery",
    body: [
      "There is something about you that feels impossible to fully explain.",
      "A mysterious, elegant, sassy, soft kind of energy.",
      "Like there is always more behind your eyes.\nMore behind your silence.\nMore behind the smile you try to hide.",
      "And honestly, discovering you never feels boring.",
      "It feels like reading a book where every chapter makes the main character more interesting.",
    ],
  },
];

function ChapterV() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <PageShell chapterLabel="Chapter V" title="Things She Does Not See" numeralLabel="V">
      <P>Some people do not see themselves clearly.</P>
      <P>
        They see their mistakes louder than their beauty.
        <br />
        Their worries louder than their strength.
        <br />
        Their flaws louder than the love they give.
      </P>
      <P>So this chapter exists for the things she does not always notice about herself.</P>
      <div className="grid sm:grid-cols-2 gap-4 pt-5">
        {CARDS.map((c, i) => (
          <motion.button
            key={c.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.65 }}
            whileHover={{ y: -5, boxShadow: "0 0 44px rgba(201,166,255,0.22)" }}
            onClick={() => setOpen(i)}
            className="paper rounded-xl p-5 text-left hover:border-[var(--purple-soft)]/42 transition-all duration-300"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--purple-soft)]/70 mb-2">
              0{i + 1}
            </p>
            <p className="font-serif italic text-xl text-[var(--ink)]">{c.title}</p>
            <p className="text-[11px] text-[var(--muted)] mt-3 uppercase tracking-[0.25em]">
              Tap to open
            </p>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 18, rotateX: -8 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 18 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
              className="paper rounded-2xl max-w-lg w-full p-7 sm:p-10 max-h-[85vh] overflow-y-auto"
              style={{ boxShadow: "0 0 90px rgba(168, 85, 247, 0.26)" }}
            >
              <p className="text-[10px] uppercase tracking-[0.44em] text-[var(--purple-soft)]/80 mb-3">
                Chapter V &middot; 0{open + 1}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-[var(--ink)] text-glow mb-6 ink-stroke pb-2">
                {CARDS[open].title}
              </h3>
              <Flourish slim />
              <div className="space-y-4 font-serif text-lg leading-[2.1] text-[var(--ink)]/92">
                {CARDS[open].body.map((b, j) => (
                  <p key={j} style={{ whiteSpace: "pre-line" }}>
                    {b}
                  </p>
                ))}
              </div>
              <button
                onClick={() => setOpen(null)}
                className="mt-8 text-[11px] uppercase tracking-[0.36em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Chapter VI — Letters
───────────────────────────────────────── */

const LETTERS = [
  {
    title: "When it's too much",
    body: `When it is too much, you do not have to pretend it is not.

You do not have to become cold just to survive what you feel.
You do not have to explain everything perfectly.
You do not have to turn your pain into something easy for other people to understand.

You are allowed to be overwhelmed.
You are allowed to be tired.
You are allowed to need gentleness.

And if no one told you today:
You are not difficult to love because your heart gets heavy.

You are human.

Breathe slowly.
Let the world wait for a moment.
You do not have to carry everything at once.`,
  },
  {
    title: "When you feel alone",
    body: `When you feel alone, I hope you remember that your mind is not always telling you the full truth.

Sometimes loneliness makes it feel like no one cares.
Sometimes silence makes it feel like you have been forgotten.
Sometimes overthinking turns distance into fear.

But you are not as alone as your thoughts sometimes make you feel.

There is someone who notices when your patterns change.
Someone who sees when your energy becomes different.
Someone who understands that your silence often has a reason.

You are seen, even when you are quiet.`,
  },
  {
    title: "When you doubt yourself",
    body: `When you doubt yourself, I wish you could borrow my eyes for a moment.

Not because I see you perfectly.
But because I see things in you that you sometimes ignore.

I see intelligence.
I see beauty.
I see softness.
I see strength.
I see a girl who has so much potential inside her, even if she does not always know how powerful she is.

You are not ordinary.

And one day, I hope you believe that without needing someone else to remind you.`,
  },
  {
    title: "When you are trying to be strong",
    body: `You do not always have to be the strong one.

You do not always have to understand everyone.
You do not always have to keep the peace.
You do not always have to act like you are fine just because you do not want to push people away.

Sometimes strength is not holding everything in.

Sometimes strength is letting someone stay.

Letting someone notice.
Letting someone care.
Letting someone hold the parts of you that feel too heavy for one heart.

You deserve that too.`,
  },
  {
    title: "When you need peace",
    body: `I know peace means a lot to you.

Not just silence.
Not just the absence of problems.

Real peace.

The kind where your mind does not feel like a storm.
The kind where your heart does not feel like it has to defend itself.
The kind where you can rest without feeling guilty.
The kind where you are loved without pressure.

I hope life gives you that.

And I hope, in whatever way I can, I get to be part of the calm instead of the chaos.`,
  },
];

function ChapterVI() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <PageShell
      chapterLabel="Chapter VI"
      title="Letters for the Days You Need Them"
      numeralLabel="VI"
    >
      <P>These letters are not here to fix everything.</P>
      <P>They are here for the moments when you forget what you deserve.</P>
      <div className="grid gap-4 pt-5">
        {LETTERS.map((l, i) => (
          <motion.button
            key={l.title}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 * i, duration: 0.65 }}
            whileHover={{ x: 6, transition: { duration: 0.2 } }}
            onClick={() => setOpen(i)}
            className="paper rounded-xl p-5 flex items-center gap-5 text-left hover:border-[var(--purple-soft)]/52 transition-all duration-300 envelope"
          >
            {/* wax seal */}
            <span className="wax-seal seal-stamp shrink-0" aria-hidden>
              F
            </span>
            <span>
              <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--purple-soft)]/70">
                Letter 0{i + 1}
              </p>
              <p className="font-serif italic text-lg text-[var(--ink)] mt-1">
                {l.title}
              </p>
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ rotateX: -22, opacity: 0, y: 28, scale: 0.94 }}
              animate={{ rotateX: 0, opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.94 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
              className="paper rounded-2xl max-w-lg w-full p-7 sm:p-10 max-h-[85vh] overflow-y-auto letter-modal-enter"
              style={{ boxShadow: "0 0 100px rgba(168, 85, 247, 0.26)" }}
            >
              {/* letter header */}
              <div className="flex items-center gap-4 mb-5">
                <span className="wax-seal seal-stamp shrink-0" aria-hidden>
                  F
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.44em] text-[var(--purple-soft)]/80">
                    A letter for you
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ink)] text-glow mt-1">
                    {LETTERS[open].title}
                  </h3>
                </div>
              </div>
              <Flourish slim />
              <p
                className="font-serif text-base sm:text-lg leading-[2.1] text-[var(--ink)]/92"
                style={{ whiteSpace: "pre-line" }}
              >
                {LETTERS[open].body}
              </p>
              <button
                onClick={() => setOpen(null)}
                className="mt-8 text-[11px] uppercase tracking-[0.36em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
              >
                Fold the letter
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Chapter VII
───────────────────────────────────────── */

function ChapterVII() {
  return (
    <PageShell
      chapterLabel="Chapter VII"
      title="The Girl Behind the Smile"
      numeralLabel="VII"
    >
      <P>People may notice your beauty first.</P>
      <P>
        Your smile.
        <br />
        Your style.
        <br />
        Your face.
        <br />
        The way you somehow look good in anything.
      </P>
      <P>But that is not the only reason you are special.</P>
      <P>You are special because of the person behind all of that.</P>
      <P>
        The girl who tries.
        <br />
        The girl who cares.
        <br />
        The girl who thinks deeply.
        <br />
        The girl who feels more than she says.
        <br />
        The girl who wants peace.
        <br />
        The girl who is close to God.
        <br />
        The girl who tries to act angry but ends up looking adorable.
        <br />
        The girl who can make someone feel safe just by being herself.
      </P>
      <P>That is the girl this book was written for.</P>
      <Flourish slim />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.3 }}
        className="font-serif italic text-2xl sm:text-3xl text-center text-[var(--purple-soft)] text-glow"
      >
        Not a perfect girl.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.3, delay: 0.38 }}
        className="font-serif italic text-2xl sm:text-3xl text-center text-[var(--ink)] text-glow"
      >
        A real one.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.3, delay: 0.75 }}
        className="text-center font-serif text-lg sm:text-xl text-[var(--ink)]/85 mt-2"
      >
        A strong one.
        <br />
        A soft one.
        <br />
        A mysterious one.
        <br />
        A loved one.
      </motion.p>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Final Page — supreme stillness
───────────────────────────────────────── */

function FinalPage() {
  return (
    <PageShell variant="final" chapterLabel="The Last Page" title="Today">
      {/* altar light rising from below — amplified on this page */}
      <div className="altar-light" style={{ opacity: 0.22 }} aria-hidden />

      <P>Maybe one day you will tell me everything.</P>
      <P>Maybe one day you will stop carrying every burden by yourself.</P>
      <P>Maybe one day you will see yourself the way I see you.</P>
      <P>Maybe one day you will understand how much your presence means.</P>
      <P>
        Maybe one day you will finally feel the{" "}
        <Secret message="I hope you find it. I hope you keep it. I hope you never have to beg for it.">
          peace
        </Secret>{" "}
        you have been searching for.
      </P>
      <P>But today is not one day.</P>

      <motion.p
        initial={{ opacity: 0, y: 22, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif italic text-3xl sm:text-4xl text-center text-[var(--purple-soft)] text-glow py-7"
      >
        Today is your day.
      </motion.p>

      <P>Today, you turn 16.</P>
      <P>And today, I just wanted you to know something simple:</P>

      {/* THE line. Treated with absolute reverence. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.01 }}
        className="py-7 flex justify-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.65em", filter: "blur(16px)" }}
          whileInView={{ opacity: 1, letterSpacing: "0.04em", filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 3.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-4xl sm:text-6xl text-center text-[var(--ink)] text-glow-strong leading-tight"
        >
          You are loved.
        </motion.p>
      </motion.div>

      <P>
        Not only when you are smiling.
        <br />
        Not only when you are okay.
        <br />
        Not only when you are easy to understand.
        <br />
        Not only when you have the right words.
      </P>
      <P>
        You are loved in your silence.
        <br />
        In your overthinking.
        <br />
        In your soft moments.
        <br />
        In your stubborn moments.
        <br />
        In the parts of you that you show.
        <br />
        And in the parts of you that you are still learning how to share.
      </P>

      <Flourish slim />

      <P>I hope this year brings you the peace your heart has been asking for.</P>
      <P>
        And I hope, if life allows it, I will still be by your side when you
        find it.
      </P>

      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-display italic text-3xl sm:text-4xl text-center text-[var(--ink)] text-glow pt-10"
      >
        Happy 16th Birthday, My Princess.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2.6, delay: 1.8 }}
        className="text-center text-sm sm:text-base italic font-serif text-[var(--gold)]/88 pt-3"
      >
        Written for the girl who made me feel safe.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 4.0, delay: 4.5 }}
        className="pt-12"
      >
        <Flourish />
        <p className="font-display italic text-xl sm:text-2xl text-center text-[var(--purple-soft)] text-glow pt-3">
          The story does not end here.
        </p>
      </motion.div>
    </PageShell>
  );
}

/* ─────────────────────────────────────────
   Closing — absolute stillness
───────────────────────────────────────── */

function Closing({ onReopen }: { onReopen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3.5 }}
      className="serene relative min-h-screen w-full bg-midnight vignette flex items-center justify-center px-5 overflow-hidden"
    >
      {/* maximum stars for the final sky */}
      <Stars count={200} />
      <Dust count={10} />
      <Dust count={12} purple />
      <div
        className="moon-glow"
        style={{
          top: "-240px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "700px",
        }}
      />
      {/* altar light rises on closing too */}
      <div className="altar-light" aria-hidden />

      <div className="relative z-10 text-center max-w-lg px-4">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 2.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
        >
          <Flourish />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 3.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-3xl sm:text-5xl text-[var(--ink)] text-glow leading-tight mt-2"
        >
          The story does not end here.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 3 }}
          className="mt-8 text-sm sm:text-base italic font-serif text-[var(--gold)]/72 ink-breathe"
        >
          Some chapters are still being written.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8, duration: 2.5 }}
          className="mt-5 text-xs italic font-serif text-[var(--muted)]"
        >
          You reached the last page. Thank you for reading.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 11, duration: 2.2 }}
          whileHover={{ color: "var(--ink)", transition: { duration: 0.6 } }}
          onClick={onReopen}
          className="mt-16 text-xs uppercase tracking-[0.54em] text-[var(--purple-soft)]/65 hover:text-[var(--ink)] transition-colors duration-700"
        >
          Reopen the book
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Book controller
───────────────────────────────────────── */

const CHAPTERS = [
  { key: "prologue",   label: "Prologue",       next: "Turn the page",         el: Prologue   },
  { key: "c1",         label: "Chapter 1 of 7", next: "Continue",              el: ChapterI   },
  { key: "c2",         label: "Chapter 2 of 7", next: "Turn the page",         el: ChapterII  },
  { key: "c3",         label: "Chapter 3 of 7", next: "Continue reading",      el: ChapterIII },
  { key: "c4",         label: "Chapter 4 of 7", next: "Next chapter",          el: ChapterIV  },
  { key: "c5",         label: "Chapter 5 of 7", next: "Open the letters",      el: ChapterV   },
  { key: "c6",         label: "Chapter 6 of 7", next: "Final pages",           el: ChapterVI  },
  { key: "c7",         label: "Chapter 7 of 7", next: "Hear the soundtrack",   el: ChapterVII },
  { key: "soundtrack", label: "A Soundtrack",   next: "Turn to the last page", el: Soundtrack },
  { key: "final",      label: "The Last Page",  next: "Close the book",        el: FinalPage  },
];

const WHISPERS = [
  "You were always the main character.",
  "Some people are worth writing books about.",
  "You are loved more than you realize.",
  "One day became today.",
  "This story exists because you exist.",
  "She carried whole universes quietly.",
  "Some words can only be written once.",
  "The best readers feel every word.",
  "You are seen. You always were.",
  "Peace is coming for you.",
];

function OneDayBook() {
  const [index, setIndex] = useState(-1);
  const [flashKey, setFlashKey] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFlashKey((k) => k + 1);
  }, [index]);

  const isCover   = index === -1;
  const isClosing = index === CHAPTERS.length;
  const current   = !isCover && !isClosing ? CHAPTERS[index] : null;
  const ActiveEl  = current?.el;

  const whisper = !isCover && !isClosing ? WHISPERS[index % WHISPERS.length] : null;

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <div ref={topRef} />

      {/* page-turn flash — suppressed on very first load (flashKey === 1 is the cover mount) */}
      {flashKey > 2 && <div key={flashKey} className="page-flash" aria-hidden />}

      {/* top nav bar — progress + chapter label */}
      {!isCover && !isClosing && (
        <div className="fixed top-0 left-0 right-0 z-40">
          {/* gradient progress bar */}
          <div className="h-[1.5px] bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((index + 1) / CHAPTERS.length) * 100}%` }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="h-full progress-glow"
              style={{
                background:
                  "linear-gradient(90deg, var(--gold), var(--purple-soft), var(--blue))",
              }}
            />
          </div>
          <div className="flex items-center justify-between px-5 sm:px-8 py-3 text-[10px] uppercase tracking-[0.4em] text-[var(--muted)]">
            <span className="font-display italic normal-case tracking-[0.18em] text-sm text-[var(--gold)]/84">
              One Day
            </span>
            <span>{current?.label}</span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isCover && <Cover key="cover" onOpen={() => setIndex(0)} />}

        {ActiveEl && (
          <motion.div
            key={current!.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveEl />

            {whisper && (
              <TimedWhisper key={`w-${current!.key}`} message={whisper} after={9000} />
            )}

            {/* navigation */}
            <div className="relative z-10 -mt-10 pb-24 px-5 flex items-center justify-between max-w-2xl mx-auto gap-4">
              <button
                onClick={() => setIndex((i) => Math.max(-1, i - 1))}
                className="text-xs uppercase tracking-[0.34em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-300"
              >
                &larr; Back
              </button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(232,199,122,0.32)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIndex((i) => i + 1)}
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-[var(--gold)]/44 text-[var(--ink)] hover:bg-[var(--gold)]/7 hover:border-[var(--gold)]/75 transition-all font-serif italic"
              >
                {current!.next}
                <span aria-hidden>&rarr;</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {isClosing && <Closing key="closing" onReopen={() => setIndex(-1)} />}
      </AnimatePresence>

      <MusicButton />
    </main>
  );
}
