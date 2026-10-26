import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import resinArt from "../assets/categories/resin-art.png";
import quillingFrame from "../assets/categories/quilling-frame.jpg";
import resinJewels from "../assets/categories/resin-jewels.jpg";
import resinDecor from "../assets/categories/resin-decor.jpg";
import miniatureFrame from "../assets/categories/miniature-frame.jpg";
import casting from "../assets/categories/casting.jpg";
import pencilCarving from "../assets/categories/pencil-carving.jpg";
import stringArt from "../assets/categories/string-art.jpg";
import embroideryHoopFrame from "../assets/categories/embroidery-hoop-frame.jpg";
import landingBg from "../assets/landing-bg.jpg";
import "./LandingStage.css";

const GALLERY = [

  
  resinArt,
  quillingFrame,
  resinJewels,
  resinDecor,
  miniatureFrame,
  casting,
  pencilCarving,
  stringArt,
  embroideryHoopFrame
];

export default function LandingStage() {
  const stageRef = useRef(null);
  const cursorRef = useRef(null);
  const [active, setActive] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = stageRef.current.getBoundingClientRect();
    gsap.to(cursorRef.current, {
      x: e.clientX - rect.left - 55,
      y: e.clientY - rect.top - 55,
      duration: 0.5,
      ease: "power2.out"
    });
  }, []);

  const handleClick = useCallback((e) => {
    const rect = stageRef.current.getBoundingClientRect();
    const src = GALLERY[Math.floor(Math.random() * GALLERY.length)];
    const isKeyboardActivation = e.detail === 0;
    const pointerX = isKeyboardActivation ? rect.left + rect.width / 2 : e.clientX;
    const pointerY = isKeyboardActivation ? rect.top + rect.height / 2 : e.clientY;

    const el = document.createElement("div");
    el.className = "stage-item";
    el.innerHTML = `<img src="${src}" alt="" />`;
    stageRef.current.appendChild(el);

    const width = 260;
    el.style.left = `${pointerX - rect.left - width / 2}px`;
    el.style.top = `${pointerY - rect.top}px`;

    const randomRotation = Math.random() * 10 - 5;
    const randomScale = Math.random() * 0.35 + 0.65;

    gsap.set(el, {
      scale: 0,
      opacity: 0,
      rotation: randomRotation,
      transformOrigin: "center"
    });

    const tl = gsap.timeline({ onComplete: () => el.remove() });
    tl.to(el, { scale: randomScale, opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(el, { y: "-=340", duration: 3.2, ease: "none" }, "<")
      .to(el, { opacity: 0, duration: 0.9 }, "-=0.6");
  }, []);

  return (
    <section
      ref={stageRef}
      className="landing-stage"
      style={{ backgroundImage: `url(${landingBg})` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="stage-scrim" aria-hidden="true" />

      <button
        type="button"
        className="landing-stage-trigger"
        aria-label="Reveal a floating craft photo"
        onClick={handleClick}
      />

      <div
        ref={cursorRef}
        className={`stage-cursor ${active ? "is-active" : ""}`}
        aria-hidden="true"
      >
        <span>Click</span>
      </div>

      <div className="stage-title">
        <h1>
          <span className="brand-script">Shalu&apos;z</span>
          <span className="brand-serif">CraftHub</span>
        </h1>
      </div>
    </section>
  );
}