const items = Products["item"];

window.onload = () => {
    allProducts(items);
}

const allProducts = (items) => {
        productList.innerHTML = `
      ${items.map(item => `
          <div class="card-deck">
            <div class="card mb-5 mr-5">
              <img class="card-img-top img-responsive" id="goBuy" src="${item["image"]}" alt="product image">
              <div class="card-body">
                  <h5 class="card-title product-title">${item["title"]}</h5>
                  <p class="card-text artist">${item["artist"]}</p>
                  <p class="card-text price">Valor mínimo: R$ ${item["min_price"]}</p>
                  <a href="./product/product.html" class="badge badge-light">Ver mais</a>
              </div>
            </div>
          </div>
      `).join('')}
    `
}