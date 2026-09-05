import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ category, index }) {
  const src = category.image || `https://picsum.photos/seed/${category.slug}/700/900`;
  return (
    <Link to={`/shop/${category.slug}`} className="cat-card reveal-up" style={{ "--delay": `${index * 0.06}s` }}>
      <div className="cat-card-media">
        <img src={src} alt={category.name} loading="lazy" />
      </div>
      <div className="cat-card-body">
        <h3>{category.name}</h3>
        <p>{category.tagline}</p>
      </div>
    </Link>
  );
}
