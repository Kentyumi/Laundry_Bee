// ----------------------------
// LANGUAGE DATA
// ----------------------------
const LANG = {
  en: {
    newOrder: "New Order",
    customer: "Customer Name",
    phone: "Phone Number",
    weight: "Weight (kg)",
    price: "Price per kg",
    received: "Received Date",
    return: "Return Date",
    addOrder: "Add Order",
    ordersList: "Orders List",
    colCustomer: "Customer",
    colPhone: "Phone",
    colKg: "Kg",
    colTotal: "Total",
    colReceived: "Received",
    colReturn: "Return",
    added: "Order added!",
    required: "Please enter all required fields!"
  },
  vi: {
    newOrder: "Đơn Hàng Mới",
    customer: "Tên Khách Hàng",
    phone: "Số Điện Thoại",
    weight: "Số ký (kg)",
    price: "Giá mỗi ký",
    received: "Ngày Nhận",
    return: "Ngày Trả",
    addOrder: "Thêm Đơn",
    ordersList: "Danh Sách Đơn Hàng",
    colCustomer: "Khách",
    colPhone: "Điện thoại",
    colKg: "Kg",
    colTotal: "Tổng tiền",
    colReceived: "Ngày nhận",
    colReturn: "Ngày trả",
    added: "Đã thêm đơn!",
    required: "Vui lòng nhập đầy đủ thông tin!"
  }
};

let currentLang = localStorage.getItem("lang") || "en";

// ----------------------------
// APPLY LANGUAGE
// ----------------------------
function applyLanguage() {
  const t = LANG[currentLang];

  document.getElementById("newOrderTitle").textContent = t.newOrder;
  document.getElementById("lblCustomer").textContent = t.customer;
  document.getElementById("lblPhone").textContent = t.phone;
  document.getElementById("lblWeight").textContent = t.weight;
  document.getElementById("lblPrice").textContent = t.price;
  document.getElementById("lblReceived").textContent = t.received;
  document.getElementById("lblReturn").textContent = t.return;

  document.getElementById("addOrder").textContent = t.addOrder;
  document.getElementById("orderListTitle").textContent = t.ordersList;

  document.getElementById("colCustomer").textContent = t.colCustomer;
  document.getElementById("colPhone").textContent = t.colPhone;
  document.getElementById("colKg").textContent = t.colKg;
  document.getElementById("colTotal").textContent = t.colTotal;
  document.getElementById("colReceived").textContent = t.colReceived;
  document.getElementById("colReturn").textContent = t.colReturn;
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "vi" : "en";
  localStorage.setItem("lang", currentLang);
  applyLanguage();
}

// ----------------------------
// ORDER FUNCTIONS
// ----------------------------
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
  const t = LANG[currentLang];

  const customer = document.getElementById("customer").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const weight = Number(document.getElementById("weight").value);
  const price = Number(document.getElementById("price").value);
  const received = document.getElementById("received").value;
  const ret = document.getElementById("return").value;

  if (!customer || !weight || !price) {
    alert(t.required);
    return;
  }

  const total = weight * price;

  const order = { customer, phone, weight, price, total, received, return: ret };

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  loadOrders();

  alert(t.added);
});

// ----------------------------
// INI
