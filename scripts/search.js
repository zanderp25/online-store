async function search(event) {
    // Prevent form submission from reloading the page
    event.preventDefault();

    // Get the search query from the input field
    const query = document.querySelector("#search-query").value.trim().toLowerCase();

    try {
        // Fetch products from products.json
        const response = await fetch("products.json");
        if (!response.ok) throw new Error("Failed to fetch products data.");

        const products = await response.json();

        // Filter products based on the search query
        const results = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        // Get the items-list element to display results
        const itemsListElement = document.querySelector(".items-list");

        // Clear previous results
        itemsListElement.innerHTML = "";

        // Display results
        if (results.length > 0) {
            results.forEach(product => {
                const productElement = document.createElement("div");
                productElement.className = "item";
                productElement.innerHTML = `
                    <img src="assets/images/${product.images[0]}" alt="${product.name}" class="product-image">
                    <h2>${product.name}</h2>
                    <p>Category: ${product.category}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Average Rating: ${calculateAverageRating(product.ratings)} / 5</p>
                    <button onclick="addToCart('${product.id}')">Add to Cart</button>
                `;
                itemsListElement.appendChild(productElement);
            });
        } else {
            itemsListElement.innerHTML = "<p>No results found.</p>";
        }
    } catch (error) {
        console.error("Error fetching or displaying products:", error);
        document.querySelector(".items-list").innerHTML = "<p>Error loading products. Please try again later.</p>";
    }
}

// Function to calculate average rating
function calculateAverageRating(ratings) {
    if (!ratings || ratings.length === 0) return "N/A";
    const totalStars = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    return (totalStars / ratings.length).toFixed(1);
}

// Placeholder function for adding products to the cart
function addToCart(productId) {
    console.log(`Product with ID "${productId}" added to the cart.`);
}

// Add event listener to the search form
document.querySelector(".search form").addEventListener("submit", search);
