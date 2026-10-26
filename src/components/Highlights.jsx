import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Highlights.css";

// Load only the images dedicated to the highlights gallery.
const modules = import.meta.glob("../assets/Highlights-IMG/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}", {
  eager: true,
  import: "default"
});

const highlightImages = Object.keys(modules)
  .sort()
  .map((path) => ({
    src: modules[path],
    name: path.split("/").pop().replace(/\.[^/.]+$/, "")
  }));

export default function Highlights() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div>
      <Navbar />
      <main className="highlights-page">
        <div className="highlights-header">
          <h1>Highlights</h1>
          <p>A few of our favourite moments and creations.</p>
        </div>

        {highlightImages.length === 0 ? (
          <p className="highlights-empty">No highlight photos are available yet.</p>
        ) : (
          <div className="highlights-grid">
            {highlightImages.map((image) => (
              <button
                type="button"
                key={image.name}
                className="highlights-item"
                onClick={() => setActiveImage(image)}
              >
                <img src={image.src} alt={image.name} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </main>

      {activeImage && (
        <div className="highlights-lightbox" onClick={() => setActiveImage(null)}>
          <img src={activeImage.src} alt={activeImage.name} />
        </div>
      )}

      <Footer />
    </div>
  );
}
