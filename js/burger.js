export function burger() {
  const burger = document.querySelector(".header__burger--btn");
  if (!burger) return;

  const header = document.querySelector(".header");
  const links = document.querySelectorAll(".header__link");

  burger.addEventListener("click", () => {
    header.classList.toggle("open");
    document.body.classList.toggle("lock");
  });

  burger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      header.classList.toggle("open");
      document.body.classList.toggle("lock");
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
      document.body.classList.remove("lock");
    });
  });
}
