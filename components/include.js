document.querySelectorAll("[data-component]").forEach(async (slot) => {
  const name = slot.dataset.component;
  if (!/^[a-z-]+$/.test(name)) return;

  try {
    const response = await fetch(`components/${name}.html`);
    if (!response.ok) throw new Error(`Unable to load ${name}`);
    slot.outerHTML = await response.text();

    if (name === "header") {
      const header = document.querySelector(".td-header");
      if (!header) return;

      const getStickyThreshold = () => header.getBoundingClientRect().top + window.scrollY;
      let stickyThreshold = getStickyThreshold();
      const updateStickyShadow = () => {
        header.classList.toggle("is-stuck", window.scrollY >= stickyThreshold);
      };

      window.addEventListener("scroll", updateStickyShadow, { passive: true });
      window.addEventListener("resize", () => {
        stickyThreshold = getStickyThreshold();
        updateStickyShadow();
      });
      updateStickyShadow();
    }
  } catch (error) {
    console.error(`Failed to load shared ${name} component.`, error);
  }
});
