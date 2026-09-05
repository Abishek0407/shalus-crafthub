import { Camera, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

const instagramUrl = "https://www.instagram.com/shaluz_crafthub?igsi=MTZyeTJnd2Iyam4wYQ==";
const whatsappUrl = "https://wa.me/917639868486";

export default function Contact() {
  return (
    <div className="contact-page">
      <Navbar />
      <main className="contact-content">
        <p className="contact-eyebrow">Stay connected</p>
        <h1>Contact Shalu'z CraftHub</h1>
        <p className="contact-intro">Follow our latest handmade creations or message us directly about your next keepsake.</p>
        <div className="contact-links">
          <a className="contact-card contact-instagram" href={instagramUrl} target="_blank" rel="noreferrer">
            <Camera size={30} strokeWidth={1.6} />
            <span>Instagram</span>
            <small>@shaluz_crafthub</small>
          </a>
          <a className="contact-card contact-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={30} strokeWidth={1.6} />
            <span>WhatsApp</span>
            <small>Chat with us</small>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
