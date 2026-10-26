import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, extraRingImages } from "../data/services";
import { applyCategoryOverrides, getOverride } from "../utils/imageOverrides";
import { useOverrideVersion } from "../utils/useOverrideVersion";
import "./GallerySphere.css";

gsap.registerPlugin(ScrollTrigger);
const whatsappUrl = "https://wa.me/917639868486";

export default function GallerySphere() {
  const sceneRef = useRef(null);
  const sphereRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const constellationRef = useRef(null);
  useOverrideVersion();
  const visibleCategories = categories.map(applyCategoryOverrides);

  const galleryItems = useMemo(() => {
    const fromCategories = visibleCategories
      .filter((category) => category.image)
      .map((category) => ({
        src: getOverride("category", category.slug) || category.image,
        title: category.name,
        desc: category.tagline
      }));
    const fromExtras = extraRingImages.map((extra) => ({
      src: extra.img,
      title: extra.label,
      desc: "A closer look at the craft"
    }));
    return [...fromCategories, ...fromExtras];
  }, [visibleCategories]);

  const allGalleryItems = useMemo(() => {
    const items = [];
    const seenImages = new Set();

    const addImage = (src, title, desc) => {
      if (!src || seenImages.has(src)) return;
      seenImages.add(src);
      items.push({ src, title, desc });
    };

    visibleCategories.forEach((category) => {
      const categoryImage = getOverride("category", category.slug) || category.image;
      addImage(categoryImage, category.name, category.tagline);
      category.items.forEach((group) => {
        const groupImage = getOverride("group", category.slug, group.group) || group.image || categoryImage;
        addImage(groupImage, group.group, category.tagline);
        group.products.forEach((product) => {
          const name = typeof product === "string" ? product : product.name;
          const productImage = getOverride("product", category.slug, group.originalGroup || group.group, typeof product === "object" ? product.originalName || name : name)
            || (typeof product === "object" && product.image)
            || groupImage;
          addImage(productImage, name, category.tagline);
        });
      });
    });

    extraRingImages.forEach((extra) => {
      addImage(extra.img, extra.label, "A closer look at the craft");
    });

    return items;
  }, [visibleCategories]);

  // Sphere of cards + scroll-driven rotation / text swap
  useEffect(() => {
    const sphere = sphereRef.current;
    const scene = sceneRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    if (!sphere || !scene || !titleEl || !descEl || galleryItems.length === 0) return;

    // Fewer, more spaced-out cards on small screens so they don't merge into a blob.
    const isMobile = window.innerWidth < 768;
    const itemCount = isMobile ? 14 : 24;
    const radius = isMobile ? 230 : 380;
    const items = [...galleryItems, ...galleryItems, ...galleryItems].slice(0, itemCount);
    const cards = [];

    items.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "clay-card";

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title;
      img.loading = "lazy";
      card.appendChild(img);

      const phi = Math.acos(1 - (2 * (i + 0.5)) / items.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      const rotY = Math.atan2(x, z) * (180 / Math.PI);
      const rotX = Math.asin(-y / radius) * (180 / Math.PI);

      card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
      sphere.appendChild(card);
      cards.push(card);
    });

    function updateActiveCard(progress) {
      const textIndex = Math.floor(progress * galleryItems.length) % galleryItems.length;
      const current = galleryItems[textIndex];
      if (titleEl.innerText !== current.title) {
        gsap.to([titleEl, descEl], {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            titleEl.innerText = current.title;
            descEl.innerText = current.desc;
            gsap.to([titleEl, descEl], { opacity: 1, duration: 0.2 });
          }
        });
      }

      const focusIndex = Math.floor(progress * items.length);
      cards.forEach((card, idx) => {
        card.classList.toggle("active-card", Math.abs(idx - focusIndex) < 2);
      });
    }

    const ctx = gsap.context(() => {
      gsap.to(sphere, {
        rotateY: 360 * 2,
        rotateX: 45,
        ease: "none",
        scrollTrigger: {
          trigger: scene.closest(".gallery-container"),
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => updateActiveCard(self.progress)
        }
      });
    }, scene);

    return () => {
      ctx.revert();
      cards.forEach((card) => card.remove());
    };
  }, [galleryItems]);

  // Scattered "constellation" cards in the journey section
  useEffect(() => {
    const constellation = constellationRef.current;
    if (!constellation || galleryItems.length === 0) return;

    const scatterPositions = [
      { top: "10%", left: "15%" },
      { top: "20%", left: "80%" },
      { top: "60%", left: "10%" },
      { top: "75%", left: "85%" },
      { top: "85%", left: "30%" },
      { top: "15%", left: "50%" }
    ];

    const cards = scatterPositions.map((pos, i) => {
      const card = document.createElement("div");
      card.className = "clay-card constellation-card";
      card.style.top = pos.top;
      card.style.left = pos.left;
      card.style.transform = `rotate(${(Math.random() - 0.5) * 40}deg) scale(0.8)`;

      const img = document.createElement("img");
      img.src = galleryItems[i % galleryItems.length].src;
      img.alt = "";
      img.loading = "lazy";
      card.appendChild(img);
      constellation.appendChild(card);
      return card;
    });

    const tween = gsap.to(cards, {
      y: -100,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: {
        trigger: constellation.closest(".journey-section"),
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      cards.forEach((card) => card.remove());
    };
  }, [galleryItems]);

  if (galleryItems.length === 0) return null;

  return (
    <>
      <section className="craft-gallery gallery-container">
        <div className="floating-text left-text">
          <h2 ref={titleRef}>{galleryItems[0].title}</h2>
          <p ref={descRef}>{galleryItems[0].desc}</p>
        </div>
        <div className="scene" ref={sceneRef}>
          <div className="sphere" ref={sphereRef} />
        </div>
        <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,50 Q25,30 50,50 T100,50" stroke="rgba(107,122,110,0.12)" strokeWidth="0.2" fill="none" />
          <path d="M20,0 L80,100" stroke="rgba(198,161,91,0.1)" strokeWidth="0.2" fill="none" />
        </svg>
      </section>

      <section className="craft-gallery gallery-grid-section">
        <div className="gallery-grid-heading">
          <h2>All memories</h2>
          <p>Every craft, in one place</p>
        </div>
        <div className="gallery-grid">
          {allGalleryItems.map((item) => (
            <figure className="gallery-grid-item" key={item.src}>
              <img src={item.src} alt={item.title} loading="lazy" />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="craft-gallery journey-section">
        <div className="constellation" ref={constellationRef} />
        <div className="journey-content">
          <h2>Have something specific in mind?</h2>
          <p>Send us a photo and we'll turn it into a keepsake.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn chunky-btn large-btn">Get started</a>
        </div>
      </section>
    </>
  );
}
