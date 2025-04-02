let renderPage = async () => {
    const id = sessionStorage.getItem("id");
    let singleProductCardContainer = document.querySelector(".singleProductCardContainer");

    try{
        let response = await axios.get(`https://be-webshop-2025-fe-two.vercel.app/api/products/${id}`);
        let product = response.data;

        let categoryContainer = document.createElement("div");
        categoryContainer.classList.add("categoryContainer");

        let categoryBar = document.createElement("p");
        categoryBar.innerHTML = `${product.category} > ${product.name}`;
        categoryContainer.appendChild(categoryBar);

        let imgAndProductInfoContainer = document.createElement("div");
        imgAndProductInfoContainer.classList.add("imgAndProductInfoContainer");

        let productImg = document.createElement("img");
        productImg.src = product.img;
        productImg.classList.add("singleProductImg");
        imgAndProductInfoContainer.appendChild(productImg);

        let productNamePriceAndButtonContainer = document.createElement("div");
        productNamePriceAndButtonContainer.classList.add("productNamePriceAndButtonContainer");

        let productName = document.createElement("h2");
        productName.innerHTML = product.name;
        productNamePriceAndButtonContainer.appendChild(productName);

        let price = document.createElement("h1");
        price.classList.add("singlePrice");
        price.innerText = `${product.price} :-`;
        productNamePriceAndButtonContainer.appendChild(price);

        let buyButton = document.createElement("button");
        buyButton.classList.add("button");
        buyButton.innerHTML = "Köp";
        productNamePriceAndButtonContainer.append(buyButton);
        
        let productQuantity = 1;
        let cartQuantity = 0;

        buyButton.addEventListener("click", () => {
            buyButton.remove();
            addToCart(cartQuantity);
            let counterContainer = document.createElement("div");
            counterContainer.classList.add("counterContainer");
            productNamePriceAndButtonContainer.appendChild(counterContainer);

            let inputQuantity = document.createElement("input");
            inputQuantity.type = "numeric";
            inputQuantity.value = productQuantity;
            inputQuantity.classList.add("inputQuantity");

            let plusButton = document.createElement("button");
            plusButton.innerHTML = "+";
            plusButton.classList.add("plusButton");
            plusButton.addEventListener("click", () => {
                productQuantity ++;
                cartQuantity++;
                addToCart(cartQuantity);
                inputQuantity.value = productQuantity;
            })

            minusButton = document.createElement("button");
            minusButton.innerHTML = "-";
            minusButton.classList.add("minusButton");
            minusButton.addEventListener("click", () => {
                if (productQuantity > 1) {
                    productQuantity --;
                    cartQuantity --;
                    addToCart(cartQuantity);
                    inputQuantity.value = productQuantity;
                }
            })
            counterContainer.append(minusButton,inputQuantity,plusButton);
        });

        let line = document.createElement("hr");
        line.style.width = "100%";
        line.style.color = "grey";

        let productInfoContainer = document.createElement("div");
        productInfoContainer.classList.add("productInfoContainer");

        let productInfoTitle = document.createElement("h3");
        productInfoTitle.classList.add("productInfoTitle-h3");
        productInfoTitle.innerText = "Produktinformation";

        let productInfo = document.createElement("p");
        productInfo.innerText = product.description;
        productInfoContainer.append(line,productInfoTitle,productInfo);


        singleProductCardContainer.append(categoryContainer,imgAndProductInfoContainer,productInfoContainer);
        imgAndProductInfoContainer.append(productNamePriceAndButtonContainer);

    } catch (error){
        console.log("Error fetching data:",error);
    }
}
let addToCart = (cartQuantity) => {
    let shoppingBtn = document.querySelector(".shoppingcart");
    cartQuantity++;
    
    let redBox = shoppingBtn.querySelector(".redBox");
    if(!redBox){
        redBox = document.createElement("div");
        redBox.classList.add("redBox");
        shoppingBtn.appendChild(redBox);
    }
    redBox.innerHTML = cartQuantity;
}

renderPage();
