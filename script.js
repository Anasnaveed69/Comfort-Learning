const cart = document.querySelector("nav .cart");
const cartSideBar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");
const burger = document.querySelector(".burger");
const menuSidebar = document.querySelector(".menu-sidebar");
const closeMenu = document.querySelector(".close-menu");
const cartItemsTotal = document.querySelector(".noi");
const cartPriceTotal = document.querySelector(".total-amount");
const cartContent = document.querySelector(".cart-content");
const clearBtn = document.querySelector(".clear-cart-btn");
const proceedBtn = document.querySelector(".proceed-btn");

let Cart = [];
let buttonsDOM = [];

cart.addEventListener("click", function () {
    cartSideBar.style.transform = "translateX(0%)";
    const bodyOverlay = document.createElement("div");
    bodyOverlay.classList.add("overlay");
    document.body.appendChild(bodyOverlay);
});

closeCart.addEventListener("click", function () {
    cartSideBar.style.transform = "translateX(100%)";
    const bodyOverlay = document.querySelector(".overlay");
    if (bodyOverlay) {
        document.body.removeChild(bodyOverlay);
    }
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("overlay")) {
        cartSideBar.style.transform = "translateX(100%)";
        document.body.removeChild(event.target);
    }
});

burger.addEventListener("click", function () {
    menuSidebar.style.transform = "translateX(0%)";
});

closeMenu.addEventListener("click", function () {
    menuSidebar.style.transform = "translateX(-100%)";
});

class Product {
    async getProduct() {
        try {
            const res = await fetch("products.json");
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            let products = data.items;
            products = products.map(item => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image };
            });
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }
}

class UI {
    displayProducts(products) {
        let result = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}">
                    <span class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus fa-1x" style="margin-right:0.1em; font-size:1em;"></i>
                        Add to Cart
                    </span>
                    <div class="product-name">${product.title}</div>
                    <div class="product-pricing">Rs ${product.price}</div>
                </div>
            `;
            document.querySelector(".product").append(productDiv);
        });
    }
}

function setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.forEach(item => {
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount;
    });
    cartItemsTotal.innerHTML = itemsTotal;
    cartPriceTotal.innerHTML = parseFloat(tempTotal.toFixed(2));
}

function addCartItem(cartItem) {
    const cardItemUI = document.createElement("div");
    cardItemUI.classList.add("cart-product");
    cardItemUI.setAttribute("data-id", cartItem.id);
    cardItemUI.innerHTML = `
        <div class="product-image">
            <img src="${cartItem.image}" alt="${cartItem.title}">
        </div>
        <div class="cart-product-content">
            <div class="cart-product-name"><h3>${cartItem.title}</h3></div>
            <div class="cart-product-price"><h3>Rs ${cartItem.price}</h3></div>
            <div class="plus-minus">
                <span class="minus" data-id="${cartItem.id}">-</span>
                <span class="quantity">${cartItem.amount}</span>
                <span class="plus" data-id="${cartItem.id}">+</span>
            </div>
            <div class="cart-product-remove" data-id="${cartItem.id}">
                <a href="#" style="color: red; cursor: pointer;">remove</a>
            </div>
        </div>
    `;
    cartContent.append(cardItemUI);
}

function getButtons() {
    const btns = document.querySelectorAll(".add-to-cart");
    buttonsDOM = Array.from(btns);
    btns.forEach(btn => {
        const id = btn.dataset.id;
        const inCart = Cart.find(item => item.id === id);
        if (inCart) {
            btn.innerHTML = "In Cart";
            btn.disabled = true;
            btn.style.color = "white";
            btn.style.pointerEvents = "none";
        }
        btn.addEventListener("click", (e) => {
            e.currentTarget.innerHTML = "In Cart";
            e.currentTarget.disabled = true;
            e.currentTarget.style.color = "white";
            e.currentTarget.style.pointerEvents = "none";
            const cartItem = { ...Storage.getProducts(id), amount: 1 };
            Cart.push(cartItem);
            Storage.saveCart(Cart);
            setCartValues(Cart);
            addCartItem(cartItem);
        });
    });
}

function cartLogic() {
    clearBtn.addEventListener("click", () => {
        clearCart();
    });

    proceedBtn.addEventListener("click", () => {
        alert("Proceeding to checkout..."); // Placeholder for checkout logic
    });

    cartContent.addEventListener("click", (event) => {
        event.preventDefault();
        const removeBtn = event.target.closest(".cart-product-remove a");
        const minusBtn = event.target.closest(".minus");
        const plusBtn = event.target.closest(".plus");

        if (removeBtn) {
            const id = removeBtn.parentElement.dataset.id;
            const cartProduct = removeBtn.closest(".cart-product");
            if (cartProduct && id) {
                removeItem(id);
                cartProduct.remove();
            }
        } else if (minusBtn) {
            const id = minusBtn.dataset.id;
            updateQuantity(id, -1);
        } else if (plusBtn) {
            const id = plusBtn.dataset.id;
            updateQuantity(id, 1);
        }
    });
}

function updateQuantity(id, change) {
    const cartItem = Cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.amount += change;
        if (cartItem.amount <= 0) {
            removeItem(id);
            const cartProduct = cartContent.querySelector(`.cart-product[data-id="${id}"]`);
            if (cartProduct) cartProduct.remove();
        } else {
            Storage.saveCart(Cart);
            setCartValues(Cart);
            const quantityElement = cartContent.querySelector(`.cart-product[data-id="${id}"] .quantity`);
            if (quantityElement) quantityElement.textContent = cartItem.amount;
        }
    }
}

function clearCart() {
    Cart.forEach(item => removeItem(item.id));
    while (cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild);
    }
    setCartValues(Cart);
}

function removeItem(id) {
    Cart = Cart.filter(item => item.id !== id);
    Storage.saveCart(Cart);
    setCartValues(Cart);
    const button = getSingleButton(id);
    if (button) {
        button.disabled = false;
        button.innerHTML = `<i class="fa fa-cart-plus"></i> Add to Cart`;
        button.style.color = "";
        button.style.pointerEvents = "";
    }
}

function getSingleButton(id) {
    return buttonsDOM.find(button => button.dataset.id === id);
}

class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProducts(id) {
        const products = JSON.parse(localStorage.getItem("products"));
        return products.find(item => item.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }
}

function setupApp() {
    Cart = Storage.getCart();
    setCartValues(Cart);
    Cart.forEach(item => addCartItem(item));
}

document.addEventListener("DOMContentLoaded", () => {
    const products = new Product();
    const ui = new UI();
    setupApp();
    products.getProduct().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        getButtons();
        cartLogic();
    });
});