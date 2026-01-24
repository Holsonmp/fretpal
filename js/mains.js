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
  const startInput = document.getElementById("hero-date-start");
  const endInput = document.getElementById("hero-date-end");

  if (!startInput || !endInput) return;

  const fpConfig = {
    locale: "fr",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "j F Y",
    minDate: "today",
    disableMobile: true,
    theme: "light"
  };

  const startPicker = flatpickr(startInput, {
    ...fpConfig,
    onChange: function(selectedDates, dateStr, instance) {
      if (selectedDates[0]) {
        endPicker.set("minDate", selectedDates[0]);
        if (endPicker.selectedDates[0] && endPicker.selectedDates[0] < selectedDates[0]) {
          endPicker.setDate(selectedDates[0]);
        }
      }
    }
  });

  const endPicker = flatpickr(endInput, fpConfig);
})();

const Select = (function() {
  function init(selector) {
    document.querySelectorAll(selector).forEach((el) => singleSelect(el))
    document.querySelectorAll('.js-multiple-select').forEach((el) => multipleSelect(el))
  }

  function multipleSelect(target) {
    const button = target.querySelector('.js-button')
    const title = button.querySelector('.js-button-title')
    
    button.addEventListener('click', () => {
      let dropdown = target.querySelector('.js-dropdown')
      
      if (dropdown.classList.contains('-is-visible')) {
        dropdown.classList.remove('-is-visible')
      } else {
        closeAlldropdowns()
        dropdown.classList.add('-is-visible')
      }
    })

    const dropdown = target.querySelector('.js-dropdown')
    const options = dropdown.querySelectorAll('.js-options > *')

    options.forEach((el) => {
      el.addEventListener('click', () => {
        let selectedValues = []
        el.classList.toggle('-is-choosen')

        const array = dropdown.querySelectorAll('.-is-choosen .js-target-title')
        array.forEach((el2) => {
          selectedValues.push(el2.innerHTML)
        })

        if (!array.length) {
          title.innerHTML = "Default"
          target.setAttribute("data-select-value", "")
        } else {
          title.innerHTML = selectedValues.join(', ')
          target.setAttribute("data-select-value", selectedValues.join(', '))
        }

        const checkbox = el.querySelector('input')
        checkbox.checked = !checkbox.checked
      })
    })
  }

  function singleSelect(target) {
    const button = target.querySelector('.js-button')
    const title = button.querySelector('.js-button-title')
    
    if (target.classList.contains('js-liveSearch')) {
      liveSearch(target)
    }

    button.addEventListener('click', () => {
      let dropdown = target.querySelector('.js-dropdown')
      
      if (dropdown.classList.contains('-is-visible')) {
        dropdown.classList.remove('-is-visible')
      } else {
        closeAlldropdowns()
        dropdown.classList.add('-is-visible')
      }
      
      if (target.classList.contains('js-liveSearch')) {
        target.querySelector('.js-search').focus()
      }
    })

    const dropdown = target.querySelector('.js-dropdown')
    const options = dropdown.querySelectorAll('.js-options > *')

    options.forEach((el) => {
      el.addEventListener('click', () => {
        title.innerHTML = el.innerHTML
        target.setAttribute("data-select-value", el.getAttribute('data-value'))
        dropdown.classList.toggle('-is-visible')
      })
    })
  }

  function liveSearch(target) {
    const search = target.querySelector('.js-search')
    const options = target.querySelectorAll('.js-options > *')
    
    search.addEventListener('input', (event) => {
      let searchTerm = event.target.value.toLowerCase()

      options.forEach((el) => {
        el.classList.add('d-none')

        if (el.getAttribute('data-value').includes(searchTerm)) {
          el.classList.remove('d-none')
        }
      })
    })
  }

  function closeAlldropdowns() {
    const targets = document.querySelectorAll('.js-select, .js-multiple-select')
    if (!targets) return
    
    targets.forEach(el => {
      if (el.querySelector('.-is-visible')) {
        el.querySelector('.-is-visible').classList.remove('-is-visible')
      }
    })
  }

  return {
    init: init,
  }
})()

Select.init('.js-select');

window.onclick = function(event) {
  if (!event.target.closest('.js-select')) {
    const targets = document.querySelectorAll('.js-select')
    if (!targets) return
    
    targets.forEach(el => {
      if (el.querySelector('.-is-visible')) {
        el.querySelector('.-is-visible').classList.remove('-is-visible')
      }
    })
  }
}
