const items = Products["item"];
const partners = Ongs["logo"];

window.onload = () => {
    allProducts(items);
    allPartners(partners);
}

const allProducts = (items) => {
        productList.innerHTML = `
      ${items.map(item => `
          <div class="card-deck">
            <div class="card mb-5 mr-5">
              <img class="card-img-top img-responsive" src="${item["image"]}" alt="product image">
              <div class="card-body">
                  <h5 class="card-title">${item["title"]}</h5>
                  <p class="card-text artist">${item["artist"]}</p>
                  <p class="card-text price">Valor mínimo: R$${item["min_price"]}</p>
              </div>
            </div>
          </div>
      `).join('')}
    `
}

const allPartners = (partners) => {
  ongList.innerHTML = `
  ${partners.map(partner => `
          <div class="card-deck">
            <div class="card mb-5 mr-5">
              <img class="card-img-top img-responsive" src="${partner["image"]}" alt="product image">
              <div class="card-body">
                <h5 class="card-title text-center">${partner["name"]}</h5>
              </div>
            </div>
          </div>
    `).join('')}
  `
}