async function loadProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  const container = document.querySelector("#all-products .container");
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
      <div class="product-picture skeleton">
        <img  
             data-src="${product.image}" 
             alt="product: ${product.title}" 
             width="250" 
             height="250"
             loading="lazy"
             >
      </div>
      <div class="product-info">
        <p class="categories">${product.category}</p>
        <h2 class="title">${product.title}</h2>
        <p class="price"><span>US$ ${product.price}</span></p>
        <button>Add to bag</button>
      </div>
    `;

    fragment.appendChild(productElement);
  });

  container.appendChild(fragment);

  const lazyImages = document.querySelectorAll("img[data-src]");
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.removeAttribute("data-src");
        lazyImage.onload = () => {
          lazyImage.parentNode.classList.remove("skeleton");
        };
        observer.unobserve(lazyImage);
      }
    });
  });

  lazyImages.forEach((image) => lazyImageObserver.observe(image));
}

const element = document.querySelector("#all-products .container");
const io = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadProducts();
    io.unobserve(element);
  }
});

io.observe(element);

for (let i = 0; i < 10000000; i++) {
  const temp = Math.sqrt(i) * Math.sqrt(i);
}
