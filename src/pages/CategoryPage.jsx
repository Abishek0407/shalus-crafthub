import { useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCube from "../components/ProductCube";
import { getCategoryBySlug } from "../data/services";
import { applyCategoryOverrides, getOverride } from "../utils/imageOverrides";
import { useOverrideVersion } from "../utils/useOverrideVersion";
import "./CategoryPage.css";

gsap.registerPlugin(ScrollTrigger);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// A product can be a plain string, or an object { name, image } with its own photo.
function productName(product) {
  return typeof product === "string" ? product : product.name;
}

// Resolves the best available image for the category itself: a locally
// previewed override (from the admin photo manager) first, then its real image.
function categoryImage(category) {
  const overridden = getOverride("category", category.slug);
  if (overridden) return overridden;
  return category.image || `https://picsum.photos/seed/${category.slug}-hero/1600/700`;
}

// Resolves the best available image for a product: an override for this exact
// product, then its own image, then a group override, then the group's image,
// then a category override, then the category's image, then a placeholder.
function productImage(product, group, category) {
  const name = productName(product);
  const overrideName = typeof product === "object" ? product.originalName || name : name;

  const productOverride = getOverride("product", category.slug, group.originalGroup || group.group, overrideName);
  if (productOverride) return productOverride;
  if (typeof product === "object" && product.image) return product.image;

  const groupOverride = getOverride("group", category.slug, group.originalGroup || group.group);
  if (groupOverride) return groupOverride;
  if (group.image) return group.image;

  const categoryOverride = getOverride("category", category.slug);
  if (categoryOverride) return categoryOverride;
  if (category.image) return category.image;

  return `https://picsum.photos/seed/${encodeURIComponent(name)}/700/900`;
}

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const baseCategory = getCategoryBySlug(categorySlug);
  const category = baseCategory && applyCategoryOverrides(baseCategory);
  const rootRef = useRef(null);
  // Re-render with fresh images whenever the owner saves a photo in the admin manager.
  useOverrideVersion();

  useEffect(() => {
    if (!category) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: (i % 8) * 0.04,
            scrollTrigger: { trigger: el, start: "top 92%" }
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [category]);

  if (!category) return <Navigate to="/shop" replace />;

  return (
    <div ref={rootRef}>
      <Navbar />
      <section className="cat-header">
        <div className="cat-header-media">
          <img src={categoryImage(category)} alt={category.name} />
        </div>
        <div className="cat-header-text">
          <h1>{category.name}</h1>
          <p>{category.tagline}</p>
        </div>
      </section>

      <section className="cat-body">
        {category.items.map((group) => {
          const products = group.products.length > 0 ? group.products : [group.group];
          return (
            <div className="cat-group" key={group.group}>
              <h2 className="reveal-up">{group.group}</h2>
              <div className="cat-product-grid">
                {products.map((product, i) => {
                  const name = productName(product);
                  return (
                    <ProductCube
                      key={name}
                      image={productImage(product, group, category)}
                      title={name}
                      subtitle={category.tagline}
                      to={`/product/${category.slug}-${slugify(name)}`}
                      index={i}
                      overrideParts={[category.slug, group.group, name]}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </div>
  );
}
