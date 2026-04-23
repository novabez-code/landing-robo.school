export function header() {
  let lastScroll = 0;
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("hidden");
      lastScroll = currentScroll;
      return;
    }

    if (currentScroll > lastScroll && !header.classList.contains("hidden")) {
      header.classList.add("hidden");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("hidden")
    ) {
      header.classList.remove("hidden");
    }

    lastScroll = currentScroll;
  });
}
