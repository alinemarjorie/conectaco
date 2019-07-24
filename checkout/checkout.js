// let productsTest = [
//     {
//       productName: "Beija Eu",
//       value_platform: 100,
//       value_provider: 50,
//       value_donation: 20,
//       provider_id: "re_cjyg0bwpg00l7dh6dzj9ws984"      
//   }, 
//   {
//       productName: "Beija Eu2",
//       value_platform: 100,
//       value_provider: 50,
//       value_donation: 20,
//       provider_id: "re_cjyg0bwpg00l7dh6dzj9ws984"      
//   }
// ];

// const myJson = JSON.stringify(productsTest);
// console.log(myJson);
// localStorage.setItem("cart", myJson);

let btnCard = document.getElementById("btn-save-card");
let btnfinish = document.getElementById("btn-finish");

window.onload = () => {
  printCart();
  btnCard.addEventListener("click", () => {
    saveCard();
    showCard();
  });
  btnfinish.addEventListener("click", finishPurchase);
};

const getProductsData = () => {
  let productsString = localStorage.getItem("cart");
  let products = JSON.parse(productsString);
  return products;
};


const printCart = () => {
  let products = getProductsData();
  let cart = document.getElementById("cart");
  
  
  products.map((product) => {
    let productDiv = document.createElement("div");    
    cart.appendChild(productDiv);
    productDiv.innerHTML = `
    <ul class="sumary">
        <li>Produto:${product.productName}</li>
        <li>Artista:${product.value_provider}</li>
        <li>ONG:${product.value_donation}</li>
        <li>Plataforma:${product.value_platform}</li>
        <li>Total produto:${product.value_platform + product.value_donation + product.value_provider}</li>
    </ul>
    `;
  })

  let sumProduct = products.map((product) => {
    let sum = product.value_provider + product.value_platform + product.value_donation
    return sum
  })
  let sumProducts = sumProduct.reduce((acc, cur) => acc + cur); 
  let totalAmount = document.getElementById("total-amount");
  totalAmount.innerHTML = `${sumProducts}`;  
};

const saveCard = () => {
  let cardName = document.getElementById("card_holder_name").value;
  let cardNumber = document.getElementById("card_number").value;
  let cardDate = document.getElementById("card_expiration_date").value;
  let cardCvv = document.getElementById("card_cvv").value;
  return [cardName, cardNumber, cardDate, cardCvv];
};

const showCard = () => {
  let cardNumber = document.getElementById("card_number").value;
  document.getElementById("credit-card-info").innerHTML = `Número do cartão: ${cardNumber}`;
};

const finishPurchase = () => {
  let cardInfos = saveCard();
  let cardName = cardInfos[0]
  let cardNumber = cardInfos[1].toString();
  let cardDate = cardInfos[2].toString();
  let cardCvv= cardInfos[3].toString();

  let products = getProductsData();

  let sumProduct = products.map((product) => {
    let sum = product.value_provider + product.value_platform + product.value_donation
    return sum
  })
  let sumProducts = sumProduct.reduce((acc, cur) => acc + cur);

  let sumArtist = products.map((product) => {return product.value_provider}).reduce((acc, cur) => acc + cur);
  let sumPlatform = products.map((product) => {return product.value_platform}).reduce((acc, cur) => acc + cur);
  let sumDonation = products.map((product) => {return product.value_donation}).reduce((acc, cur) => acc + cur);

  console.log(cardName);
  console.log(cardNumber);
  console.log(cardDate);
  console.log(cardCvv);

  console.log(sumProducts);
  console.log(sumArtist);
  console.log(sumPlatform);
  console.log(sumDonation);



  pagarme.client
    .connect({ api_key: "ak_test_xBdmMN5Q2uncFMSWAlIVFais1nGkMv" })
    .then(client =>
      client.transactions.create({
        amount: sumProducts,
        card_number: cardNumber,
        card_cvv: cardCvv,
        card_expiration_date: cardDate,
        card_holder_name: cardName,
        customer: {
          external_id: "#3311",
          name: "teste2",
          type: "individual",
          country: "br",
          email: "maria@nabucodonozor.com",
          documents: [
            {
              type: "individual",
              number: "30621143049"
            }
          ],
          phone_numbers: ["+5511999998888", "+5511888889999"],
          birthday: "1965-01-01"
        },
        billing: {
          name: "Trinity Moss",
          address: {
            country: "br",
            state: "sp",
            city: "Cotia",
            neighborhood: "Rio Cotia",
            street: "Rua Matrix",
            street_number: "9999",
            zipcode: "06714360"
          }
        },
        shipping: {
          name: "Neo Reeves",
          fee: 1000,
          delivery_date: "2000-12-21",
          expedited: true,
          address: {
            country: "br",
            state: "sp",
            city: "Cotia",
            neighborhood: "Rio Cotia",
            street: "Rua Matrix",
            street_number: "9999",
            zipcode: "06714360"
          }
        },
        items: [
          {
            id: "r123",
            title: "Red pill",
            unit_price: 10000,
            quantity: 1,
            tangible: true
          },
          {
            id: "b123",
            title: "Blue pill",
            unit_price: 10000,
            quantity: 1,
            tangible: true
          }
        ],
        split_rules: [
          {
            amount: sumPlatform,
            recipient_id: "re_cjyfzsi7f00j2pb6f7aelyb4r",
            liable: "true",
            charge_processing_fee: "true",
            charge_remainder_fee: "true"
          },
          {
            amount: sumDonation,
            recipient_id: "re_cjyg0bmgf00kfpb6fkbk8b5ph",
            liable: "true",
            charge_processing_fee: "true",
            charge_remainder_fee: "true"
          },
          {
            amount: sumArtist,
            recipient_id: "re_cjyg0bwpg00l7dh6dzj9ws984",
            liable: "true",
            charge_processing_fee: "true",
            charge_remainder_fee: "true"
          }
        ]
      })
    )
    .then(transaction => console.log(transaction));
}
