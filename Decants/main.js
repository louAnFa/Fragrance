let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = {};

function openProduct(name, price, image){
document.getElementById("homeView").classList.add("hidden");
document.getElementById("productView").classList.remove("hidden");

document.getElementById("productName").textContent=name;
document.getElementById("productImage").src=image;

const descriptions={
"JPG Le Beau Le Parfum":"Creamy coconut and tonka over warm woods. Tropical and seductive.",
"JPG Le Male Le Parfum":"Cardamom and vanilla wrapped in amber warmth.",
"JPG Le Male Elixir":"Honeyed vanilla with tobacco depth.",
"LV Afternoon Swim":"Bright citrus explosion, ultra fresh.",
"LV Imagination":"Refined citrus and tea with soft amber.",
"PDM Althair":"Bourbon vanilla with cinnamon sweetness.",
"Valentino Born in Roma":"Sweet vanilla with woody vetiver.",
"God of Fire":"Juicy mango and spice over smoky woods."
};

document.getElementById("productDescription").textContent=descriptions[name];

currentProduct={name,price};

const sizeSelector=document.getElementById("sizeSelector");
sizeSelector.innerHTML="";
for(let i=1;i<=10;i++){
let option=document.createElement("option");
option.value=i;
option.textContent=i+" ml";
if(i===10) option.selected=true;
sizeSelector.appendChild(option);
}
sizeSelector.addEventListener("change",updatePrice);
updatePrice();
}

function updatePrice(){
const size=parseInt(document.getElementById("sizeSelector").value);
const price=(currentProduct.price/10*size).toFixed(2);
document.getElementById("productPrice").textContent=price;
}

function goBack(){
document.getElementById("productView").classList.add("hidden");
document.getElementById("homeView").classList.remove("hidden");
}

function addToCart(){
const size=parseInt(document.getElementById("sizeSelector").value);
const quantity=parseInt(document.getElementById("quantity").value);
const price=currentProduct.price/10*size;

cart.push({name:currentProduct.name,size,quantity,price});
localStorage.setItem("cart",JSON.stringify(cart));
updateCartUI();
toggleCart();
}

function toggleCart(){
document.getElementById("cartDrawer").classList.toggle("open");
}

function updateCartUI(){
const cartItems=document.getElementById("cart-items");
const cartTotal=document.getElementById("cart-total");
const cartCount=document.getElementById("cart-count");

cartItems.innerHTML="";
let total=0;

cart.forEach((item,index)=>{
total+=item.price*item.quantity;
cartItems.innerHTML+=`
<div class="cart-item">
<div>${item.name}<br>${item.size}ml x${item.quantity}</div>
<div>$${(item.price*item.quantity).toFixed(2)}
<button onclick="removeItem(${index})">X</button>
</div>
</div>
`;
});

cartTotal.textContent=total.toFixed(2);
cartCount.textContent=cart.length;
}

function removeItem(index){
cart.splice(index,1);
localStorage.setItem("cart",JSON.stringify(cart));
updateCartUI();
}

// ✅ Checkout popup
function checkout(){
if(cart.length === 0){
alert("Your cart is empty.");
return;
}
alert("Text 8542009452 your order and who you are.");
}

updateCartUI();
