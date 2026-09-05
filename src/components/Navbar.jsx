import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import logo from "../assets/logo.jpg";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/gallery", label: "Gallery" },
  { to: "/highlights", label: "Highlights" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" },
  { to: "/admin/images", label: "Manage photos" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* The Curtain intro logo animates into this slot on the home page */}
        <Link to="/" className="navbar-logo" id="nav-logo-slot" aria-label="Shalu'z CraftHub home">
          <img src={logo} alt="Shalu'z CraftHub" />
        </Link>

        {/* Centered brand name, mobile only — desktop shows the full link list instead */}
        <Link to="/" className="navbar-brand mobile-only" aria-label="Shalu'z CraftHub">
          Shalu'z CraftHub
        </Link>

        <nav className="navbar-links desktop-only">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link to="/account" className="icon-btn desktop-only icon-btn-blink" aria-label="Account">
            <User size={19} strokeWidth={1.6} />
          </Link>
          {/* <Link to="/cart" className="icon-btn" aria-label="Cart">
            <ShoppingBag size={19} strokeWidth={1.6} />
          </Link> */}
          <button
            className="icon-btn mobile-only"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      <div className={`navbar-mobile ${open ? "open" : ""}`}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            onClick={() => setOpen(false)}
            className="navbar-mobile-link"
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
