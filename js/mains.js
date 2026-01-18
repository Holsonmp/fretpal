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
  var trigger = document.getElementById("hero-date-trigger");
  var popover = document.getElementById("hero-date-popover");
  if (!trigger || !popover) return;

  var startInput = document.getElementById("hero-date-start");
  var endInput = document.getElementById("hero-date-end");
  var clearButton = document.getElementById("hero-date-clear");
  var applyButton = document.getElementById("hero-date-apply");
  var label = document.getElementById("hero-date-label");
  var summary = document.getElementById("hero-date-summary");
  var lastFocusedElement = null;
  var isOpen = false;

  function formatDisplay(start, end) {
    if (!start && !end) return "Dates du voyage";
    var options = { day: "2-digit", month: "short" };
    var hasStart = !!start;
    var hasEnd = !!end;
    var startDate = hasStart ? new Date(start) : null;
    var endDate = hasEnd ? new Date(end) : null;
    if (startDate && endDate) {
      return (
        startDate.toLocaleDateString("fr-FR", options) +
        " – " +
        endDate.toLocaleDateString("fr-FR", options)
      );
    }
    if (startDate) {
      return "À partir du " + startDate.toLocaleDateString("fr-FR", options);
    }
    return "Jusqu’au " + endDate.toLocaleDateString("fr-FR", options);
  }

  function updateTriggerState(active) {
    if (!trigger) return;
    if (active) {
      trigger.classList.add("border-accent-1", "bg-accent-1/20");
    } else {
      trigger.classList.remove("border-accent-1", "bg-accent-1/20");
    }
  }

  function syncDates() {
    if (!startInput || !endInput) return;
    var startValue = startInput.value;
    var endValue = endInput.value;
    if (startValue && endValue && endValue < startValue) {
      endInput.value = startValue;
      endValue = startValue;
    }
    var text = formatDisplay(startValue, endValue);
    if (label) {
      label.textContent = text;
    }
    if (summary) {
      if (startValue || endValue) {
        summary.textContent = text;
        summary.classList.remove("hidden");
      } else {
        summary.textContent = "";
        summary.classList.add("hidden");
      }
    }
    updateTriggerState(!!(startValue || endValue));
  }

  function handleDocumentClick(event) {
    if (!popover.contains(event.target) && !trigger.contains(event.target)) {
      closePopover();
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closePopover();
    }
  }

  function openPopover() {
    if (isOpen) return;
    isOpen = true;
    lastFocusedElement = document.activeElement;
    popover.classList.remove("opacity-0", "scale-95", "pointer-events-none");
    popover.classList.add("opacity-100", "scale-100", "pointer-events-auto");
    trigger.setAttribute("aria-expanded", "true");
    if (startInput) {
      startInput.focus();
    }
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeydown);
  }

  function closePopover() {
    if (!isOpen) return;
    isOpen = false;
    popover.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
    popover.classList.add("opacity-0", "scale-95", "pointer-events-none");
    trigger.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", handleDocumentClick);
    document.removeEventListener("keydown", handleKeydown);
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    } else {
      trigger.focus();
    }
  }

  trigger.addEventListener("click", function () {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  });

  trigger.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen) {
        closePopover();
      } else {
        openPopover();
      }
    }
  });

  if (startInput) {
    startInput.addEventListener("change", syncDates);
  }
  if (endInput) {
    endInput.addEventListener("change", syncDates);
  }

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      if (startInput) startInput.value = "";
      if (endInput) endInput.value = "";
      syncDates();
    });
  }

  if (applyButton) {
    applyButton.addEventListener("click", function () {
      syncDates();
      closePopover();
    });
  }

  syncDates();
})();
