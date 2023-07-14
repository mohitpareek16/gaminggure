let carts = document.querySelectorAll(".add-cart");
let totalPriceOfItem;
let product = [
  {
    name: "Expert",
    tag: "apex legends",
    price: 200,
    inCart: 0,
  },
  {
    name: "starter",
    tag: "Bgmi",
    price: 100,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(product[i]);
    totalCost(product[i]);
  });
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".nav-centre span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".nav-top .nav-centre span").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".nav-centre span").textContent = 1;
  }
  // setItem(product);
}

function setItem(product) {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  // localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".card_section");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = ``;
    cartItems.map((item,index) => {
      productContainer.innerHTML += 
      
      `  <div class="product">
      <div class="product-image">
         <img class="spacebtw"  src="./images/${item.tag}.png">
      </div>
      <div class="product-details">
        <div class="product-title">${item.name}</div>
        <p class="product-description">${item.tag}</p>
      </div>
      <div class="product-price">${item.price}</div>
      <div class="product-quantity">
        <p >Quantity:- ${item.inCart}</p>
      </div>
     
      <div class="product-line-price">$${item.inCart * item.price}.00</div>
    </div>
    
    

    `
    });
    
  }
}
onLoadCartNumbers();
displayCart();

// this section for the payment UI section We try to display this kind of things

var cardDrop = document.getElementById("card-dropdown");
var activeDropdown;
cardDrop.addEventListener("click", function () {
  var node;
  for (var i = 0; i < this.childNodes.length - 1; i++)
    node = this.childNodes[i];
  if (node.className === "dropdown-select") {
    node.classList.add("visible");
    activeDropdown = node;
  }
});

window.onclick = function (e) {
  console.log(e.target.tagName);
  console.log("dropdown");
  console.log(activeDropdown);
  if (e.target.tagName === "LI" && activeDropdown) {
    if (e.target.innerHTML === "Master Card") {
      document.getElementById("credit-card-image").src =
        "https://dl.dropboxusercontent.com/s/2vbqk5lcpi7hjoc/MasterCard_Logo.svg.png";
      activeDropdown.classList.remove("visible");
      activeDropdown = null;
      e.target.innerHTML = document.getElementById("current-card").innerHTML;
      document.getElementById("current-card").innerHTML = "Master Card";
    } else if (e.target.innerHTML === "American Express") {
      document.getElementById("credit-card-image").src =
        "https://dl.dropboxusercontent.com/s/f5hyn6u05ktql8d/amex-icon-6902.png";
      activeDropdown.classList.remove("visible");
      activeDropdown = null;
      e.target.innerHTML = document.getElementById("current-card").innerHTML;
      document.getElementById("current-card").innerHTML = "American Express";
    } else if (e.target.innerHTML === "Visa") {
      document.getElementById("credit-card-image").src =
        "https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png";
      activeDropdown.classList.remove("visible");
      activeDropdown = null;
      e.target.innerHTML = document.getElementById("current-card").innerHTML;
      document.getElementById("current-card").innerHTML = "Visa";
    }
  } else if (e.target.className !== "dropdown-btn" && activeDropdown) {
    activeDropdown.classList.remove("visible");
    activeDropdown = null;
  }
};

function remove() {
  let removeProduct = document.getElementById("remove-product");
  removeProduct.addEventListener('click', function(){

  localStorage.removeItem("cartNumbers");
  localStorage.removeItem("productInCart");
  localStorage.removeItem("totalCost");
  window.location.reload();
  displayCart();
})
// let data = JSON.parse(localStorage.getItem("productInCart"))
//           data.splice(index,1)
//           localStorage.setItem('productIncart',JSON.stringify(data))
//           window.location.reload()
}

function validCard() {
  var cardNumber = document.getElementById("card_name").value;
  var cardHolder = document.getElementById("card_holder").value;
  var expires = document.getElementById("expires").value;
  var cvc = document.getElementById("cvc").value;
  var success;
  let finalPrice = localStorage.getItem("totalCost");

  if (cardNumber.length == 12 && cardNumber.search(/[0-9]/ == -1)) {
    success = 1;
    if (cardHolder.length > 3) {
      success = 1;
      if (expires > 2022 && cvc.search(/[0-9]/ == -1)) {
        success = 1;
        if (cvc.length == 3 && cvc.search(/[0-9]/ == -1)) {
          success = 1;
        } else {
          success = 0;
        }
      } else {
        success = 0;
      }
    } else {
      success = 0;
    }
  } else {
    success = 0;
  }

  if (success == 1) {
    alert(`Your payment was successful $${finalPrice}`);
  } else {
    alert(
      `You Done something wrong, Please Try Again To confirm The Payment of $${finalPrice} `
    );
  }
}
