let renderPage = async () => {
    let productCardsContainer = document.querySelector(".productCardsContainer");

    try{
        let response = await axios.get('https://be-webshop-2025-fe-two.vercel.app/api/products/');
        let products = response.data;

        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("productCard");

            let productImg = document.createElement("img");
            productImg.src = product.img;
            productImg.classList.add("productImg");
            productCard.appendChild(productImg);
            
            let price = document.createElement("p");
            price.classList.add("price");
            price.innerText = `${product.price} :-`;
            productCard.appendChild(price);
            
            let productName = document.createElement("p");
            productName.innerHTML = product.name;
            productCard.appendChild(productName);

            let buyButton = document.createElement("button");
            buyButton.classList.add("button");
            buyButton.innerHTML = "Köp";
            productCard.appendChild(buyButton);
        
            productCardsContainer.appendChild(productCard);

            productCard.addEventListener("click", () => {
                window.location.href = "product.html";
                window.sessionStorage.setItem("id",product._id);
            });
        });
    
    } catch (error){
        console.log("Error fetching data:",error);
    }
}

renderPage();