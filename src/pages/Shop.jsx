import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/services";
import CategoryCube from "../components/CategoryCube";
import { applyCategoryOverrides } from "../utils/imageOverrides";
import { useOverrideVersion } from "../utils/useOverrideVersion";
import "./Shop.css";

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  const rootRef = useRef(null);
  useOverrideVersion();
  const visibleCategories = categories.map(applyCategoryOverrides);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: parseFloat(el.style.getPropertyValue("--delay")) || 0,
            scrollTrigger: { trigger: el, start: "top 90%" }
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <Navbar />
      <div className="nav-logo-fallback" id="nav-logo-slot-fallback" />
      <section className="shop-header">
        <h1>Shop all crafts</h1>
        <p>Twelve handmade disciplines. Every piece made to order.</p>
      </section>
      <section className="shop-grid-section">
        <div className="shop-grid">
          {visibleCategories.map((c, i) => (
            <CategoryCube category={c} index={i} key={c.slug} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
