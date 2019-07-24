const btnCart = document.getElementById("cart");
const btnBuyNow = document.getElementById("buy-now");

window.onload = () => {
 btnCart.addEventListener("click", insertInfoPayInCart)
 btnBuyNow.addEventListener("click", () => {
     insertInfoPayInCart()
     goCart()
 })
}

const insertInfoPayInCart = () => {
    console.log("oi")
 
    let product = document.getElementById("product");
    let provider = document.getElementById("provider-value");
    let value_platform = document.getElementById("platform-value").value;
    let value_provider = provider.value;
    let value_donation = document.getElementById("donation-value").value;
    let provider_id = provider.dataset.artist;
    let productName = product.dataset.name;

    console.log(value_platform)

    const infoPay = {
        productName,
        value_platform,
        value_provider,
        value_donation,
        provider_id
        
    }

    setCart(infoPay)    
}

const getCart = () => {
    let getCart = localStorage.getItem('cart')
    let cartObject = JSON.parse(getCart)  
    return cartObject     
}

const setCart = (infoPay) => {
    const cart = getCart()

    const infoPayString = JSON.stringify([infoPay])
    if (!cart) {
        console.log('primeira vez')
        localStorage.setItem('cart', infoPayString)
    } else {
        console.log(cart)
        cart.push(infoPay);
        const newCart = JSON.stringify(cart);
        localStorage.setItem('cart', newCart)
    }  
}

const goCart = () => {
    window.location = "../checkout/checkout.html"
}
