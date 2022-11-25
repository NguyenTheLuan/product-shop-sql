/**
 * Description about API
 * GET /?tableName=products => products
 * GET /products/:id  => product-detail
 */

const $productList = $(".product-list");
const $productDetail = $(".product-detail");

$(document).ready(function () {
  let endpoint = "/?tableName=products";
  $.ajax({
    url: endpoint,
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      //   console.log(result);
      const products = result.map((product) => {
        return `<div class="card">
         <a href=${"productDetail.html" + "?id=" + product.ID} target="_self">
         <img src="images/83-360-267-10.jpg" alt="gaming-pc" style="width: 100%"/></a>
        <h1>${product.Name}</h1>
        <p class="price">${product.Cost}</p>
        <p>${product.Description}</p>
        <button class="btn-add" value='${JSON.stringify(
          product
        )}'>Add to Cart</button>
        </div>`;
      });

      $productList.append(products.join(""));
      localStorage.setItem("products", JSON.stringify(result));
    },
  });

  const api_detail_production = window.location.search.split("=")[1];
  // console.log("api_detail_production", api_detail_production);

  api_detail_production &&
    $.ajax({
      url: "/products/" + api_detail_production,
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        // console.log(result);
        const productInfo = `<img
      class="product-image"
      src="images/83-360-267-10.jpg"
      style="width: 700px"
      alt="gaming-pc"/>
    <div class="product-info">
      <h2>Name: ${result[0].Name}</h2>
      <p>Description: ${result[0].Description}</p>
      <p>Cost: ${result[0].Cost}</p>
      <div class="purchase-info">
        <input type="number" min="0" value="1" />
        <button class="btn btn-add" value='${JSON.stringify(result[0])}'>
          Add to Cart<i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>`;

        $productDetail.append(productInfo);
      },
    });
});

setTimeout(() => {
  const btnAddCarts = document.querySelectorAll(".btn-add");
  // console.log(btnAddCarts);
  btnAddCarts.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const newProduct = JSON.parse(e.target.value);
      // console.log("value", newProduct);

      const getProduct = JSON.parse(localStorage.getItem("cart")) || [];
      // console.log("before", getProduct);

      const index = getProduct.findIndex((item) => item.ID === newProduct.ID);
      // console.log("index", index);

      if (index === -1) {
        /* A spread operator. It is used to copy the properties of one object to another. */
        let data = { ...newProduct, quantity: 1 };
        getProduct.push(data);
      } else {
        getProduct[index].quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(getProduct));

      // console.log("after", getProduct);

      //handle cart

      // console.log("getProduct", getProduct);
    })
  );
}, 500);
