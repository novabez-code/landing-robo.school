import emailjs from "./email.min.js";
import { actPack } from "./pack.js";
import { pack } from "./source.js";

export function submitForm() {
  const form = document.querySelector(".form__form");
  if (!form) return;

  const message = document.querySelector(".form__mess");
  const btn = form.querySelector(".form__btn");
  let timerId = null;

  const discount = 10;
  const EMAILJS_KEY = "_OxflTW4NjZYfvCgK";
  const SERVICE_ID = "service_8mwjkz7";
  const TEMPLATE_ID = "template_yuysfce";

  emailjs.init(EMAILJS_KEY);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (btn.disabled) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (data.honeypot && data.honeypot.trim() !== "") {
      console.log("Бот обнаружен!");
      form.reset();
      return;
    }
    btn.textContent = "Отправляется...";
    btn.disabled = true;

    data.selectedDiscount = discount + "%";
    data.selectedPackage = pack[actPack].name;
    data.timestamp = new Date().toISOString();

    data.selectedPackageFullPrice = pack[actPack].priceNumber + " ₽";
    const finalPrice = (pack[actPack].priceNumber * (100 - discount)) / 100;
    data.selectedPackagePrice = Math.round(finalPrice) + " ₽";

    const phone = data.phone ? `${data.phone}` : "не указан";
    const email = data.email ? `${data.email}` : "не указан";

    const obj = {
      name: data.name,
      phone: phone,
      form_email: email,
      pack: data.selectedPackage,
      discount: data.selectedDiscount,
      price: data.selectedPackagePrice,
    };

    if (timerId) clearTimeout(timerId);
    message.textContent = "";
    message.classList.remove("ok", "err");

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, obj)
      .then(() => {
        showMess(`Заявка отправлена, проверьте почту ${email}`, "ok");
        console.log("Заявка отправлена!");
        form.reset();
      })
      .catch((err) => {
        showMess(`Не удалось отправить заявку.`, "err");
        console.log("Ошибка EmailJS:", err);
      })
      .finally(() => {
        btn.textContent = "Оформить заявку";
        btn.disabled = false;
      });
  });

  function showMess(mess, type = "ok") {
    if (timerId) clearTimeout(timerId);

    message.textContent = mess;
    if (type === "ok") {
      message.classList.add("ok");
      message.classList.remove("err");
    } else {
      message.classList.add("err");
      message.classList.remove("ok");
    }
    timerId = setTimeout(() => {
      message.textContent = "";
      message.classList.remove("ok", "err");
    }, 4000);
  }
}
