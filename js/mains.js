// Logic for mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      
      // Update icon logic (Menu <-> X) if needed
      // Currently just toggling visibility
      
      if (!mobileMenu.classList.contains('hidden')) {
        // Menu is open, prevent scrolling
        document.body.style.overflow = 'hidden';
      } else {
        // Menu is closed, allow scrolling
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link inside it
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }
});