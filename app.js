function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const table = document.getElementById("orderTable");

  table.innerHTML = "";
  orders.forEach((o, index) => {
    const row = `
      <tr>
        <td>${o.customer}</td>
        <td>${o.phone}</td>
        <td>${o.weight}</td>
        <td>${o.total.toLocaleString()} đ</td>
        <td>${o.received}</td>
        <td>${o.return}</td>
        <td><button class="delete-btn" onclick="deleteOrder(${index})">X</button></td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

function deleteOrder(index) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  loadOrders();
}

document.getElementById("addOrder").addEventListener("click", () => {
  const customer = document.getElementById("customer").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const weight = Number(document.getElementById("weight").value);
  const price = Number(document.getElementById("price").value);
  const received = document.getElementById("received").value;
  const ret = document.getElementById("return").value;

  if (!customer || !weight || !price) {
    alert("Please enter all required fields!");
    return;
  }

  const total = weight * price;

  const order = {
    customer,
    phone,
    weight,
    price,
    total,
    received,
    return: ret
  };

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  loadOrders();

  alert("Order added!");
});

loadOrders();
