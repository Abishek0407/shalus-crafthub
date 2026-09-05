import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GallerySphere from "../components/GallerySphere";
import "./Gallery.css";

export default function Gallery() {
  return (
    <div className="gallery-page">
      <Navbar />
      <main>
        <GallerySphere />
      </main>
      <Footer />
    </div>
  );
}
