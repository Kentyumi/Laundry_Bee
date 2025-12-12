document.getElementById("saveBtn").addEventListener("click", () => {
  const order = {
    name: document.getElementById("customerName").value,
    phone: document.getElementById("phone").value,
    dropoff: document.getElementById("dropoffTime").value,
    pickup: document.getElementById("pickupTime").value,
    price: Number(document.getElementById("price").value),
    note: document.getElementById("note").value,
  };

  if (!order.name || !order.dropoff) {
    alert("Name and Drop-off time are required!");
    return;
  }

  const existing = JSON.parse(localStorage.getItem("laundryOrders") || "[]");
  existing.push(order);
  localStorage.setItem("laundryOrders", JSON.stringify(existing));

  alert("Order saved!");
  window.location.reload();
});
