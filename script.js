const products = [
    { name: "Hardcover Notebook", description: "A5 notebook with 100 GSM paper, perfect for writing or journaling.", price: 14.99, unit: "each" },
    { name: "Gel Ink Pen Set", description: "Set of 10 vibrant gel pens for smooth writing.", price: 9.99, unit: "set" },
    { name: "Watercolor Paint Set", description: "12-color professional-grade watercolor set with brushes.", price: 24.99, unit: "set" },
    { name: "Desk Organizer", description: "Elegant wooden organizer to keep your stationery in place.", price: 19.99, unit: "each" },
    { name: "Calligraphy Starter Kit", description: "Includes pens, nibs, and practice sheets for beginners.", price: 29.99, unit: "kit" }
];

let cart = [];
let total = 0;

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)} / ${product.unit}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(index) {
    const product = products[index];
    cart.push(product);
    total += product.price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
    });
    totalDisplay.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
        cart = [];
        total = 0;
        updateCart();
    }
}

renderProducts();