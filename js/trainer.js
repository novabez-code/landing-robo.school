import { trainers } from "./source.js";
import { openModal } from "./trainer_modal.js";

function trainerHTML({ id, name, img, text }) {
  const HTML = `
      <li class="trainer__card splide__slide " data-id="${id}">
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

// -----------------
export function sliderInit() {
  trainerPacks(trainers);
  const splide = new Splide(".splide", {
    type: "loop",
    perPage: 3,
    gap: "30px",
    autoplay: true,
    perMove: 1,
    focus: 0,
    paginationKeyboard: false,
    breakpoints: {
      1024: {
        perPage: 2,
        gap: "20px",
      },
      440: {
        perPage: 1,
        gap: "10px",
      },
    },
  });

  splide.on("pagination:mounted", function (data) {
    data.items.forEach(function (item) {
      item.button.setAttribute("tabindex", "-1");
      item.button.setAttribute("disabled", "true");
      item.button.style.pointerEvents = "none";

      item.button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });
  });

  splide.on("move", function () {
    const paginationButtons = document.querySelectorAll(
      ".splide__pagination button",
    );
    paginationButtons.forEach((button) => {
      button.setAttribute("tabindex", "-1");
    });
  });

  splide.mount();
}

export function trainerPacks(arr) {
  const list = document.querySelector(".splide__list");

  arr.forEach((obj) => {
    list.insertAdjacentHTML("beforeend", trainerHTML(obj));
  });
}
export function btnOn() {
  const list = document.querySelector(".splide__list");

  list.addEventListener("click", (e) => {
    const link = e.target.closest(".trainer__card--info--link");
    if (!link) return;

    e.preventDefault();
    const id = link.closest(".trainer__card").dataset.id;

    openModal(id);
  });
}

btnOn();
