const orderlistContainer = document.querySelector("#admin-orderlist-container");

const renderOrders = async () => {
  try {
    const response = await axios.get("https://be-webshop-2025-fe-two.vercel.app/api/orders/");
    const orders = response.data;

    orders.forEach(order => {
      const orderRow = document.createElement("div");
      orderRow.classList.add("admin-orderlist");

      orderRow.innerHTML = `
      <p><strong>Kundnamn:</strong> ${order.user.userId.username}</p>
      <p><strong>Email:</strong> ${order.user.email}</p>
      `;

      order.products.forEach(product => {
        orderRow.innerHTML += `
          <p><strong>Produkter:</strong> ${product.name}</p>
          <p><strong>Antal produkter:</strong> ${product.quantity}</p>
        `;
      });

      let statusClass = '';

      if (order.status === 'pending') {
        statusClass = 'status-pending';
      } else if (order.status === 'shipped') {
        statusClass = 'status-shipped';
      } else if (order.status === 'paid') {
        statusClass = 'status-paid';
      }

      orderRow.innerHTML += `
        <p><strong>Totalsumma:</strong> ${order.total} kr</p>
        <p><strong>Orderstatus:</strong> <span class="${statusClass}">${order.status}</span></p>
        <hr>
      `;

      orderlistContainer.append(orderRow);
    });

  } catch (error) {
    console.error("Något gick fel :", error);
  }
};

renderOrders();
