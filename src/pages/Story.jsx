import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import "./Story.css";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro animations
      gsap.fromTo(
        ".story-hero-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Stagger animation for content sections
      gsap.utils.toArray(".story-section").forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            delay: index * 0.1
          }
        );
      });

      // Highlight animation
      gsap.utils.toArray(".story-highlight").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%"
            }
          }
        );
      });

      // Animate the journey points
      gsap.utils.toArray(".journey-point").forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%"
            },
            delay: index * 0.15
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="story-page">
      <AnimatedBackground />

      <Navbar />

      {/* Hero Section */}
      <section className="story-hero">
        <div className="story-hero-overlay" />
        <div className="story-hero-content">
          <div className="story-eyebrow">Our Story</div>
          <h1 className="story-title">
            Preserving Moments, <em>Into Forever Memories</em>
          </h1>
          <p className="story-subtitle">
            The journey of turning passion into art, one handcrafted piece at a time
          </p>
        </div>
      </section>

      {/* About Author */}
      <section className="story-container">
        <div className="story-section">
          <div className="author-intro">
            <h2>Hi, I'm <span className="highlight-text">R.K. Shalini</span></h2>
            <div className="intro-accent" />
          </div>
          <p className="story-intro-text">
            Shaluz Crafthub is a home studio offering handmade artworks and engaging workshops designed to capture and preserve your most precious memories.
          </p>
          <p className="story-intro-text">
            Here, every creation is thoughtfully designed not just to be displayed, but to hold the warmth of your most treasured moments and bring pure joy into your home.
          </p>
        </div>
      </section>

      {/* Journey Section */}
      <section className="story-container story-journey-section">
        <h2 className="story-section-title">The Journey</h2>
        <div className="journey-timeline">
          <div className="journey-point">
            <div className="point-dot" />
            <div className="point-content">
              <h3>The Beginning</h3>
              <p>
                What started as a childhood wonder with vibrant colors, simple clay and innocent sketches slowly grew into the heartbeat of my everyday life.
              </p>
            </div>
          </div>

          <div className="journey-point">
            <div className="point-dot" />
            <div className="point-content">
              <h3>The Calling</h3>
              <p>
                Over time, that quiet passion blossomed into my life's true calling. Today, Shaluz Crafthub is a sanctuary where love stories, milestones, and heartfelt moments are preserved forever.
              </p>
            </div>
          </div>

          <div className="journey-point">
            <div className="point-dot" />
            <div className="point-content">
              <h3>The Craft</h3>
              <p>
                Through bespoke gifts, timeless resin keepsakes, and handcrafted pieces, I don't just work with materials—I preserve memories. Hearing how deeply these pieces touch your lives is what fuels my spirit.
              </p>
            </div>
          </div>

          <div className="journey-point">
            <div className="point-dot" />
            <div className="point-content">
              <h3>The Privilege</h3>
              <p>
                I have the rare privilege of living in so many hearts by turning fleeting moments into art that lasts forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="story-container story-mission-section">
        <div className="mission-card">
          <div className="mission-icon">✨</div>
          <h2>Our Mission</h2>
          <p>
            Through my hands-on workshops, I invite people to reconnect with their own inner creativity. My mission is simple: <span className="highlight-accent">to walk with you step by step, as you craft a meaningful masterpiece entirely your own.</span>
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="story-container story-cta-section">
        <div className="cta-content">
          <h2>Let's Create Together</h2>
          <p className="cta-subtitle">
            Come, let's hold onto the beauty of memories and create something timeless together.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
