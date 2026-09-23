const products = [
  {
    id: 1,
    name: "Velocity Pro Boots",
    category: "boots",
    price: 89,
    icon: "👟",
    tag: "BESTSELLER"
  },

  {
    id: 2,
    name: "Street League Jersey",
    category: "apparel",
    price: 54,
    icon: "👕",
    tag: "NEW"
  },

  {
    id: 3,
    name: "Control Match Ball",
    category: "accessories",
    price: 32,
    icon: "⚽",
    tag: "POPULAR"
  },

  {
    id: 4,
    name: "Grip Training Gloves",
    category: "accessories",
    price: 24,
    icon: "🧤",
    tag: ""
  },

  {
    id: 5,
    name: "Pro Training Shorts",
    category: "apparel",
    price: 29,
    icon: "🩳",
    tag: ""
  },

  {
    id: 6,
    name: "Sprint Turf Boots",
    category: "boots",
    price: 74,
    icon: "👟",
    tag: "NEW"
  },

  {
    id: 7,
    name: "Captain Armband",
    category: "accessories",
    price: 12,
    icon: "🎽",
    tag: ""
  },

  {
    id: 8,
    name: "Everyday Training Tee",
    category: "apparel",
    price: 25,
    icon: "👕",
    tag: "FAN FAV"
  }
];


let cart = JSON.parse(
  localStorage.getItem("kickcraft-cart") || "[]"
);

let currentFilter = "all";


const productGrid =
  document.getElementById("productGrid");

const cartDrawer =
  document.getElementById("cartDrawer");

const cartOverlay =
  document.getElementById("cartOverlay");

const cartItems =
  document.getElementById("cartItems");

const cartCount =
  document.getElementById("cartCount");

const cartTotal =
  document.getElementById("cartTotal");


function money(value) {
  return `$${value.toFixed(2)}`;
}


/* DISPLAY PRODUCTS */

function renderProducts() {

  const shown =
    currentFilter === "all"
      ? products
      : products.filter(
          product =>
            product.category === currentFilter
        );


  productGrid.innerHTML = shown
    .map(product => {

      return `
        <article class="product-card">

          <div class="product-image">

            ${
              product.tag
                ? `
                  <span class="product-tag">
                    ${product.tag}
                  </span>
                `
                : ""
            }

            <span>
              ${product.icon}
            </span>

          </div>


          <div class="product-info">

            <h3>
              ${product.name}
            </h3>


            <div class="product-meta">

              <span class="price">
                ${money(product.price)}
              </span>

              <button
                class="add-button"
                data-add="${product.id}"
              >
                Add to cart
              </button>

            </div>

          </div>

        </article>
      `;

    })
    .join("");
}


/* DISPLAY CART */

function renderCart() {

  const count =
    cart.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    );


  const total =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );


  cartCount.textContent = count;

  cartTotal.textContent =
    money(total);


  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="empty">
        Your cart is empty.
        <br>
        Add some gear and get ready to play.
      </div>
    `;

    return;
  }


  cartItems.innerHTML =
    cart
      .map(item => {

        return `
          <div class="cart-row">

            <div class="cart-thumb">
              ${item.icon}
            </div>

            <div>

              <h4>
                ${item.name}
              </h4>

              <small>
                ${money(item.price)}
                ×
                ${item.qty}
              </small>

              <br>

              <button
                class="remove"
                data-remove="${item.id}"
              >
                Remove
              </button>

            </div>

            <strong>
              ${money(item.price * item.qty)}
            </strong>

          </div>
        `;

      })
      .join("");


  localStorage.setItem(
    "kickcraft-cart",
    JSON.stringify(cart)
  );
}


/* ADD PRODUCT */

function addToCart(id) {

  const product =
    products.find(
      product => product.id === id
    );


  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({
      ...product,
      qty: 1
    });

  }


  renderCart();

  openCart();
}


/* REMOVE PRODUCT */

function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );


  renderCart();
}


/* OPEN CART */

function openCart() {

  cartDrawer.classList.add("open");

  cartDrawer.setAttribute(
    "aria-hidden",
    "false"
  );

  cartOverlay.hidden = false;

  document.body.style.overflow =
    "hidden";
}


/* CLOSE CART */

function closeCart() {

  cartDrawer.classList.remove("open");

  cartDrawer.setAttribute(
    "aria-hidden",
    "true"
  );

  cartOverlay.hidden = true;

  document.body.style.overflow =
    "";
}


/* FILTERS */

document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelector(
            ".filter.active"
          )
          .classList.remove("active");


        button.classList.add(
          "active"
        );


        currentFilter =
          button.dataset.filter;


        renderProducts();

      }
    );

  });


/* ADD TO CART BUTTON */

productGrid.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-add]"
      );


    if (!button) return;


    addToCart(
      Number(button.dataset.add)
    );

  }
);


/* REMOVE FROM CART */

cartItems.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-remove]"
      );


    if (!button) return;


    removeFromCart(
      Number(button.dataset.remove)
    );

  }
);


/* CART CONTROLS */

document
  .getElementById("cartButton")
  .addEventListener(
    "click",
    openCart
  );


document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


cartOverlay.addEventListener(
  "click",
  closeCart
);


/* CHECKOUT */

document
  .getElementById("checkoutButton")
  .addEventListener(
    "click",
    () => {

      if (!cart.length) {

        alert(
          "Your cart is empty."
        );

        return;
      }


      alert(
        "Demo checkout: connect this button to your payment provider."
      );

    }
  );


/* ESCAPE KEY */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeCart();
    }

  }
);


/* INITIALIZE */

renderProducts();

renderCart();
