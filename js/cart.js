const $productCart = $(".product-cart");

const getProduct = JSON.parse(localStorage.getItem("cart")) || [];

// console.log("productCart", $productCart);
// console.log("getProduct", getProduct);

const renderProductDom = (products) => {
  return products.map((product) => {
    return `<div class="cartItem">
      <img class="image" src="images/83-360-267-10.jpg" alt="gaming-pc"/>
      <span class="name">${product.Name}</span>
      <span class="description">${product.Description}</span>
      <span class="cost">${product.Cost}</span>
      <span class="quantity">${product.quantity}</span>
      <span class="total">${product.quantity * product.Cost}</span>
      <button class="btn-delete" value='${JSON.stringify(
        product
      )}'>Delete Item</button>
      </div>`;
  });
};

// const cartElement = getProduct.map((product) => {
//   return `<div class="cartItem">
//     <img class="image" src="images/83-360-267-10.jpg" alt="gaming-pc"/>
//     <span class="name">${product.Name}</span>
//     <span class="description">${product.Description}</span>
//     <span class="cost">${product.Cost}</span>
//     <span class="quantity">${product.quantity}</span>
//     <span class="total">${product.quantity * product.Cost}</span>
//     <button class="btn-delete" value='${JSON.stringify(
//       product
//     )}'>Delete Item</button>
//     </div>`;
// });
const cartElement = renderProductDom(getProduct);

const cartTitleElement = `<div class="cartItem cartTitle">
                            <span>Images</span>
                            <span>Name</span>
                            <span class="description">Description</span>
                            <span>Cost</span>
                            <span>Quantity</span>
                            <span>Total</span>
                            <span>Handle</span>
                          </div>`;

$productCart.append(cartTitleElement);
$productCart.append(cartElement.join(""));

//payroll

const payrollElement = `<div class="pay-roll">
                          <button class="clear-cart" onclick='handleClearCart()'>Clear Cart</button>
                          <button class="checkout">Checkout</button>
                          <button class="cancel">Cancel</button>
                        </div>`;
$productCart.append(payrollElement);

const totalPrice = getProduct.reduce((a, b) => {
  //   console.log(a, b);
  return a + b.Cost * b.quantity;
}, 0);

const paymentSection = `<div class="price">
<div class="root-price">Price: ${totalPrice.toLocaleString()}</div>
<div class="tax">Tax (+8%): ${(totalPrice * 0.08).toLocaleString()}</div>
<div class="shipping-fee">Total Price: ${(19.99).toLocaleString()}</div>
<div class="divider"></div>
<div class="total-price">Total Price: ${(
  totalPrice +
  totalPrice * 0.08 +
  19.99
).toLocaleString()}</div>
</div>`;

// console.log("totalPrice", totalPrice);
$productCart.append(paymentSection);

//delete cart
const deleteItemBtns = document.querySelectorAll(".btn-delete");
// console.log("deleteItemBtn", deleteItemBtns);

deleteItemBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const newProduct = JSON.parse(e.target.value);
    // console.log("value", newProduct);

    const getProduct = JSON.parse(localStorage.getItem("cart")) || [];

    const newCart = getProduct.filter(
      (product) => product.ID !== newProduct.ID
    );

    localStorage.setItem("cart", JSON.stringify(newCart));
  })
);

//clear cart
function handleClearCart() {
  localStorage.clear();
}
