import { useLayoutEffect } from "react";
import { Navigate, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/CategoryPage";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Story from "./pages/Story";
import AdminCategoryImages from "./components/AdminCategoryImages";
import ContactFloat from "./components/ContactFloat";
import StubPage from "./pages/StubPage";
import Highlights from "./components/Highlights";

const scrollPositions = new Map();

function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    const savedPosition = scrollPositions.get(location.key);
    window.scrollTo(0, navigationType === "POP" ? savedPosition ?? 0 : 0);

    return () => {
      scrollPositions.set(location.key, window.scrollY);
    };
  }, [location.key, navigationType]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollRestoration />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:categorySlug" element={<CategoryPage />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/admin/images" element={<AdminCategoryImages />} />

      <Route path="/product/:productSlug" element={<Navigate to="/shop" replace />} />
      <Route
        path="/custom-order"
        element={<StubPage title="Custom Order" description="Select craft type, describe requirements, upload reference images, add name/text, and request a quote." />}
      />
      <Route
        path="/cart"
        element={<StubPage title="Your Cart" description="Items you've added will show up here." />}
      />
      <Route
        path="/account"
        element={<StubPage title="My Account" description="Profile, orders, wishlist and saved addresses." />}
      />
      <Route
        path="/about"
        element={<Story />}
      />
      <Route
        path="/reviews"
        element={<StubPage title="Reviews" description="What customers are saying about their custom pieces." />}
      />
      <Route
        path="/contact"
        element={<Contact />}
      />
      <Route
        path="/faq"
        element={<StubPage title="FAQ" description="Common questions about ordering, customisation, and shipping." />}
      />
      <Route path="/highlights" element={<Highlights/>} />

      <Route path="*" element={<StubPage title="Page not found" description="That page doesn't exist yet." />} />
      </Routes>
      <ContactFloat />
    </>
  );
}
