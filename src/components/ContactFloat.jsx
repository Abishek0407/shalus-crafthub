import { useState } from "react";
import { Camera, MessageCircle, Phone, X } from "lucide-react";
import "./ContactFloat.css";

const instagramUrl = "https://www.instagram.com/shaluz_crafthub?igsi=MTZyeTJnd2Iyam4wYQ==";
const whatsappUrl = "https://wa.me/917639858486";
const phoneUrl = "tel:+917639858486";

export default function ContactFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`contact-float${open ? " is-open" : ""}`}>
      <div className="contact-float-options" aria-hidden={!open}>
        <a
          className="contact-float-link instagram-link"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={open ? 0 : -1}
          aria-label="Open Instagram"
        >
          <Camera size={20} strokeWidth={1.8} />
          <span>Instagram</span>
        </a>
        <a
          className="contact-float-link whatsapp-link"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={open ? 0 : -1}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={20} strokeWidth={1.8} />
          <span>WhatsApp</span>
        </a>
        <a
          className="contact-float-link phone-link"
          href={phoneUrl}
          tabIndex={open ? 0 : -1}
          aria-label="Call Shalu's CraftHub"
        >
          <Phone size={20} strokeWidth={1.8} />
          <span>Call us</span>
        </a>
      </div>
      <button
        type="button"
        className="contact-float-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
      >
        {open ? <X size={23} strokeWidth={1.8} /> : <MessageCircle size={23} strokeWidth={1.8} />}
      </button>
      {!open && <span className="contact-float-prompt">For Contact</span>}
    </div>
  );
}
