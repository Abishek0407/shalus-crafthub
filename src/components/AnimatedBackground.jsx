import { useMemo } from "react";
import "./AnimatedBackground.css";

// Craft-themed icons that drift up through the page
const craftIcons = ["🎨", "🖌️", "💧", "🏺", "✨", "🧵"];

function generateParticles(count) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 3 + Math.random() * 5,
    duration: 18 + Math.random() * 20,
    delay: Math.random() * 20,
    drift: Math.round((Math.random() - 0.5) * 120),
  }));
}

function generateIcons(count) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    icon: craftIcons[i % craftIcons.length],
    left: 5 + Math.random() * 90,
    duration: 26 + Math.random() * 22,
    delay: Math.random() * 18,
    size: (1.1 + Math.random() * 1.2).toFixed(2),
  }));
}

/**
 * Fixed, full-viewport animated background.
 * Sits behind every section on the page (z-index: -1, pointer-events: none),
 * so it never blocks clicks or interferes with content.
 *
 * Mount it once, near the top of your root page component, e.g.:
 *   <div className="story-page">
 *     <AnimatedBackground />
 *     <Navbar />
 *     ...
 */
export default function AnimatedBackground() {
  // useMemo so the random layout is generated once per mount, not on every render
  const particles = useMemo(() => generateParticles(26), []);
  const icons = useMemo(() => generateIcons(6), []);

  return (
    <div className="animated-bg" aria-hidden="true">
      <div className="animated-bg-mesh" />

      <div className="animated-bg-blob blob-1" />
      <div className="animated-bg-blob blob-2" />
      <div className="animated-bg-blob blob-3" />
      <div className="animated-bg-blob blob-4" />

      {particles.map((p) => (
        <span
          key={`p-${p.id}`}
          className="bg-particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}

      {icons.map((ic) => (
        <span
          key={`i-${ic.id}`}
          className="bg-icon"
          style={{
            left: `${ic.left}%`,
            fontSize: `${ic.size}rem`,
            animationDuration: `${ic.duration}s`,
            animationDelay: `${ic.delay}s`,
          }}
        >
          {ic.icon}
        </span>
      ))}
    </div>
  );
}
