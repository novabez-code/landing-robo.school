import { pack } from "./source.js";
function packHTML({ id, name, price, text }) {
  const HTML = `
    <li
        id="${id}"
        class="pack__card"
         tabindex="0"
         role="button"
         aria-label="Выбрать пакет"
         >
         <p class="pack__stat">ВЫБРАН</p>
        <h3 class="pack__card--title">${name}</h3>
         <p class="pack__card--price">${price}</p>
        <p class="pack__card--text">
          ${text}
         </p>
         <a href="#footer" class="pack__card--btn btn btn--red">
        Оставить заявку
        </a>
    </li>
    `;

  return HTML;
}

export function renderPacks(arr) {
  const list = document.querySelector(".pack__list");

  arr.forEach((obj) => {
    list.insertAdjacentHTML("beforeend", packHTML(obj));
  });
}

export let actPack = 0;
export function activePack() {
  const packs = Array.from(document.querySelectorAll(".pack__card"));

  if (packs[actPack]) {
    packs[actPack].classList.add("active");
  }

  packs.forEach((pack, index) => {
    pack.addEventListener("click", (e) => {
      packs.forEach((pack) => pack.classList.remove("active"));

      pack.classList.add("active");

      actPack = index;
    });
  });
}
