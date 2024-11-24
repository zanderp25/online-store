function onLoad() {
    fetchCategories();
}

function fetchCategories() {
    fetch('categories.json')
    .then(response => response.json())
    .then(categories => {
        const categoriesList = document.querySelector('.categories-list');

        categories.forEach(category => {
        const categoryElement = document.createElement('a');
        categoryElement.href = "browse.html?category=" + category.id;
        categoryElement.classList.add('category');

        const imgElement = document.createElement('img');
        imgElement.src = "assets/category-images/" + category.image;
        imgElement.alt = category.name;

        const h3Element = document.createElement('h3');
        h3Element.textContent = category.name;

        categoryElement.appendChild(imgElement);
        categoryElement.appendChild(h3Element);
        categoriesList.appendChild(categoryElement);
        });
    })
    .catch(error => console.error('Error loading categories: ', error));
}
