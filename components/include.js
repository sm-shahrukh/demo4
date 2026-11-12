(() => {
  const components = ["header", "mobile-navigation", "footer"];

  components.forEach((name) => {
    const target = document.querySelector(`[data-component="${name}"]`);
    if (!target) return;

    fetch(`components/${name}.html?v=20261112-31`, { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${name}`);
        return response.text();
      })
      .then((markup) => {
        const template = document.createElement("template");
        template.innerHTML = markup;
        target.replaceWith(template.content);
        if (name === "header") {
          const header = document.querySelector(".td-site-header");
          const updateHeaderShadow = () => {
            header.classList.toggle("td-is-scrolled", window.scrollY > 0);
          };
          updateHeaderShadow();
          window.addEventListener("scroll", updateHeaderShadow, {
            passive: true,
          });
        }
      })
      .catch((error) => {
        console.error(`TravelDeals component error: ${error.message}`);
      });
  });
})();
