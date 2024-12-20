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
                    <p class="price-rating">${formatPrice(item.price)} | <span class="rating-stars">${getRatingStarsHTML(item)}</span></p>
                    <a href="#" onclick="addCartItem('${item.id}')" class="add-to-cart">
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
    // console.log(averageRating);
    const roundedRating = Math.round(averageRating * 2) / 2;
    // console.log(roundedRating);

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

function getRatingStarsHTML(item){
    // Use this because for some reason Apple devices don't display the half-star character correctly
    // use this to use the SVG stars in /assets/icons: star.svg, star-half.svg, star-filled.svg
    const ratings = item.ratings;
    if (!ratings) return 'No ratings yet';

    let ratingStars = getRatingStars(item);
    let ratingStarsHTML = '';

    for (let i = 0; i < 5; i++) {
        if (ratingStars[i] === '★') {
            ratingStarsHTML += '<img src="assets/icons/star-filled.svg" alt="filled star">';
        } else if (ratingStars[i] === '⯪') {
            ratingStarsHTML += '<img src="assets/icons/star-half.svg" alt="half star">';
        } else {
            ratingStarsHTML += '<img src="assets/icons/star.svg" alt="empty star">';
        }
    }

    return ratingStarsHTML;
}