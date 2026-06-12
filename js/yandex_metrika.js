export function yandex_metrika_init() {
  window.ym =
    window.ym ||
    function () {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
  window.ym.l = 1 * new Date();

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";

  document.head.appendChild(script);

  ym(109805716, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer",
    triggerLinkHooks: true,
  });
}
