import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { categories } from "../data/services";
import { applyCategoryOverrides, getDetails, getOverride } from "../utils/imageOverrides";
import { useOverrideVersion } from "../utils/useOverrideVersion";
import "./Shop.css";

gsap.registerPlugin(ScrollTrigger);

function productName(product) {
  return typeof product === "string" ? product : product.name;
}

function productImage(product, group, category) {
  const name = productName(product);
  const originalGroup = group.originalGroup || group.group;
  const originalName = typeof product === "object" ? product.originalName || name : name;
  const productOverride = getOverride("product", category.slug, originalGroup, originalName);
  if (productOverride) return productOverride;
  if (typeof product === "object" && product.image) return product.image;

  const groupOverride = getOverride("group", category.slug, originalGroup);
  if (groupOverride) return groupOverride;
  if (group.image) return group.image;

  const categoryOverride = getOverride("category", category.slug);
  if (categoryOverride) return categoryOverride;
  if (category.image) return category.image;

  return `https://picsum.photos/seed/${encodeURIComponent(name)}/700/900`;
}

export default function Shop() {
  const rootRef = useRef(null);
  const [openCategories, setOpenCategories] = useState(() => new Set());
  const [collapsedGroups, setCollapsedGroups] = useState(() => new Set());
  useOverrideVersion();
  const visibleCategories = categories.map(applyCategoryOverrides);

  const toggleCategory = (slug) => {
    setOpenCategories((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const toggleGroup = (key) => {
    setCollapsedGroups((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

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
            delay: Number.parseFloat(el.style.getPropertyValue("--delay")) || 0,
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
        <div className="shop-category-list">
          {visibleCategories.map((category, categoryIndex) => {
            const isOpen = openCategories.has(category.slug);
            const categoryPanelId = `shop-category-${category.slug}`;

            return (
              <section
                className="shop-category reveal-up"
                key={category.slug}
                style={{ "--category-hue": `${categoryIndex * 31 + 18}deg` }}
              >
                <button
                  type="button"
                  className="shop-category-toggle"
                  aria-expanded={isOpen}
                  aria-controls={categoryPanelId}
                  onClick={() => toggleCategory(category.slug)}
                >
                  <span className="shop-category-copy">
                    <span className="shop-category-name">{category.name}</span>
                    <span className="shop-category-tagline">{category.tagline}</span>
                  </span>
                  <span className="shop-category-indicator" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>

                <div className="shop-category-panel" id={categoryPanelId} hidden={!isOpen}>
                  {isOpen && category.items.map((group, groupIndex) => {
                    const originalGroup = group.originalGroup || group.group;
                    const groupKey = `${category.slug}::${originalGroup}`;
                    const groupPanelId = `shop-group-${category.slug}-${groupIndex}`;
                    const isGroupOpen = !collapsedGroups.has(groupKey);
                    const storedProducts = getDetails("newProducts", [category.slug, originalGroup]);
                    const addedProducts = Array.isArray(storedProducts) ? storedProducts : [];
                    const products = group.products.length > 0 ? group.products : [group.group];

                    return (
                      <section
                        className="shop-product-group"
                        key={originalGroup}
                        style={{ "--group-hue": `${categoryIndex * 31 + groupIndex * 19 + 32}deg` }}
                      >
                        <h2 className="shop-group-heading">
                          <button
                            type="button"
                            className="shop-group-toggle"
                            aria-expanded={isGroupOpen}
                            aria-controls={groupPanelId}
                            onClick={() => toggleGroup(groupKey)}
                          >
                            <span>{group.group}</span>
                            <span className="shop-group-indicator" aria-hidden="true">{isGroupOpen ? "−" : "+"}</span>
                          </button>
                        </h2>
                        <div className="shop-product-grid" id={groupPanelId} hidden={!isGroupOpen}>
                          {isGroupOpen && [...products, ...addedProducts].map((product, productIndex) => {
                            const name = productName(product);
                            return (
                              <article className="shop-product-card" key={`${name}-${productIndex}`}>
                                <div className="shop-product-image">
                                  <img src={productImage(product, group, category)} alt={name} loading="lazy" />
                                </div>
                                <h3>{name}</h3>
                              </article>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}
