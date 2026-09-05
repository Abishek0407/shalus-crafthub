import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./CategorySlider.css";

const CLOSED = "polygon(28% 32%, 72% 32%, 72% 68%, 28% 68%)";
const OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

function Letters({ text }) {
  return [...text].map((ch, i) => (
    <span className="letter" key={i}>{ch === " " ? "\u00A0" : ch}</span>
  ));
}

export default function CategorySlider({ slides }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const dirRef = useRef(1);
  const targetRef = useRef(null);

  const frameRef = useRef(null);
  const titleRef = useRef(null);
  const counterRef = useRef(null);

  const total = slides.length;
  const current = slides[index];
  const prevSlide = slides[(index - 1 + total) % total];
  const nextSlide = slides[(index + 1) % total];

  const go = (dir) => {
    if (phase !== "idle" || total <= 1) return;
    targetRef.current = null;
    dirRef.current = dir;
    setPhase("exiting");
  };

  const jumpTo = (targetIndex) => {
    if (phase !== "idle" || targetIndex === index) return;
    const forward = (targetIndex - index + total) % total;
    const backward = (index - targetIndex + total) % total;
    dirRef.current = forward <= backward ? 1 : -1;
    targetRef.current = targetIndex;
    setPhase("exiting");
  };

  useEffect(() => {
    if (phase !== "exiting") return;
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        const target = targetRef.current ?? (index + dirRef.current + total) % total;
        targetRef.current = null;
        setIndex(target);
        setPhase("entering");
      }
    });
    tl.to(titleRef.current.querySelectorAll(".letter"), {
      yPercent: -60, opacity: 0, duration: 0.32, stagger: 0.012
    }, 0)
      .to(frameRef.current, { clipPath: CLOSED, scale: 0.92, duration: 0.42 }, 0)
      .to(counterRef.current, { yPercent: -100, opacity: 0, duration: 0.28 }, 0);
    return () => tl.kill();
  }, [phase]);

  useEffect(() => {
    if (phase !== "entering") return;
    gsap.set(titleRef.current.querySelectorAll(".letter"), { yPercent: 60, opacity: 0 });
    gsap.set(frameRef.current, { clipPath: CLOSED, scale: 0.92 });
    gsap.set(counterRef.current, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setPhase("idle")
    });
    tl.to(frameRef.current, { clipPath: OPEN, scale: 1, duration: 0.6 }, 0)
      .to(titleRef.current.querySelectorAll(".letter"), {
        yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.018
      }, 0.08)
      .to(counterRef.current, { yPercent: 0, opacity: 1, duration: 0.4 }, 0.1);
    return () => tl.kill();
  }, [phase, index]);

  const pad = (n) => String(n + 1).padStart(2, "0");

  if (!total) return null;

  return (
    <div className="slider-stage">
      <div className="slider-row">
        {total > 1 && (
          <button
            type="button"
            className="slide-thumb slide-thumb-prev"
            onClick={() => go(-1)}
            aria-label={`Previous: ${prevSlide.name}`}
          >
            <img src={prevSlide.image} alt="" loading="lazy" />
          </button>
        )}

        <Link to={current.to} className="slide-frame-link" aria-label={current.name}>
          <div ref={frameRef} className="slide-frame">
            <img src={current.image} alt="" loading="lazy" />
            <span className="slide-frame-cta">View piece →</span>
          </div>
        </Link>

        {total > 1 && (
          <button
            type="button"
            className="slide-thumb slide-thumb-next"
            onClick={() => go(1)}
            aria-label={`Next: ${nextSlide.name}`}
          >
            <img src={nextSlide.image} alt="" loading="lazy" />
          </button>
        )}
      </div>

      <div className="slider-meta">
        <p className="slider-eyebrow">{current.group}</p>
        <h2 ref={titleRef} className="slider-title">
          <Letters text={current.name} />
        </h2>
        <p ref={counterRef} className="slider-counter">
          {pad(index)} / {pad(total - 1)}
        </p>
      </div>

      {total > 1 && (
        <div className="slider-jumplist">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              className={`jump-chip${slideIndex === index ? " is-active" : ""}`}
              onClick={() => jumpTo(slideIndex)}
            >
              {slide.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
