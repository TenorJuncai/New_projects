import { menuArray } from "./data.js  ";

const payModal = document.getElementById("payment-modal");
const thankEl = document.getElementById("thank-section");

let orderList = [];
let sum = 0;

// event listener
document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAdd(e.target.dataset.add);
  } else if (e.target.id === "complete-order") {
    payModal.style.display = "block";
  } else if (e.target.id === "close-modal") {
    payModal.style.display = "none";
  } else if (e.target.dataset.remove) {
    handleRemove(e.target.dataset.remove);
  } else if (e.target.id === "pay") {
    handleSubmit(e);
  }
});

//render menu
function getMenuHtml() {
  let menuHtml = "";

  menuArray.forEach(function (item) {
    menuHtml += `
        <div class="item">
            <div class="item-inner flex">
                <span class="item-img">${item.emoji}</span>
                <div class="item-info">
                    <p class="item-name">${item.name}</p>
                    <small class="item-ingredients">${item.ingredients}</small>
                    <p class="item-price">$${item.price}</p>
                </div>
                <button id="add"  data-add="${item.id}">+</button>
            </div>
        </div>
        `;
  });
  return menuHtml;
}

function handleAdd(orderId) {
  const targetOrderObj = menuArray.filter(function (item) {
    return item.id === parseInt(orderId);
  })[0];
  sum += targetOrderObj.price;
  orderList.push({
    name: targetOrderObj.name,
    price: targetOrderObj.price,
    id: targetOrderObj.id,
  });
  thankEl.style.display = "none";
  render();
}

function handleRemove(orderId) {
  const targetOrder = orderList.filter(function (item) {
    return item.id === parseInt(orderId);
  })[0];
  sum -= targetOrder.price;
  const index = orderList.indexOf(targetOrder);
  if (index > -1) {
    orderList.splice(index, 1);
  }
  render();
}

function handleSubmit(e) {
  e.preventDefault();
  payModal.style.display = "none";
  orderList = [];
  sum = 0;
  document.getElementById("order-section").innerHTML = "";
  thankEl.style.display = "flex";
}

function getOrderHtml() {
  let orderHtml = "";
  let billHtml = "";

  orderList.forEach(function (item) {
    orderHtml += `
      <div class="order-display flex">
        <div class="order-inner flex">
          <h2>${item.name}</h2>
          <div class="remove" id="remove" data-remove="${item.id}">remove</div>
        </div>
        <h2>$ ${item.price}</h2>
      </div>
    `;

    billHtml = `
    <p class="your-order">Your order</p>
      <div class="order-list">
        ${orderHtml}
        <br>
        <div class="total-price flex">
          <h2>Total price</h2>
          <h2>$ ${sum}</h2>
        </div>
      </div>
    <button id="complete-order">Complete order</button>
   `;
  });
  return billHtml;
}

function getThankHtml() {
  return `<div class"thank">
  <h3 class="thank-text">Thanks! your order is on it's way!</h3>
</div>`;
}

function render() {
  document.getElementById("menu-section").innerHTML = getMenuHtml();
  document.getElementById("order-section").innerHTML = getOrderHtml();
  document.getElementById("thank-section").innerHTML = getThankHtml();
}

render();
