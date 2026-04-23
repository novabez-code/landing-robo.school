import { trainers } from "./source.js";
import { openModal } from "./trainer_modal.js";

function trainerHTML({ id, name, img, text }) {
  const HTML = `
      <li class="trainer__card" data-id="${id}">
              <img
                loading="lazy"
                class="trainer__card--img"
                src="${img}"
                alt="${name}"
              />
              <div class="trainer__card--info">
                <h3 class="trainer__card--info--name">${name}</h3>
                <p class="trainer__card--info--text">
                  ${text}
                </p>
                <button class="trainer__card--info--link">Подробнее</button>
              </div>
            </li>
    `;
  return HTML;
}

export function trainerPacks(arr) {
  const list = document.querySelector(".trainer__list");

  arr.forEach((obj) => {
    list.insertAdjacentHTML("beforeend", trainerHTML(obj));
  });
}

let sliderIndex = 1;

export function sliderTrainer() {
  const list = document.querySelector(".trainer__list");
  const slides = document.querySelectorAll(".trainer__card");
  const nextBtn = document.querySelector(".next_btn");
  const prevBtn = document.querySelector(".prev_btn");
  const line = document.querySelector(".trainer__line");
  const lineActive = document.querySelector(".trainer__line--active");

  const firstClone = slides[0].cloneNode(true);
  const secondClone = slides[1].cloneNode(true);
  const thirdClone = slides[2].cloneNode(true);
  const fourthClone = slides[3].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  list.append(firstClone);
  list.append(secondClone);
  list.append(thirdClone);
  list.append(fourthClone);
  list.prepend(lastClone);

  let startX = 0;
  let endX = 0;

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  if (!list || slides.length === 0 || !nextBtn || !prevBtn) return;

  function checkIndex() {
    if (sliderIndex === slides.length + 1) {
      sliderIndex = 1;
      moveSlider(false);
    }
    if (sliderIndex === 0) {
      sliderIndex = slides.length;
      moveSlider(false);
    }
  }
  function moveSlider(animate = true) {
    const cardWidth = slides[0].clientWidth;
    const gap = parseFloat(getComputedStyle(list).gap) || 0;

    list.style.transition = animate ? "transform 0.3s ease-in-out" : "none";

    const offset = (cardWidth + gap) * sliderIndex;
    list.style.transform = `translateX(-${offset}px)`;
    updateLine();
  }

  list.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  list.addEventListener(
    "touchend",
    (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    },
    { passive: true },
  );

  list.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    list.style.transition = "none";
    list.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const currentX = e.pageX;
    const dragDistance = currentX - startX;

    const cardWidth = slides[0].clientWidth;
    const gap = parseFloat(getComputedStyle(list).gap) || 0;
    const baseOffset = (cardWidth + gap) * sliderIndex;

    list.style.transform = `translateX(${-baseOffset + dragDistance}px)`;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    list.style.cursor = "grab";

    const endX = e.pageX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextBtn.click();
      } else {
        prevBtn.click();
      }
    } else {
      moveSlider();
    }
  });

  function handleSwipe() {
    const threshold = 50;

    if (startX - endX > threshold) {
      nextBtn.click();
    } else if (endX - startX > threshold) {
      prevBtn.click();
    }
  }

  list.addEventListener("transitionend", checkIndex);

  nextBtn.addEventListener("click", () => {
    if (sliderIndex > slides.length) return;
    sliderIndex++;
    moveSlider();
    updateLine();
    updateFocus();
  });

  prevBtn.addEventListener("click", () => {
    if (sliderIndex <= 0) return;
    sliderIndex--;
    moveSlider();
    updateLine();
    updateFocus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });

  function updateLine() {
    const totalSlides = slides.length;
    const lineWidth = line.clientWidth;

    const activeWidth = lineWidth / totalSlides;
    lineActive.style.width = `${activeWidth}px`;

    let visualIndex = sliderIndex - 1;

    if (visualIndex < 0) visualIndex = totalSlides - 1;
    if (visualIndex >= totalSlides) visualIndex = 0;

    lineActive.style.left = `${visualIndex * activeWidth}px`;
  }
  function updateFocus() {
    const allLinks = list.querySelectorAll(".trainer__card--info--link");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("tabindex", "0");
        } else {
          entry.target.setAttribute("tabindex", "-1");
        }
      });
    });

    allLinks.forEach((link) => {
      observer.observe(link);
    });
  }

  window.addEventListener("resize", () => moveSlider(false));
  moveSlider(false);
  updateFocus();
}

export function btnOn() {
  const list = document.querySelector(".trainer__list");

  list.addEventListener("click", (e) => {
    const link = e.target.closest(".trainer__card--info--link");
    if (!link) return;

    e.preventDefault();
    const id = link.closest(".trainer__card").dataset.id;

    openModal(id);
  });
}
