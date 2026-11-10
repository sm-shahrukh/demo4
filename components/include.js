document.querySelectorAll("[data-component]").forEach(async (slot) => {
  const name = slot.dataset.component;
  if (!/^[a-z-]+$/.test(name)) return;

  try {
    const response = await fetch(`components/${name}.html`);
    if (!response.ok) throw new Error(`Unable to load ${name}`);
    slot.outerHTML = await response.text();
  } catch (error) {
    console.error(`Failed to load shared ${name} component.`, error);
  }
});
