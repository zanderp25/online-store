function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const itemsHeading = document.getElementById('items-heading');

    if (category) {
        itemsHeading.textContent = `Browse ${category.charAt(0).toUpperCase() + category.slice(1)}`;
        // Fetch and display items related to the category
        fetchItemsByCategory(category);
    } else {
        itemsHeading.textContent = 'Browse All Items';
        // Fetch and display all items
        fetchItemsByCategory();
    }
}

function fetchItemsByCategory(category) {
    // Fetch the product list from products.json
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const itemsList = document.querySelector('.items-list');
            itemsList.innerHTML = ''; // Clear current items

            const items = category ? products.filter(item => item.category === category) : products;
            items.forEach(item => {
                const itemElement = document.createElement('a');
                itemElement.href = `product.html?id=${item.id}`;
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                    <img src="assets/product-images/${item.images[0]}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${formatPrice(item.price)} | ${getRatingStars(item)}</p>
                    <a href="#" onclick="addToCart(event)" class="add-to-cart">
                        <img src="assets/icons/cart-plus.svg" alt="add to cart">
                        <span>Add to Cart</span>
                    </a>
                `;
                itemsList.appendChild(itemElement);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function getRatingStars(item) {
    // Averages the ratings from item.ratings and returns a string of stars
    // Rounded to the nearest half-rating
    const ratings = item.ratings;
    if (!ratings) return 'No ratings yet';

    const totalRatings = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    const averageRating = totalRatings / ratings.length;
    console.log(averageRating);
    const roundedRating = Math.round(averageRating * 2) / 2;
    console.log(roundedRating);

    let ratingStars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= roundedRating) {
            ratingStars += '★';
        } else if (i - 0.5 === roundedRating) {
            ratingStars += '⯪';
        } else {
            ratingStars += '☆';
        }
    }
    return ratingStars;
}

function addToCart(event) {
    event.preventDefault();
    // TODO: Add to cart logic here
}
