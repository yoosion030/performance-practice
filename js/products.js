async function loadProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  const container = document.querySelector("#all-products .container");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
      <div class="product-picture">
        <img src="${product.image}" alt="product: ${product.title}" width="250">
      </div>
      <div class="product-info">
        <p class="categories">${product.category}</p>
        <h2 class="title">${product.title}</h2>
        <p class="price"><span>US$ ${product.price}</span></p>
        <button>Add to bag</button>
      </div>
    `;
  });

  container.appendChild(fragment);
}

loadProducts();

// Simulate heavy operation. It could be a complex price calculation.
for (let i = 0; i < 10000000; i++) {
  const temp = Math.sqrt(i) * Math.sqrt(i);
}
