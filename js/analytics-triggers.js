export function initTriggers() {
  const form = document.querySelector(".form__form");
  if (form) {
    form.addEventListener("submit", () => {
      window.gtag("event", "form_submission");
    });
  }

  const nextSliderBtn = document.querySelector(".splide__arrow--next");
  if (nextSliderBtn) {
    nextSliderBtn.addEventListener("click", () => {
      window.gtag("event", "click_next_slide");
    });
  }

  const prevSliderBtn = document.querySelector(".splide__arrow--prev");
  if (prevSliderBtn) {
    prevSliderBtn.addEventListener("click", () => {
      window.gtag("event", "click_prev_slide");
    });
  }
}

export function initYanTriggers() {
  const mainBtn = document.querySelector(".intro__btn");
  if (mainBtn) {
    mainBtn.addEventListener("click", () => {
      console.log("[xeeee");
      ym(109805716, "reachGoal", "568319540");
    });
  }
}
