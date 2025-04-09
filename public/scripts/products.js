let renderPage = async () => {
    let productCardsContainer = document.querySelector(".productCardsContainer");

    try {
        let response = await axios.get('https://be-webshop-2025-fe-two.vercel.app/api/products/');
        let products = response.data;

        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("productCard");

            let linkProductCard = document.createElement("div");
            linkProductCard.classList.add("linkProductCard");

            let productImg = document.createElement("img");
            productImg.src = product.img;
            productImg.classList.add("productImg");
            linkProductCard.appendChild(productImg);

            let price = document.createElement("p");
            price.classList.add("price");
            price.innerText = `${product.price} :-`;
            linkProductCard.appendChild(price);

            let productName = document.createElement("p");
            productName.innerHTML = product.name;
            linkProductCard.appendChild(productName);

            let buyButton = document.createElement("button");
            buyButton.classList.add("button");
            buyButton.innerHTML = "Köp";

            productCardsContainer.appendChild(productCard);
            productCard.appendChild(linkProductCard);
            productCard.appendChild(buyButton);

            let productQuantity = 1;

            buyButton.addEventListener("click", () => {
                buyButton.remove();
                addToCart(product, 1);
                
                let counterContainer = document.createElement("div");
                counterContainer.classList.add("counterContainer");
                productCard.appendChild(counterContainer);
            
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
            
                counterContainer.append(minusButton, inputQuantity, plusButton);
            });

            linkProductCard.addEventListener("click", () => {
                window.location.href = "product.html";
                window.sessionStorage.setItem("id", product._id);
            });
        });

    } catch (error) {
        console.log("Error fetching data:", error);
    }
};

let addToCart = (product, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item._id === product._id);

    if (existingProduct) {
        existingProduct.amount += quantity;
    } else {
        cart.push({
            _id: product._id,
            product: product.name,
            price: product.price,
            img: product.img,
            amount: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();
};

let updateCart = (product, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item._id === product._id);

    if (existingProduct) {
        if (quantity > 0) {
            existingProduct.amount = quantity;
        } else {
            cart = cart.filter(item => item._id !== product._id);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();
};

let updateCartIcon = () => {
    let shoppingBtn = document.querySelector(".shoppingcart");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.amount, 0);

    let redBox = shoppingBtn.querySelector(".redBox");
    if (!redBox) {
        redBox = document.createElement("div");
        redBox.classList.add("redBox");
        shoppingBtn.appendChild(redBox);
    }

    redBox.innerHTML = totalItems;
};

renderPage();
