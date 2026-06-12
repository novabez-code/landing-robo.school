export function initAnalytics() {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-WZ0QFKWSJK";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", "G-WZ0QFKWSJK");
}
