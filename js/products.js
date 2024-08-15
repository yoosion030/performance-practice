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

window.onload = () => {
  let productSection = document.querySelector("#all-products .container");

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadProducts();
        performHeavyCalculation();
        observer.unobserve(productSection);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  observer.observe(productSection);

  function performHeavyCalculation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = 0;
        for (let i = 0; i < 10000000; i++) {
          result += Math.sqrt(i) * Math.sqrt(i);
        }
        resolve(result);
      }, 0);
    });
  }
};
