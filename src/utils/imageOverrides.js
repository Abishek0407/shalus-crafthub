const STORAGE_KEY = "crafthub-image-overrides";
export const CHANGE_EVENT = "crafthub-image-overrides-changed";

function readOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function keyFor(scope, parts) {
  return [scope, ...parts].join("::");
}

export function getOverride(scope, ...parts) {
  return readOverrides()[keyFor(scope, parts)] || null;
}

export function setOverride(scope, parts, dataUrl) {
  try {
    const overrides = readOverrides();
    overrides[keyFor(scope, parts)] = dataUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function clearOverride(scope, ...parts) {
  const overrides = readOverrides();
  delete overrides[keyFor(scope, parts)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function getDetails(scope, parts) {
  return getOverride(`${scope}-details`, ...parts) || {};
}

export function setDetails(scope, parts, details) {
  return setOverride(`${scope}-details`, parts, details);
}

export function clearDetails(scope, ...parts) {
  clearOverride(`${scope}-details`, ...parts);
}

export function applyCategoryOverrides(category) {
  const categoryDetails = getDetails("category", [category.slug]);
  return {
    ...category,
    name: categoryDetails.name || category.name,
    tagline: categoryDetails.tagline || category.tagline,
    items: category.items.map((group) => {
      const groupDetails = getDetails("group", [category.slug, group.group]);
      return {
        ...group,
        originalGroup: group.group,
        group: groupDetails.name || group.group,
        products: group.products.map((product) => {
          const originalName = typeof product === "string" ? product : product.name;
          const productDetails = getDetails("product", [category.slug, group.group, originalName]);
          return {
            ...(typeof product === "object" ? product : {}),
            originalName,
            name: productDetails.name || originalName
          };
        })
      };
    })
  };
}
