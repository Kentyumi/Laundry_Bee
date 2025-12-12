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
// HELPERS
// ----------------------------
const $ = (id) => document.getElementById(id);

// ----------------------------
// APPLY LANGUAGE
// ----------------------------
function applyLanguage() {
  const t = LANG[currentLang];
  const map = {
    newOrderTitle: t.newOrder,
    lblCustomer: t.customer,
    lblPhone: t.phone,
    lblWeight: t.weight,
    lblPrice: t.price,
    lblReceived: t.received,
    lblReturn: t.return,
    addOrder: t.addOrder,
    orderListTitle: t.ordersList,
    colCustomer: t.colCustomer,
    colPhone: t.colPhone,
    colKg: t.colKg,
    colTotal: t.colTotal,
    colReceived: t.colReceived,
    colReturn: t.colReturn
  };

  Object.keys(map).forEach(id => {
    const el = $(id);
    if (el) el.textContent = map[id];
  });
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
  const table = $("orderTable");
  if (!table) return;

  table.innerHTML = orders.map((o, index) => `
    <tr>
      <td>${o.customer}</td>
      <td>${o.phone}</td>
      <td>${o.weight}</td>
      <td>${o.total.toLocaleString()} đ</td>
      <td>${o.received}</td>
      <td>${o.return}</td>
      <td><button class="delete-btn" onclick="deleteOrder(${index})">X</button></td>
    </tr>
  `).join("");
}

function deleteOrder(index) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  loadOrders();
}

function addOrder() {
  const t = LANG[currentLang];
  const customer = $("customer").value.trim();
  const phone = $("phone").value.trim();
  const weight = Number($("weight").value);
  const price = Number($("price").value);
  const received = $("received").value;
  const ret = $("return").value;

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

  // Clear inputs
  $("customer").value = "";
  $("phone").value = "";
  $("weight").value = "";
  $("price").value = "";
  $("received").value = "";
  $("return").value = "";
}

// ----------------------------
// LOGOUT
// ----------------------------
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// ----------------------------
// INIT
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();
  loadOrders();

  const addBtn = $("addOrder");
  if (addBtn) addBtn.addEventListener("click", addOrder);

  const toggleBtn = $("toggleLang");
  if (toggleBtn) toggleBtn.addEventListener("click", toggleLanguage);
});
