import { useEffect, useRef } from "react";
import gsap from "gsap";
import { categories, extraRingImages } from "../data/services";
import { applyCategoryOverrides, getOverride } from "../utils/imageOverrides";
import { useOverrideVersion } from "../utils/useOverrideVersion";
import "./ImageRing.css";

const MAX_RING_ITEMS = 12;

// 3D rotating ring, adapted from a CSS-only reference into React + GSAP.
// Pulls real product photos from the catalog where available; falls back
// to a placeholder only for categories that don't have a photo yet.
export default function ImageRing() {
  const ringRef = useRef(null);
  const tweenRef = useRef(null);
  const overrideVersion = useOverrideVersion();
  const categoryItems = categories
    .map(applyCategoryOverrides)
    .filter((category) => category.image)
    .map((category) => ({
      label: category.name,
      img: getOverride("category", category.slug) || category.image,
    }));
  const ringItems = [...categoryItems, ...extraRingImages].slice(0, MAX_RING_ITEMS);

  useEffect(() => {
    const el = ringRef.current;
    el.style.setProperty("--total", ringItems.length);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    tweenRef.current = gsap.to(el, {
      "--spin": "360deg",
      duration: 42,
      ease: "none",
      repeat: -1
    });

    return () => tweenRef.current?.kill();
  }, [overrideVersion, ringItems.length]);

  const pause = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.resume();

  return (
    <div className="ring-stage">
      <div
        className="ring"
        ref={ringRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        style={{ "--total": ringItems.length }}
      >
        {ringItems.map((item, i) => (
          <div
            className="ring-item"
            key={item.label}
            style={{ "--i": i, "--total": ringItems.length }}
          >
            <img src={item.img} alt={item.label} loading="lazy" />
            <span className="ring-item-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
