
const foods = [
    {id:1, name:"Chicken Biryani", price:250, emoji:"🍛"},
    {id:2, name:"Pizza", price:200, emoji:"🍕"},
    {id:3, name:"Burger", price:120, emoji:"🍔"},
    {id:4, name:"French Fries", price:100, emoji:"🍟"},
    {id:5, name:"Ice Cream", price:80, emoji:"🍨"},
    {id:6, name:"Noodles", price:150, emoji:"🍜"}
];

let cart = JSON.parse(localStorage.getItem("foodCart") || "{}");

function displayFood(items) {
    const list = document.getElementById("food-list");
    if (!list) return;

    list.innerHTML = items.map(food => `
        <div class="food-card">
            <div style="font-size:65px">${food.emoji}</div>
            <h3>${food.name}</h3>
            <p>Price: ₹${food.price}</p>
            <button onclick="addToCart(${food.id})">
                Add to Cart +
            </button>
        </div>
    `).join("");
}

function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    alert("Food added successfully!");
}

function saveCart() {
    localStorage.setItem("foodCart", JSON.stringify(cart));
}

function searchFood() {
    const value = document.getElementById("search").value.toLowerCase();
    displayFood(foods.filter(f => f.name.toLowerCase().includes(value)));
}

function displayCart() {
    const list = document.getElementById("cart-items");
    if (!list) return;

    let total = 0;
    list.innerHTML = "";

    Object.keys(cart).forEach(id => {
        const food = foods.find(f => f.id == id);
        if (!food) return;

        const qty = cart[id];
        total += food.price * qty;

        list.innerHTML += `
            <div class="card">
                ${food.emoji} ${food.name}
                <p>₹${food.price} × ${qty}</p>
                <button onclick="changeQty(${id},-1)">−</button>
                <button onclick="changeQty(${id},1)">+</button>
            </div>
        `;
    });

    if (Object.keys(cart).length === 0) {
        list.innerHTML = "<p>Your cart is empty. Visit our menu!</p>";
    }

    document.getElementById("total").textContent = total;
}

function changeQty(id, amount) {
    cart[id] += amount;

    if (cart[id] <= 0) delete cart[id];

    saveCart();
    displayCart();
}

function placeOrder() {
    const name = document.getElementById("customer").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !address) {
        alert("Please enter your name and address.");
        return;
    }

    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you " + name + "! Your demo order is confirmed.");

    cart = {};
    saveCart();
    displayCart();
}

displayFood(foods);
displayCart();
