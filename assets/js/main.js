/*
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById('loading-overlay');

  // Hide the loading overlay after 2 seconds
  setTimeout(() => {
      overlay.style.display = 'none';
  }, 2000);

  // Add-to-cart button event
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
          alert(`Added ${e.target.dataset.name} to cart!`);
      });
  });
}); */

// making the navbar interactive on smaller screens
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}
