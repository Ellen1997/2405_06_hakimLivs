let renderCart = () => {
    let cartContainer = document.querySelector(".cartContainer");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Din varukorg är tom.</p>";
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    let cartButtonDiv = document.createElement("div");
    cartButtonDiv.classList.add("cartButtonDiv");
    document.querySelector(".cartProductCardContainer").append(cartButtonDiv);

    let button = document.createElement("button");
    button.classList.add("button");
    button.innerHTML = "Gå till kassan";
    cartButtonDiv.append(button);

    cart.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        let cartProductAndButton = document.createElement("div");
        cartProductAndButton.classList.add("cartProductAndButton");

        let namePriceAmountDiv = document.createElement("div");
        namePriceAmountDiv.classList.add("namePriceAmountDiv");

        let imgAndProductInfo = document.createElement("div");
        imgAndProductInfo.classList.add("imgAndProductInfo");

        let productImg = document.createElement("img");
        productImg.src = item.img;
        productImg.classList.add("cartProductImg");

        let productName = document.createElement("p");
        productName.innerHTML = `<strong>${item.product}</strong>`;

        let productPrice = document.createElement("p");
        productPrice.innerHTML = `${item.price} kr`;

        let itemTotalPrice = document.createElement("p");
        itemTotalPrice.innerHTML = `<strong>${item.amount * item.price} kr </strong>`;

        let counterProductContainer = document.createElement("div");
        counterProductContainer.classList.add("counterProductContainer");
        
        let productAmount = document.createElement("p");
        productAmount.innerHTML = `${item.amount} st`;

        let trash = document.createElement("i");
        trash.classList.add("trash");
        trash.innerHTML = `
        <i class="fa-solid fa-trash" style="color: #011e62;"></i>
        `;
    
        let hr = document.createElement("hr");
        hr.style.width = 100;
        hr.style.margin = 0;
    
        imgAndProductInfo.append(productImg, namePriceAmountDiv);
        counterProductContainer.append(productAmount);
        cartProductAndButton.append(imgAndProductInfo, counterProductContainer);
        namePriceAmountDiv.append(productName,productPrice,itemTotalPrice);
        cartContainer.append(cartProductAndButton,trash, hr);
        

        totalItems += item.amount;
        totalPrice += item.amount * item.price;
    });

    let totalContainer = document.createElement("div");
    totalContainer.classList.add("totalContainer");

    let amountProducts = document.querySelector("#amountProducts");
    amountProducts.innerHTML = `${totalItems} st`;

    let totalSumProducts = document.querySelector("#totalSumProducts");
    totalSumProducts.innerHTML = `<b>${totalPrice} kr </b>`;
}
renderCart();
