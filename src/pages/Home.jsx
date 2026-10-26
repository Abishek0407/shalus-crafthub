import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Curtain from "../components/Curtain";
import Navbar from "../components/Navbar";
import LandingStage from "../components/LandingStage";
import Footer from "../components/Footer";
import ImageRing from "../components/ImageRing";
import CategoryCube from "../components/CategoryCube";
import GallerySphere from "../components/GallerySphere";
import { categories } from "../data/services";
import { applyCategoryOverrides } from "../utils/imageOverrides";
import { useOverrideVersion } from "../utils/useOverrideVersion";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);
const whatsappUrl = "https://wa.me/917639868486";

export default function Home() {
  const [curtainDone, setCurtainDone] = useState(false);
  const rootRef = useRef(null);
  useOverrideVersion();
  const handleCurtainDone = useCallback(() => setCurtainDone(true), []);
  const visibleCategories = categories.map(applyCategoryOverrides);

  useEffect(() => {
    if (!curtainDone) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: parseFloat(el.style.getPropertyValue("--delay")) || 0,
            scrollTrigger: {
              trigger: el,
              start: "top 88%"
            }
          }
        );
      });

      gsap.to(".parallax-blob", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [curtainDone]);

  return (
    <div ref={rootRef} className="home-page">
      <div className="home-bg" aria-hidden="true">
        <span className="bg-blob blob-blush" />
        <span className="bg-blob blob-sage" />
        <span className="bg-blob blob-teal" />
        <span className="bg-blob blob-gold" />
      </div>

      <Curtain onDone={handleCurtainDone} />
      <Navbar />
      <LandingStage />

      <section className="hero">
        <div className="parallax-blob" />
        <div className="hero-inner">
          <div className="eyebrow reveal-up">Handmade in small batches</div>
          <h1 className="reveal-up" style={{ "--delay": "0.08s" }}>
            Let's Preserve Your Moments, <em>Into Forever Memories</em>
          </h1>
          <p className="reveal-up" style={{ "--delay": "0.16s" }}>
            Every piece at Shalu'z CraftHub starts as raw thread, resin, or clay
            and ends up in someone's home — resin keepsakes, hand castings,
            string art, and more, made to order.
          </p>
        </div>
      </section>

      <section className="ring-section">
        <h2 className="reveal-up">A world of handmade crafts</h2>
        <ImageRing />
      </section>

      <section className="categories-section">
        <div className="categories-heading reveal-up">
          <h2>Shop by category</h2>
          <p>Twelve craft disciplines, every one made to order</p>
        </div>
        <div className="categories-grid">
          {visibleCategories.map((c, i) => (
            <CategoryCube category={c} index={i} key={c.slug} />
          ))}
        </div>
      </section>

      <GallerySphere />

      <section className="cta-strip reveal-up">
        <h2>Have something specific in mind?</h2>
        <p>Send us a photo and we'll turn it into a keepsake.</p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">Start a custom order</a>
      </section>

      <Footer />
    </div>
  );
}
