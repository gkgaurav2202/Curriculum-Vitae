// Inserts header.html and footer.html into every page,
// then marks the current page in the menu.
(async function () {
  async function insert(slotId, file) {
    const slot = document.getElementById(slotId);
    if (!slot) return;
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(response.status);
      slot.outerHTML = await response.text();
    } catch (error) {
      console.error("Could not load " + file + ":", error);
    }
  }

  await Promise.all([
    insert("site-header", "header.html"),
    insert("site-footer", "footer.html"),7
  ]);

  // GitHub Pages serves research.html at both /research and /research.html
  const pageName = (path) => (path.split("/").pop() || "index").replace(/\.html$/, "");
  const here = pageName(location.pathname);
  document.querySelectorAll("nav a").forEach((link) => {
    if (pageName(link.getAttribute("href")) === here) {
      link.setAttribute("aria-current", "page");
    }
  });
})();
// Light/dark mode switch. The choice is remembered in the visitor's browser.
(function () {
  const root = document.documentElement;
  try {
    if (localStorage.getItem("theme") === "dark") root.dataset.theme = "dark";
  } catch (e) {}
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".theme-toggle")) return;
    const dark = root.dataset.theme !== "dark";
    if (dark) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
  });
})();
