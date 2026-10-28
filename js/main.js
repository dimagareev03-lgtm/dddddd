/* ===== Кастадент — скрипты ===== */
(function () {
  "use strict";

  // --- Мобильное меню ---
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Закрываем меню после клика по ссылке
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Подсветка активного пункта меню ---
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // --- Форма записи на приём ---
  var form = document.querySelector("#booking-form");
  if (form) {
    var success = form.querySelector(".form-success");

    function setError(field, hasError) {
      var wrap = field.closest(".field");
      if (wrap) wrap.classList.toggle("invalid", hasError);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");

      if (!name.value.trim()) { setError(name, true); valid = false; }
      else { setError(name, false); }

      // Телефон: минимум 10 цифр
      var digits = (phone.value.match(/\d/g) || []).length;
      if (digits < 10) { setError(phone, true); valid = false; }
      else { setError(phone, false); }

      if (!valid) {
        if (success) success.classList.remove("show");
        var firstBad = form.querySelector(".field.invalid input, .field.invalid select");
        if (firstBad) firstBad.focus();
        return;
      }

      if (success) {
        success.textContent =
          "Спасибо, " + name.value.trim() + "! Заявка принята — мы перезвоним вам в ближайшее время.";
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });

    // Снимаем подсветку ошибки при вводе
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.addEventListener("input", function () { setError(el, false); });
    });
  }

  // --- Год в подвале ---
  var yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
