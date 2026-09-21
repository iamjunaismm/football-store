const products = [
    {
        id: 1,
        name: "Pro Match Football",
        category: "balls",
        price: 49.99,
        icon: "fa-futbol"
    },
    {
        id: 2,
        name: "Elite Football Jersey",
        category: "jerseys",
        price: 69.99,
        icon: "fa-shirt"
    },
    {
        id: 3,
        name: "Speed Football Boots",
        category: "boots",
        price: 119.99,
        icon: "fa-shoe-prints"
    },
    {
        id: 4,
        name: "Training Football",
        category: "balls",
        price: 34.99,
        icon: "fa-futbol"
    },
    {
        id: 5,
        name: "Performance Jersey",
        category: "jerseys",
        price: 59.99,
        icon: "fa-shirt"
    },
    {
        id: 6,
        name: "Pro Training Cones",
        category: "training",
        price: 24.99,
        icon: "fa-dumbbell"
    },
    {
        id: 7,
        name: "Elite Goalkeeper Gloves",
        category: "training",
        price: 44.99,
        icon: "fa-hand"
    },
    {
        id: 8,
        name: "Match Day Boots",
        category: "boots",
        price: 139.99,
        icon: "fa-shoe-prints"
    }
];

let cart = JSON.parse(localStorage.getItem("goalzoneCart")) || [];

function saveCart() {
    localStorage.setItem("goalzoneCart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = document.getElementById("cartCount");

    if (count) {
        count.textContent = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    alert(`${product.name} added to cart!`);
}

function createProductCard(product) {
    return `
        <article class="product-card">
            <div class="product-visual">
                <i class="fa-solid ${product.icon}"></i>
            </div>

            <div class="product-info">
                <small>${product.category.toUpperCase()}</small>
                <h3>${product.name}</h3>
                <div class="price">$${product.price.toFixed(2)}</div>

                <button class="add-cart"
                        onclick="addToCart(${product.id})">
                    ADD TO CART
                </button>
            </div>
        </article>
    `;
}

function loadFeaturedProducts() {
    const container = document.getElementById("featuredProducts");

    if (!container) return;

    container.innerHTML = products
        .slice(0, 4)
        .map(createProductCard)
        .join("");
}

function loadShopProducts(list = products) {
    const container = document.getElementById("shopProducts");

    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty">
                <h2>No products found</h2>
                <p>Try another search or category.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(createProductCard).join("");
}

function filterCategory(category) {
    const filtered = products.filter(
        product => product.category === category
    );

    loadShopProducts(filtered);
}

function searchProducts() {
    const input = document.getElementById("searchInput");

    if (!input) return;

    const query = input.value.toLowerCase().trim();

    const results = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    loadShopProducts(results);
}

function toggleSearch() {
    const box = document.getElementById("searchBox");

    if (box) {
        box.classList.toggle("show");
    }
}

function getUrlCategory() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    loadFeaturedProducts();

    const category = getUrlCategory();

    if (category) {
       
