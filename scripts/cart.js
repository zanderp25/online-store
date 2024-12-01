// Add an item to the cart
function addCartItem(id) {
    try {
        // Get the current cart from localStorage or initialize an empty object
        const cart = JSON.parse(localStorage.getItem('cart')) || {};

        // If the item already exists in the cart, increment its quantity, otherwise add it with quantity 1
        if (cart[id]) {
            cart[id].quantity += 1;
        } else {
            cart[id] = { id, quantity: 1 };
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show a success message
        showPopup('Item added to cart', 'success');

        console.log(`Item ${id} added to the cart.`);
    } catch (error) {
        console.error('Failed to add item to the cart:', error);
    }
}

// showPopup function
function showPopup(message, type = 'success') {
    if (!document.querySelector('.popup-container')) {
        const popupContainer = document.createElement('div');
        popupContainer.className = 'popup-container';
        popupContainer.style.position = 'fixed';
        popupContainer.style.top = '85px';
        popupContainer.style.right = '10px';
        popupContainer.style.zIndex = '1000';
        popupContainer.style.display = 'flex';
        popupContainer.style.flexDirection = 'column';
        popupContainer.style.alignItems = 'flex-end';
        popupContainer.style.justifyContent = 'flex-start';
        document.body.appendChild(popupContainer);
    }

    const popupContainer = document.querySelector('.popup-container');
    const popup = document.createElement('div');
    popup.style.padding = '10px 20px';
    popup.style.margin = '5px';
    popup.style.borderRadius = '5px';
    popup.style.color = 'white';
    popup.style.fontWeight = 'bold';
    popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    popup.style.cursor = 'pointer';
    popup.textContent = message;
    popup.style.backgroundColor = type === 'success' ? 'green' : 'red';
    popup.onclick = () => popup.remove();
    popupContainer.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

// global products list
let products = [];

// Load the cart and display items
async function loadCart() {
    try {
        // Fetch product data (products.json)
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        products = await response.json();

        // Get the current cart from localStorage or initialize an empty object
        const cart = JSON.parse(localStorage.getItem('cart')) || {};

        // Get the #cart-items element
        const cartItemsElement = document.querySelector('#cart-items');
        if (!cartItemsElement) {
            console.error("#cart-items element not found.");
            return;
        }
        cartItemsElement.innerHTML = ''; // Clear existing cart items

        // If the cart is empty, display a message
        if (Object.keys(cart).length === 0) {
            cartItemsElement.textContent = 'Your cart is empty.';
            return;
        }

        // Populate the cart items
        let total = 0;
        for (const [id, item] of Object.entries(cart)) {
            const product = products.find(p => p.id === id);

            if (!product) continue; // Skip if the product is not found in products.json

            // Create cart item elements
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            let formattedQuantity = new Intl.NumberFormat('en-US').format(item.quantity);

            cartItem.innerHTML = `
                <img src="assets/product-images/${product.images[0]}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p>Price: ${formatPrice(product.price)}</p>
                    <p>Quantity: ${formattedQuantity}</p>
                    <p>Subtotal: ${formatPrice(product.price * item.quantity)}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="removeCartItem('${id}')" class="remove-button">Remove</button>
                    <button onclick="adjustCartItem('${id}', ${item.quantity + 1})" class="inc-button">+</button>
                    <button onclick="adjustCartItem('${id}', ${item.quantity - 1})" class="dec-button">-</button>
                </div>
            `;

            cartItemsElement.appendChild(cartItem);

            // Update the total
            total += product.price * item.quantity;
        }

        // Display total price
        const totalElement = document.createElement('div');
        totalElement.id = 'cart-total';
        totalElement.innerHTML = `<h3>Total: ${formatPrice(total)}</h3>`;
        cartItemsElement.appendChild(totalElement);

        // Add a clear cart button
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear Cart';
        clearButton.className = 'clear-cart-button';
        clearButton.onclick = clearCart;
        cartItemsElement.appendChild(clearButton);
    } catch (error) {
        console.error('Failed to load the cart:', error);
        document.querySelector('#cart-items').textContent = 'An error occurred while loading the cart.';
    }
}

// Adjust quantity of an item in the cart
function adjustCartItem(id, quantity) {
    try {
        // Get the current cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || {};

        // If the item exists in the cart, adjust its quantity
        if (cart[id]) {
            if (quantity === 0) {
                delete cart[id];
                console.log(`Item ${id} removed from the cart.`);
            } else {
                cart[id].quantity = quantity;
                console.log(`Item ${id} quantity adjusted to ${quantity}.`);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Reload the cart to reflect changes
        loadCart();
    } catch (error) {
        console.error('Failed to adjust item quantity in the cart:', error);
    }
}

// Remove an item from the cart
function removeCartItem(id) {
    try {
        // Get the current cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || {};

        // If the item exists in the cart and quantity is more than one, confirm removal
        if (cart[id] && cart[id].quantity > 1) {
            const product = products.find(p => p.id === id);
            const confirmRemoval = confirm(`Are you sure you want to remove all ${product.name}?`);
            if (!confirmRemoval) {
            return;
            }
        }
        // If the item exists in the cart, remove it
        if (cart[id]) {
            delete cart[id];
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(`Item ${id} removed from the cart.`);
        }

        // Reload the cart to reflect changes
        loadCart();
    } catch (error) {
        console.error('Failed to remove item from the cart:', error);
    }
}

// Clear all items from the cart
function clearCart() {
    try {
        // Remove the cart from localStorage
        const confirmClear = confirm('Are you sure you want to clear the cart?');
        if (!confirmClear) {
            return;
        }
        localStorage.removeItem('cart');
        console.log('Cart cleared.');

        // Reload the cart to reflect changes
        loadCart();
    } catch (error) {
        console.error('Failed to clear the cart:', error);
    }
}
