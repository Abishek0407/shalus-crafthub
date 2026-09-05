import { useState } from "react";
import { categories } from "../data/services";
import { getOverride, setOverride, clearOverride, getDetails, setDetails } from "../utils/imageOverrides";
import { useOverrideVersion } from "../utils/useOverrideVersion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./AdminCategoryImages.css";
import { Plus, X } from "lucide-react";

const ADMIN_PASSWORD = "0987";

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function productName(product) {
  return typeof product === "string" ? product : product.name;
}

function DetailField({ scope, parts, field, defaultValue, label }) {
  useOverrideVersion();
  const saved = getDetails(scope, parts)[field];
  const [value, setValue] = useState(saved || defaultValue);

  const save = () => {
    const nextValue = value.trim();
    if (nextValue && nextValue !== defaultValue) {
      setDetails(scope, parts, { ...getDetails(scope, parts), [field]: nextValue });
    }
  };

  return (
    <label className="admin-detail-field">
      <span>{label}</span>
      <input value={value} onChange={(event) => setValue(event.target.value)} onBlur={save} />
    </label>
  );
}

function AddProductForm({ categorySlug, groupName, onProductAdded, onCancel }) {
  useOverrideVersion();
  const [productName, setProductName] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!productName.trim()) {
      setError("Please enter a product name");
      return;
    }
    if (!file) {
      setError("Please select an image");
      return;
    }

    setBusy(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const newProduct = {
        name: productName.trim(),
        image: dataUrl,
        isNew: true
      };
      
      // Store the new product in overrides
      const existingProducts = getDetails("newProducts", [categorySlug, groupName]);
      const newProducts = Array.isArray(existingProducts) ? [...existingProducts] : [];
      newProducts.push(newProduct);
      setDetails("newProducts", [categorySlug, groupName], newProducts);
      
      onProductAdded();
      setProductName("");
      setFile(null);
      setError("");
    } catch (err) {
      setError("Could not add product: " + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="admin-add-product-form" onSubmit={handleAddProduct}>
      <h4 className="admin-form-title">Add New Product to {groupName}</h4>
      <div className="admin-form-fields">
        <label className="admin-form-field">
          <span>Product Name</span>
          <input
            type="text"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              setError("");
            }}
            placeholder="e.g., Custom Resin Ring"
            disabled={busy}
          />
        </label>
        <label className="admin-form-field">
          <span>Product Photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setError("");
            }}
            disabled={busy}
          />
        </label>
      </div>
      {error && <p className="admin-form-error">{error}</p>}
      <div className="admin-form-actions">
        <button type="submit" disabled={busy} className="admin-add-btn">
          {busy ? "Adding..." : "Add Product"}
        </button>
        <button type="button" onClick={onCancel} disabled={busy} className="admin-cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

function ImageUploadRow({ label, scope, parts, defaultSrc }) {
  useOverrideVersion();
  const override = getOverride(scope, ...parts);
  const src = override || defaultSrc;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      if (!setOverride(scope, parts, dataUrl)) {
        setError("Could not save this image. Try a smaller file.");
      }
    } catch {
      setError("Could not read that file.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-image-row">
      <img src={src} alt={label} className="admin-image-preview" />
      <div className="admin-image-info">
        <p className="admin-image-label">{label}</p>
        <div className="admin-image-actions">
          <label className="admin-upload-btn">
            {busy ? "Uploading..." : "Upload new photo"}
            <input type="file" accept="image/*" onChange={handleFile} disabled={busy} hidden />
          </label>
          {override && (
            <button type="button" className="admin-reset-btn" onClick={() => clearOverride(scope, ...parts)}>
              Reset to default
            </button>
          )}
        </div>
        {error && <p className="admin-image-error">{error}</p>}
        {override && <p className="admin-image-hint">Preview only in this browser.</p>}
      </div>
    </div>
  );
}

export default function AdminCategoryImages() {
  useOverrideVersion();
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("crafthub-admin-access") === "granted");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSlug, setOpenSlug] = useState(categories[0]?.slug ?? null);
  const [addingProduct, setAddingProduct] = useState(null); // { categorySlug, groupName }

  const handleLogin = (event) => {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("crafthub-admin-access", "granted");
      setAuthenticated(true);
      setError("");
      return;
    }
    setError("That password is not correct.");
  };

  return (
    <div>
      <Navbar />
      {!authenticated ? (
        <main className="admin-image-manager admin-login-page">
          <form className="admin-login" onSubmit={handleLogin}>
            <h1>Manage category photos</h1>
            <p>Enter the admin password to continue.</p>
            <label className="admin-login-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                autoFocus
                autoComplete="current-password"
              />
            </label>
            {error && <p className="admin-login-error" role="alert">{error}</p>}
            <button type="submit" className="admin-login-btn">Enter manage photos</button>
          </form>
        </main>
      ) : (
      <main className="admin-image-manager">
      <div className="admin-image-manager-header">
        <h1>Manage category photos</h1>
        <p className="admin-note">Uploads are saved in this browser only. Add approved photos to the project files to publish them for all visitors.</p>
      </div>

      {categories.map((category) => (
        <div className="admin-category-block" key={category.slug}>
          <button type="button" className="admin-category-toggle" aria-expanded={openSlug === category.slug} onClick={() => setOpenSlug(openSlug === category.slug ? null : category.slug)}>
            {category.name}
            <span className="admin-toggle-icon">{openSlug === category.slug ? "-" : "+"}</span>
          </button>

          {openSlug === category.slug && (
            <div className="admin-category-body">
              <div className="admin-detail-fields">
                <DetailField scope="category" parts={[category.slug]} field="name" label="Category name" defaultValue={category.name} />
                <DetailField scope="category" parts={[category.slug]} field="tagline" label="Category tagline" defaultValue={category.tagline} />
              </div>
              <ImageUploadRow label={`${category.name} - category cover photo`} scope="category" parts={[category.slug]} defaultSrc={category.image || `https://picsum.photos/seed/${category.slug}/700/900`} />
              {category.items.map((group) => {
                const storedNewProducts = getDetails("newProducts", [category.slug, group.group]);
                const newProducts = Array.isArray(storedNewProducts) ? storedNewProducts : [];
                return (
                <div className="admin-group-block" key={group.group}>
                  <DetailField scope="group" parts={[category.slug, group.group]} field="name" label="Group name" defaultValue={group.group} />
                  <ImageUploadRow label={`${group.group} - group photo`} scope="group" parts={[category.slug, group.group]} defaultSrc={group.image || category.image || `https://picsum.photos/seed/${group.group}/700/900`} />
                  
                  {/* Existing Products */}
                  {group.products.length > 0 && (
                    <div className="admin-products-section">
                      <h4 className="admin-section-title">Existing Products</h4>
                      {group.products.map((product) => {
                        const name = productName(product);
                        const defaultSrc = (typeof product === "object" && product.image) || group.image || category.image || `https://picsum.photos/seed/${encodeURIComponent(name)}/700/900`;
                        return (
                          <div key={name} className="admin-product-block">
                            <DetailField scope="product" parts={[category.slug, group.group, name]} field="name" label="Product name" defaultValue={name} />
                            <ImageUploadRow label={name} scope="product" parts={[category.slug, group.group, name]} defaultSrc={defaultSrc} />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Newly Added Products */}
                  {newProducts.length > 0 && (
                    <div className="admin-new-products-section">
                      <h4 className="admin-section-title">New Products</h4>
                      {newProducts.map((product, idx) => (
                        <div key={`new-${idx}`} className="admin-product-block admin-new-product-block">
                          <div className="admin-product-header">
                            <h5>{product.name}</h5>
                            <button 
                              type="button"
                              className="admin-remove-product-btn"
                              onClick={() => {
                                const updated = newProducts.filter((_, i) => i !== idx);
                                if (updated.length === 0) {
                                  setDetails("newProducts", [category.slug, group.group], null);
                                } else {
                                  setDetails("newProducts", [category.slug, group.group], updated);
                                }
                              }}
                            >
                              <X size={16} />
                            </button>
                          </div>
                          {product.image && (
                            <img src={product.image} alt={product.name} className="admin-new-product-preview" />
                          )}
                          <p className="admin-new-product-hint">This product will be added when changes are deployed.</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Product Button */}
                  {!addingProduct || addingProduct.categorySlug !== category.slug || addingProduct.groupName !== group.group ? (
                    <button 
                      type="button"
                      className="admin-add-product-btn"
                      onClick={() => setAddingProduct({ categorySlug: category.slug, groupName: group.group })}
                    >
                      <Plus size={18} /> Add Product Photo
                    </button>
                  ) : (
                    <AddProductForm 
                      categorySlug={category.slug}
                      groupName={group.group}
                      onProductAdded={() => setAddingProduct(null)}
                      onCancel={() => setAddingProduct(null)}
                    />
                  )}
                </div>
              );
              })}
            </div>
          )}
        </div>
      ))}
      </main>
      )}
      <Footer />
    </div>
  );
}
