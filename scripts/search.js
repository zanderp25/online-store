async function search(event) {
    // Prevent form submission from reloading the page
    event.preventDefault();

    // Get the search query from the input field
    const query = document.querySelector("#search-query").value.trim().toLowerCase();
    // Update the URL without reloading the page
    const newUrl = `${window.location.pathname}?q=${encodeURIComponent(query)}`;
    window.history.pushState({ path: newUrl }, "", newUrl);

    await loadList(query);
}

async function loadList(query) {
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

        // Populate the cart with the results
        populateList(results);
    } catch (error) {
        console.error("Error fetching or displaying products:", error);
        document.querySelector(".items-list").innerHTML = "<p>Error loading products. Please try again later.</p>";
    }
}

function populateList(results) {
    // Get the items-list element to display results
    const itemsListElement = document.querySelector(".items-list");

    // Clear previous results
    itemsListElement.innerHTML = "";

    // Display results
    if (results.length > 0) {
        results.forEach(product => {
            console.log(product);
            const productElement = document.createElement("div");
            productElement.className = "item";
            productElement.innerHTML = `
                <img src="assets/product-images/${product.images[0]}" alt="${product.name}" class="product-image">
                <h2>${product.name}</h2>
                <div>Price: ${formatPrice(product.price)} | <span class="rating-stars">${getRatingStarsHTML(product)}</span></div>
                <a href="#" onclick="addCartItem(event)" class="add-to-cart">
                    <img src="assets/icons/cart-plus.svg" alt="add to cart">
                    <span>Add to Cart</span>
                </a>
            `;
            itemsListElement.appendChild(productElement);
        });
    } else {
        itemsListElement.innerHTML = "<p>No results found.</p>";
    }
}

function loadSearch(){
    // Check if there's a "?query=" in the URL and load the cart accordingly
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    if (query) {
        loadList(query.toLowerCase());
        document.querySelector("#search-query").value = query;
    }
}
