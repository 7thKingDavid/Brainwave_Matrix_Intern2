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
});
