const orders = JSON.parse(localStorage.getItem("laundryOrders") || "[]");
const tbody = document.querySelector("#ordersTable tbody");
let total = 0;

orders.forEach(o => {
  const row = `
    <tr>
      <td>${o.name}</td>
      <td>${o.phone}</td>
      <td>${o.dropoff}</td>
      <td>${o.pickup}</td>
      <td>${o.price.toLocaleString()}</td>
      <td>${o.note}</td>
    </tr>
  `;

  total += o.price;
  tbody.innerHTML += row;
});

document.getElementById("totalRevenue").innerText = total.toLocaleString();
