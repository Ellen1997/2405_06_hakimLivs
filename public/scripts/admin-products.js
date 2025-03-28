let renderPage = async () => {
    let productCardsContainer = document.querySelector("#admin-all-products-container");
    try{
        let response = await axios.get('https://be-webshop-2025-fe-two.vercel.app/api/products/');
        let products = response.data;
        
        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("testar-denna");
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

            let buttonContainer = document.createElement("div");
            buttonContainer.classList.add("product-button-container");

            let editButton = document.createElement("button");
            editButton.classList.add("button");
            editButton.classList.add("icon-button");
            let buttonImgEdit = document.createElement("img");
            buttonImgEdit.src = "./Bilder/edit.png";
            buttonImgEdit.alt = "Redigera";
            buttonImgEdit.width = 20;
            editButton.appendChild(buttonImgEdit);
            buttonContainer.appendChild(editButton);

            let deleteButton = document.createElement("button");
            deleteButton.classList.add("button");
            deleteButton.classList.add("icon-button");
            let buttonImgDelete = document.createElement("img");
            buttonImgDelete.src = "./Bilder/delete.png";
            buttonImgDelete.alt = "Redigera";
            buttonImgDelete.width = 20;

            deleteButton.appendChild(buttonImgDelete);
            buttonContainer.appendChild(deleteButton);
            productCard.appendChild(buttonContainer);
            
            productCardsContainer.appendChild(productCard);
        });
    
    } catch (error){
        console.log("Error fetching data:",error);
    }
}
renderPage();
