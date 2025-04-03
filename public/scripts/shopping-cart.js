let renderCart = () => {
    let cartContainer = document.querySelector(".cartContainer");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Din varukorg är tom.</p>";
        return;
    }

    let totalItems = 0; // För att hålla koll på totalt antal produkter
    let totalPrice = 0; // För att hålla koll på totalt pris

    // Skapa HTML för varje produkt i varukorgen
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
        productName.innerHTML = item.product;

        let productPrice = document.createElement("p");
        productPrice.innerHTML = `${item.price} kr`;

        let productAmount = document.createElement("p");
        productAmount.innerHTML = `Antal: ${item.amount} st`;

        let itemTotalPrice = document.createElement("p");
        itemTotalPrice.innerHTML = `Totalt: ${item.amount * item.price} kr`;

        let counterContainer = document.createElement("div");
        counterContainer.classList.add("counterContainer");
    
        let inputQuantity = document.createElement("input");
        inputQuantity.type = "numeric";
        inputQuantity.value = 1;
        inputQuantity.classList.add("inputQuantity");
    
        let plusButton = document.createElement("button");
        plusButton.innerHTML = "+";
        plusButton.classList.add("plusButton");
        plusButton.addEventListener("click", () => {
            let newQuantity = parseInt(inputQuantity.value) + 1;
            inputQuantity.value = newQuantity;
            updateCart(product, newQuantity);
        });
    
        let minusButton = document.createElement("button");
        minusButton.innerHTML = "-";
        minusButton.classList.add("minusButton");
        minusButton.addEventListener("click", () => {
            let newQuantity = parseInt(inputQuantity.value) - 1;
            if (newQuantity > 0) {
                inputQuantity.value = newQuantity;
                updateCart(product, newQuantity);
            }
        });

        let hr = document.createElement("hr");
        hr.style.width = 100;
        hr.style.margin = 0;
    
        imgAndProductInfo.append(productImg, namePriceAmountDiv);
        counterContainer.append(minusButton, inputQuantity, plusButton);
        cartProductAndButton.append(imgAndProductInfo, counterContainer);
        namePriceAmountDiv.append(productName,productPrice,productAmount,itemTotalPrice);
        cartContainer.append(cartProductAndButton, hr);

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
