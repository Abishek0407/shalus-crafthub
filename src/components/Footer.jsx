import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">Shalu'z CraftHub</div>
        <div className="footer-cols">
          <div>
            <h4>Shop</h4>
            <Link to="/shop/resin-art">Resin Art</Link>
            <Link to="/shop/casting">Casting</Link>
            <Link to="/shop/string-art">String Art</Link>
          </div>
          <div>
            <h4>Help</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/custom-order">Custom Order</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/about">Our Story</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Shalu'z CraftHub. Handmade with heart.</div>
    </footer>
  );
}
