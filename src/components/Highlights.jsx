import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Highlights.css";

// Vite: automatically pulls in every image dropped into src/assets/highlights-IMG.
// Add or remove files from that folder and this page updates on the next build —
// no need to import/list each one by hand.
const modules = import.meta.glob("../assets/highlights-IMG/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}", {
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
          <p className="highlights-empty">No highlight photos yet. Add images to the highlights-IMG folder.</p>
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
