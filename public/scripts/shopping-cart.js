let renderCart = () => {
    let cartContainer = document.querySelector(".cartContainer");
    let cartProductCardContainer = document.querySelector(".cartProductCardContainer");

    cartContainer.innerHTML = "";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Din varukorg är tom.</p>";
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

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
        trash.style.cursor = "pointer";
        trash.innerHTML = `
        <i class="fa-solid fa-trash" style="color: #011e62;"></i>
        `;
        trash.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let updatedCart = cart.filter(cartItem => cartItem._id !== item._id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            renderCart();
        })
    
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

    let cartButtonDiv = document.createElement("div");
    cartButtonDiv.classList.add("cartButtonDiv");
    let goToCheckoutBtn = document.createElement("button");
    goToCheckoutBtn.classList.add("button");
    goToCheckoutBtn.classList.add("goToCheckoutBtn");
    goToCheckoutBtn.innerHTML = "Gå till kassan";
    goToCheckoutBtn.addEventListener("click", () => {
        const token = localStorage.getItem("token");
        
        if(!token) {
            localStorage.setItem("goToCheckoutAfterLogin", "true");
            showModal(loginModal);
            return;
        }

        hideAndShowProduct(cartContainer,goToCheckoutBtn);
        paymentStage(cartProductCardContainer,totalPrice);
    })

    cartButtonDiv.append(goToCheckoutBtn);
    cartContainer.append(cartButtonDiv);


    let totalContainer = document.createElement("div");
    totalContainer.classList.add("totalContainer");

    let amountProducts = document.querySelector("#amountProducts");
    amountProducts.innerHTML = `${totalItems} st`;

    let totalSumProducts = document.querySelector("#totalSumProducts");
    totalSumProducts.innerHTML = `<b>${totalPrice} kr </b>`;
}

let hideAndShowProduct = (cartContainer,goToCheckoutBtn) => {
    goToCheckoutBtn.remove();
    let arrowToggle = document.createElement("i");
    arrowToggle.classList.add("arrowToggle");
    arrowToggle.style.cursor = "pointer";
    arrowToggle.innerHTML = `<i class="fa-solid fa-angle-down" style="color: #F90035;"></i>`;

    document.querySelector(".accountDiv").append(arrowToggle);

    cartContainer.style.visibility = "hidden";
    cartContainer.setAttribute("inert", "true");
    arrowToggle.innerHTML = `<i class="fa-solid fa-angle-down" style="color: #F90035;"></i>`;
    document.querySelector(".cartProductCardContainer").style.height = "10rem";

    let paymentWrapper = document.querySelector(".paymentWrapper");
    paymentWrapper.style.display = "block";

    let state = "hidden";

    arrowToggle.addEventListener("click", () => {
    switch(state) {
        case "hidden":
            cartContainer.style.visibility = "visible";
            cartContainer.removeAttribute("inert");
            arrowToggle.innerHTML = `<i class="fa-solid fa-angle-up" style="color: #F90035;"></i>`;
            document.querySelector(".cartProductCardContainer").style.height = "auto";
            state = "visible";
            break;
        case "visible":
            cartContainer.style.visibility = "hidden";
            cartContainer.setAttribute("inert", "true");
            arrowToggle.innerHTML = `<i class="fa-solid fa-angle-down" style="color: #F90035;"></i>`;
            document.querySelector(".cartProductCardContainer").style.height = "10rem";
            state = "hidden";
            break;
    }
});

}

let paymentStage = (cartProductCardContainer,totalPrice) => {
    let paymentWrapper = document.querySelector(".paymentWrapper");
    let paymentContainer = document.createElement("div");
    paymentContainer.classList.add("paymentContainer");

    let payment = document.createElement("h2");
    payment.innerHTML = "BETALNING";
    
    let paymentOptions = document.createElement("div");
    paymentOptions.classList.add("paymentOptions");

    let checkBox = document.createElement("i");
    checkBox.innerHTML =`<i class="fa-solid fa-square-check" style="color: #9c9ea0;"></i>`

    let optionsContainer = document.createElement("div");
    optionsContainer.classList.add("optionsContainer");

    let klarnaImg = document.createElement("img");
    klarnaImg.src = "/public/Bilder/klarna.png";
    klarnaImg.style.height = "20px";
    klarnaImg.style.width = "20px";

    let klarnaInvoice = document.createElement("p");
    klarnaInvoice.innerText = "Klarna - betala med faktura";

    let buyNowBtn = document.createElement("button");
    buyNowBtn.classList.add("button");
    buyNowBtn.classList.add("buyNowBtn");
    buyNowBtn.innerHTML = "Köp nu";
    buyNowBtn.addEventListener("click", async () => {
        const token = localStorage.getItem("token");
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!token) {
        alert("Du måste vara inloggad för att göra en beställning.");
        return;
        } 
        if (cart.length === 0) {
        alert("Din varukorg är tom.");
        return;
        }
        let order = {
            products: cart.map(item => ({
            name: item.product,
            quantity: item.amount,
            price: item.price
        })),
          total: totalPrice,
        };
        console.log(order);

        try {
        const response = await axios.post("https://be-webshop-2025-fe-two.vercel.app/api/orders/",
            order,{
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
            });
         console.log("Order skickad:", response.data);
        localStorage.removeItem("cart");
        document.querySelector(".productAndPaymentContainer").style.visibility = "hidden";
        document.querySelector(".productAndPaymentContainer").setAttribute("inert", "true");
    
        let thankyouText = document.createElement("div");
        thankyouText.classList.add("thankyouText");
    
        let thankYou = document.createElement("h2");
        thankYou.innerHTML = "TACK FÖR DITT KÖP!";
    
        let p1 = document.createElement("p");
        p1.innerText = "På Mina sidor kan du se din orderbekräftelse.";
        let p2 = document.createElement("p");
        p2.innerText = "Hakim packar nu din order och skickar den inom 2 dagar.";
        cartProductCardContainer.style.visibility = "visible";
        cartProductCardContainer.removeAttribute("inert");
        cartProductCardContainer.innerHTML = "";
        cartProductCardContainer.append(thankyouText);
        thankyouText.append(thankYou, p1, p2);
    } catch (error) {
        console.error("Något gick fel vid beställningen:", error);
        alert("Kunde inte slutföra köpet. Försök igen senare.");
        }
    });

    paymentWrapper.append(paymentContainer);
    paymentContainer.append(payment,paymentOptions,buyNowBtn);
    paymentOptions.append(optionsContainer);
    optionsContainer.append(checkBox,klarnaImg,klarnaInvoice);
}

renderCart();
