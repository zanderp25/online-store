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

        console.log(`Item ${id} added to the cart.`);
    } catch (error) {
        console.error('Failed to add item to the cart:', error);
    }
}

// Load the cart and display items
async function loadCart() {
    try {
        // Fetch product data (products.json)
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();

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

            cartItem.innerHTML = `
                <img src="assets/images/${product.images[0]}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Subtotal: $${(product.price * item.quantity).toFixed(2)}</p>
                    <button onclick="removeCartItem('${id}')">Remove</button>
                </div>
            `;

            cartItemsElement.appendChild(cartItem);

            // Update the total
            total += product.price * item.quantity;
        }

        // Display total price
        const totalElement = document.createElement('div');
        totalElement.id = 'cart-total';
        totalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
        cartItemsElement.appendChild(totalElement);

        // Add a clear cart button
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear Cart';
        clearButton.onclick = clearCart;
        cartItemsElement.appendChild(clearButton);
    } catch (error) {
        console.error('Failed to load the cart:', error);
        document.querySelector('#cart-items').textContent = 'An error occurred while loading the cart.';
    }
}

// Remove an item from the cart
function removeCartItem(id) {
    try {
        // Get the current cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || {};

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
        localStorage.removeItem('cart');
        console.log('Cart cleared.');

        // Reload the cart to reflect changes
        loadCart();
    } catch (error) {
        console.error('Failed to clear the cart:', error);
    }
}
