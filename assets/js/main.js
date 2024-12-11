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


document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the 'Add to Cart' button on the single product page
    const addToCartButton = document.querySelector('.single-pro-details .normal');
    
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            // Get product details
            const productName = document.querySelector('.single-pro-details h4').textContent;
            const productPrice = document.querySelector('.single-pro-details h2').textContent;
            const productSize = document.querySelector('.single-pro-details select').value;
            const productQuantity = document.querySelector('.single-pro-details input[type="number"]').value;

            // Check if size is selected
            if (productSize === "Select Size") {
                alert("Please select a size before adding to cart!");
                return;
            }

            // Prepare the product object
            const product = {
                name: productName,
                price: productPrice,
                size: productSize,
                quantity: productQuantity
            };

            // Save the product to localStorage (used to share data between pages)
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));

            // Show alert
            alert(`${productName} has been added to your cart!`);
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalValue = document.getElementById('subtotal-value');
    const totalValue = document.getElementById('total-value');
    const couponInput = document.getElementById('coupon-input');
    const applyCouponButton = document.getElementById('apply-coupon');
    const proceedCheckoutButton = document.getElementById('proceed-checkout');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let discountApplied = false;

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemSubtotal = parseFloat(item.price.replace('$', '')) * item.quantity;
            subtotal += itemSubtotal;

            const cartRow = document.createElement('tr');
            cartRow.innerHTML = `
                <td><a href="#" class="remove-item" data-index="${index}"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" class="cart-quantity" value="${item.quantity}" data-index="${index}"></td>
                <td>$${itemSubtotal.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(cartRow);
        });

        subtotalValue.textContent = `$${subtotal.toFixed(2)}`;
        totalValue.textContent = `$${(discountApplied ? subtotal * 0.85 : subtotal).toFixed(2)}`;
    };

    const showAlert = (message) => {
        const alertBox = document.createElement('div');
        alertBox.textContent = message;
        alertBox.style.position = 'fixed';
        alertBox.style.top = '50%';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translate(-50%, -50%)';
        alertBox.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
        alertBox.style.color = '#fff';
        alertBox.style.padding = '20px';
        alertBox.style.borderRadius = '8px';
        alertBox.style.zIndex = '1000';
        alertBox.style.textAlign = 'center';

        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    };

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    cartItemsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('cart-quantity')) {
            const index = e.target.dataset.index;
            const newQuantity = parseInt(e.target.value, 10);
            cart[index].quantity = newQuantity > 0 ? newQuantity : 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    applyCouponButton.addEventListener('click', () => {
        const couponCode = couponInput.value.trim().toUpperCase();
        const validCoupon = /^[A-Z0-9]{6}$/;

        if (validCoupon.test(couponCode)) {
            discountApplied = true;
            renderCart();
            showAlert('Congratulations, you have received a 15% discount on all your purchases!');
        } else {
            showAlert('Invalid coupon code. Please try again.');
        }
    });

    proceedCheckoutButton.addEventListener('click', () => {
        showAlert('Thank you for buying from us. This is just an Internship project.');
    });

    renderCart();
});
