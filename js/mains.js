// Logic for mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      // Update icon logic (Menu <-> X) if needed
      // Currently just toggling visibility

      if (!mobileMenu.classList.contains("hidden")) {
        // Menu is open, prevent scrolling
        document.body.style.overflow = "hidden";
      } else {
        // Menu is closed, allow scrolling
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking a link inside it
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        document.body.style.overflow = "";
      });
    });
  }
});
(function () {
  var startInput = document.getElementById("hero-date-start");
  var endInput = document.getElementById("hero-date-end");

  if (!startInput || !endInput) return;

  function getTodayISO() {
    var d = new Date();
    var month = "" + (d.getMonth() + 1);
    var day = "" + d.getDate();
    var year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return year + "-" + month + "-" + day;
  }

  var todayISO = getTodayISO();

  if (startInput && todayISO) {
    startInput.setAttribute("min", todayISO);
  }
  if (endInput && todayISO) {
    endInput.setAttribute("min", todayISO);
  }

  function syncDates() {
    var startValue = startInput.value;
    var endValue = endInput.value;

    if (todayISO && startValue && startValue < todayISO) {
      startValue = todayISO;
      startInput.value = todayISO;
    }
    
    // Update end date min based on start date
    if (startValue) {
      endInput.setAttribute("min", startValue);
    } else if (todayISO) {
      endInput.setAttribute("min", todayISO);
    }

    if (startValue && endValue && endValue < startValue) {
      endInput.value = startValue;
    }
  }

  startInput.addEventListener("change", syncDates);
  endInput.addEventListener("change", syncDates);

  // Initialize constraints
  syncDates();
})();
