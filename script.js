const products = [
    { name: "Organic Whole Milk", description: "Rich, creamy, and 100% organic. Perfect for your daily nutrition.", price: 4.99, unit: "gallon" },
    { name: "Almond Milk (Unsweetened)", description: "A delicious, dairy-free alternative. Low in calories and high in taste.", price: 3.99, unit: "liter" },
    { name: "Chocolate Milk", description: "Sweet, creamy chocolate goodness. A favorite for kids and adults alike.", price: 2.49, unit: "pint" },
    { name: "Oat Milk", description: "Smooth and creamy, made from 100% whole oats. Vegan and lactose-free.", price: 4.49, unit: "liter" },
    { name: "Skimmed Milk", description: "Low-fat milk for a healthy lifestyle, without compromising taste.", price: 3.49, unit: "gallon" },
    { name: "Coconut Milk", description: "Exotic and creamy, perfect for cooking or as a dairy-free alternative.", price: 5.99, unit: "can" },
    { name: "Strawberry Milk", description: "A fruity twist on classic milk. Sweet and refreshing.", price: 2.99, unit: "pint" },
    { name: "Goat Milk", description: "A rich source of essential nutrients. Ideal for lactose-sensitive individuals.", price: 6.99, unit: "gallon" },
    { name: "Cashew Milk", description: "Creamy and nutty, an excellent dairy-free option for your smoothies.", price: 4.79, unit: "liter" },
    { name: "Flavored Soy Milk (Vanilla)", description: "Silky smooth soy milk with a hint of vanilla. Vegan and delicious.", price: 3.89, unit: "liter" },
    { name: "Buttermilk", description: "Light and tangy, perfect for cooking or a refreshing drink.", price: 2.29, unit: "quart" },
    { name: "Kefir", description: "Fermented milk packed with probiotics for a healthy gut.", price: 5.49, unit: "bottle" },
    { name: "Lactose-Free Milk", description: "Easy-to-digest milk with all the nutritional benefits.", price: 4.59, unit: "gallon" },
    { name: "A2 Milk", description: "Specially sourced milk without A1 proteins for sensitive stomachs.", price: 5.99, unit: "gallon" },
    { name: "Golden Milk (Turmeric)", description: "A traditional blend of milk with turmeric for added health benefits.", price: 3.49, unit: "pint" },
    { name: "Matcha Milk", description: "Milk infused with premium matcha powder for a unique flavor experience.", price: 3.99, unit: "pint" }
];

// Cart and Total Variables
let cart = [];
let total = 0;

// Dynamically Render Products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear any existing products
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)} / ${product.unit}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add to Cart Function
function addToCart(index) {
    const product = products[index];
    cart.push(product);
    total += product.price;
    updateCart();
}

// Update Cart UI
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        li.innerHTML += ` <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
    });
    totalDisplay.textContent = total.toFixed(2);
}

// Remove from Cart
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
    cart = [];
    total = 0;
    updateCart();
}

// Initialize the Product List
renderProducts();