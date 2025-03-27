const name = document.querySelector("#product-name");
const description = document.querySelector("#product-description");
const price = document.querySelector("#product-price");
const stock = document.querySelector("#product-stock");
const category = document.querySelector("#admin-dropdown-category");
const img = document.querySelector("#product-image");
const saveBtn = document.querySelector("#admin-save-button");

const postData = async (URL, data) => {
    try {
      const response = await axios.post(URL, data);
      clearInput();
      alert("Produkten har lagts till!");
    
    } catch (error) {
        console.log("Error no added product:",error);
    }
  };

  const newProduct = {
    name: name.value,
    price: Number(price.value),
    description: description.value,
    stock: Number(stock.value),
    category: category.value,
    img: img.value
  };

saveBtn.addEventListener("click", async () => {
  const newProduct = {
    name: name.value,
    price: price.value,
    description: description.value,
    stock: stock.value,
    category: category.value,
    img: img.value
  };

  await postData("https://be-webshop-2025-fe-two.vercel.app/api/products/", newProduct);
});
