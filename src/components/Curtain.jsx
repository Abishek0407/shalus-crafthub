import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import logo from "../assets/logo.jpg";
import "./Curtain.css";

// Tap-to-open curtain intro (wedding-invitation style): two door panels
// meet in the middle holding the logo. On click, they swing open in 3D
// like double doors while the logo settles into the nav slot.
// Mount this at the top of App/Home, above the rest of the page.
export default function Curtain({ onDone }) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const logoRef = useRef(null);
  const promptRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const openingRef = useRef(false);

  const handleOpen = useCallback(() => {
    if (openingRef.current) return;
    openingRef.current = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getTarget = () => {
      const slot = document.getElementById("nav-logo-slot");
      const logoRect = logoRef.current.getBoundingClientRect();
      if (!slot) return { x: 0, y: -window.innerHeight / 2 + 40, scale: 0.28 };
      const rect = slot.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - (logoRect.left + logoRect.width / 2),
        y: rect.top + rect.height / 2 - (logoRect.top + logoRect.height / 2),
        scale: rect.width / logoRect.width
      };
    };

    const finish = () => {
      setOpened(true);
      onDone?.();
    };

    if (reduceMotion) {
      const t = getTarget();
      gsap.set(logoRef.current, { x: t.x, y: t.y, scale: t.scale });
      finish();
      return;
    }

    const target = getTarget();
    const tl = gsap.timeline({ onComplete: finish });

    tl.to(promptRef.current, { opacity: 0, duration: 0.25, ease: "power1.out" })
      .to(logoRef.current, { scale: 1.06, duration: 0.35, ease: "sine.inOut" }, "<")
      .to(
        leftRef.current,
        { rotateY: -108, xPercent: -6, duration: 1.3, ease: "power4.inOut" },
        "open"
      )
      .to(
        rightRef.current,
        { rotateY: 108, xPercent: 6, duration: 1.3, ease: "power4.inOut" },
        "open"
      )
      .to(
        logoRef.current,
        {
          x: target.x,
          y: target.y,
          scale: target.scale,
          duration: 1.05,
          ease: "elastic.out(1, 0.8)"
        },
        "open+=0.3"
      )
      .set([leftRef.current, rightRef.current], { pointerEvents: "none" }, "open");
  }, [onDone]);

  useEffect(() => {
    // Fallback: auto-open if the person doesn't click within a few seconds,
    // so the site is never permanently stuck behind the curtain.
    const t = setTimeout(() => {
      if (!openingRef.current) handleOpen();
    }, 6000);
    return () => clearTimeout(t);
  }, [handleOpen]);

  return (
    <div className={`curtain-root ${opened ? "curtain-done" : ""}`} aria-hidden={opened}>
      <div className="curtain-stage">
        <div ref={leftRef} className="curtain-panel curtain-left" onClick={handleOpen} />
        <div ref={rightRef} className="curtain-panel curtain-right" onClick={handleOpen} />
      </div>

      <div ref={logoRef} className="curtain-logo" onClick={handleOpen}>
        <img src={logo} alt="Shalu'z CraftHub logo" />
      </div>

      <button ref={promptRef} className="curtain-prompt" onClick={handleOpen} type="button">
        
      </button>
    </div>
  );
}
