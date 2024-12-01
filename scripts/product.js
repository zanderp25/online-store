async function loadProduct(productId) {
    try {
        // Fetch products.json
        const response = await fetch("products.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data
        const products = await response.json();

        // Find the product by the given id
        const product = products.find(item => item.id === productId);

        // If product is not found, handle the error
        if (!product) {
            console.error(`Product with ID "${productId}" not found.`);
            document.querySelector("#product-details").textContent = "Product not found.";
            return;
        }

        // Fill the respective elements with product values
        document.querySelector("#product-name").textContent = product.name || "N/A";
        document.querySelector("#product-price").textContent = formatPrice(product.price) || "N/A";
        document.querySelector("#product-image").src = `assets/product-images/${product.images[0] || "placeholder.jpg"}`;
        document.querySelector("#product-image").alt = product.name || "Product image";
        document.querySelector("#product-description").textContent = product.description || "No description available.";
        document.querySelector("#product-cart-button").onclick = () => {addCartItem(product.id)};

        // Display ratings
        const ratingsElement = document.querySelector("#product-ratings");
        ratingsElement.innerHTML = ""; // Clear any existing content
        if (product.ratings && product.ratings.length > 0) {
            product.ratings.forEach(rating => {
                const li = document.createElement("li");
                let stars = getRatingStarsHTML(rating.stars);
                let formattedDate = new Date(rating.createdOn).toLocaleDateString();
                li.innerHTML = `
                    <span class="rating-stars">${stars}</span> | <span class="author">${rating.author}</span>
                    <div>${rating.body}</div>
                `;
                ratingsElement.appendChild(li);
            });
        } else {
            ratingsElement.innerHTML = "<li>No ratings available.</li>";
        }
    } catch (error) {
        // Handle any errors during the fetch or parsing
        console.error("Failed to load the product:", error);
        document.querySelector("#product-details").textContent = "An error occurred while loading the product.";
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function getRatingStarsHTML(stars) {
    let ratingStars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= stars) {
            ratingStars += '<img src="assets/icons/star-filled.svg" alt="filled star">';
        } else {
            ratingStars += '<img src="assets/icons/star.svg" alt="empty star">';
        }
    }
    return ratingStars;
}