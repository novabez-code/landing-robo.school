import { actPack } from "./pack.js";
import { pack } from "./source.js";
export function submitForm() {
  const form = document.querySelector(".form__form");
  const discount = 10;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.selectedDiscount = discount + "%";
    data.selectedPackage = pack[actPack].name;
    data.timestamp = new Date().toISOString();

    data.selectedPackageFullPrice = pack[actPack].priceNumber + " ₽";
    const finalPrice = (pack[actPack].priceNumber * (100 - discount)) / 100;
    data.selectedPackagePrice = Math.round(finalPrice) + " ₽";

    const btn = form.querySelector(".form__btn");
    btn.textContent = "Отправляется...";
    btn.disabled = true;

    const phone = data.phone ? `${data.phone}` : "не указан";
    const email = data.email ? `${data.email}` : "не указан";

    setTimeout(() => {
      alert(`
        Заявка отправлена!
        Отправлено в: ${data.timestamp}

        Имя: ${data.name}
        Телефон: ${phone}
        E-mail: ${email}

        Вы выбрали пакет: ${data.selectedPackage}
        Скидка: ${data.selectedDiscount}
        Цена: ${data.selectedPackagePrice}
        `);
      form.reset();
      btn.textContent = "Оформить заявку";
      btn.disabled = false;
    }, 3000);
  });
}
