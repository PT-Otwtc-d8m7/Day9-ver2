const productList = document.getElementById('product-list');
const loadBtn = document.getElementById('load-btn');
const loadMoreBtn = document.getElementById('load-more-btn');

let products = [];
let currentIndex = 0;
const productsPerPage = 5;

loadBtn.addEventListener('click', () => {
    fetchProducts()
        .then(() => {
            showProducts();
            loadBtn.style.display = 'none';
            loadMoreBtn.style.display = 'inline-block';
        })
        .catch(error => console.error('Error fetching products:', error));
});

loadMoreBtn.addEventListener('click', () => {
    currentIndex += productsPerPage;
    showProducts();
});

function fetchProducts() {
    return fetch('https://fakestoreapi.com/products?limit=10&authuser=0')
        .then(response => response.json())
        .then(data => {
            products = data;
        });
}

function showProducts() {
    const endIndex = Math.min(currentIndex + productsPerPage, products.length);
    const currentProducts = products.slice(currentIndex, endIndex);

    currentProducts.forEach(product => {
        const productElement = document.createElement('li');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="">
            <div class="product-info">
                <div class="product-name">${product.title}</div>
                <div class="product-price">${product.price}$</div>
            </div>
        `;
        productList.appendChild(productElement);
    });

    if (endIndex >= products.length) {
        loadMoreBtn.style.display = 'none';
    }
}



