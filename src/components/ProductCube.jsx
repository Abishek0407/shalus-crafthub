import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getOverride } from "../utils/imageOverrides";
import { useOverrideVersion } from "../utils/useOverrideVersion";
import "./CategoryCube.css";

const PARALLAX_STRENGTH = 16;

export default function ProductCube({ image, title, subtitle, index = 0, overrideParts = [] }) {
  const wrapperRef = useRef(null);
  const cubeRef = useRef(null);
  const [canHover, setCanHover] = useState(false);
  useOverrideVersion();
  const productOverride = overrideParts.length ? getOverride("product", ...overrideParts) : null;
  const groupOverride = overrideParts.length > 1 ? getOverride("group", overrideParts[0], overrideParts[1]) : null;
  const src = productOverride || groupOverride || image || `https://picsum.photos/seed/${encodeURIComponent(title)}/500/620`;

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const updateSize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const depth = Math.round(Math.min(w, h) * 0.7);
      el.style.setProperty("--card-width", `${w}px`);
      el.style.setProperty("--card-height", `${h}px`);
      el.style.setProperty("--card-depth", `${depth}px`);
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!canHover) return;
    const cube = cubeRef.current;
    const wrapper = wrapperRef.current;
    if (!cube || !wrapper) return;

    const rotation = { flip: 0, tiltX: 0, tiltY: 0 };
    let isFlipped = false;

    const render = () => {
      const depth = parseFloat(getComputedStyle(wrapper).getPropertyValue("--card-depth")) || 0;
      gsap.set(cube, {
        rotationX: rotation.flip + rotation.tiltX,
        rotationY: rotation.tiltY,
        z: -depth / 2
      });
    };
    render();

    const onEnter = () => {
      isFlipped = false;
      gsap.to(rotation, {
        flip: 180,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "flip",
        onUpdate: render,
        onComplete: () => { isFlipped = true; }
      });
    };

    const onLeave = () => {
      isFlipped = false;
      gsap.to(rotation, {
        flip: 0,
        tiltX: 0,
        tiltY: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
        onUpdate: render
      });
    };

    const onMove = (event) => {
      if (!isFlipped) return;
      const bounds = cube.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const offsetX = (event.clientX - centerX) / bounds.width;
      const offsetY = (event.clientY - centerY) / bounds.height;
      gsap.to(rotation, {
        tiltY: offsetX * PARALLAX_STRENGTH,
        tiltX: -offsetY * PARALLAX_STRENGTH,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "tilt",
        onUpdate: render
      });
    };

    cube.addEventListener("mouseenter", onEnter);
    cube.addEventListener("mouseleave", onLeave);
    cube.addEventListener("mousemove", onMove);
    return () => {
      cube.removeEventListener("mouseenter", onEnter);
      cube.removeEventListener("mouseleave", onLeave);
      cube.removeEventListener("mousemove", onMove);
      gsap.killTweensOf(rotation);
    };
  }, [canHover]);

  return (
    <div
      ref={wrapperRef}
      className="cube-card reveal-up"
      style={{ "--delay": `${index * 0.05}s` }}
    >
      <div className="cube-link" aria-label={title}>
        <div ref={cubeRef} className="cube">
          <div className="face face-front">
            <img className="cube-thumb" src={src} alt="" loading="lazy" />
            <div className="cube-scrim" />
            <h3 className="cube-title">{title}</h3>
          </div>

          <div className="face face-back">
            <img className="cube-thumb" src={src} alt="" loading="lazy" />
            <div className="cube-scrim cube-scrim-back" />
            <h3 className="cube-title-back">{title}</h3>
            {subtitle && <p className="cube-desc">{subtitle}</p>}
            <svg className="cube-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12" />
              <polyline points="14 6 20 12 14 18" />
            </svg>
          </div>

          <div className="face face-right" />
          <div className="face face-left" />
          <div className="face face-top" />
          <div className="face face-bottom" />
        </div>
      </div>
    </div>
  );
}