import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./StubPage.css";

// Generic shell for pages we haven't fully built yet, so every route in the
// sitemap resolves to something real. Replace with a dedicated page as we
// build each one out.
export default function StubPage({ title, description }) {
  return (
    <div>
      <Navbar />
      <section className="stub-page">
        <h1>{title}</h1>
        <p>{description}</p>
        <span className="stub-badge">Coming next in the build</span>
      </section>
      <Footer />
    </div>
  );
}
