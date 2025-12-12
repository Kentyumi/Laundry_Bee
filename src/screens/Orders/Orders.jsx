// src/screens/Orders/Orders.js
import React, { useState, useEffect } from "react";
import "./Orders.css";

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

export default function OrdersApp() {
  const [currentLang, setCurrentLang] = useState(localStorage.getItem("lang") || "en");
  const [orders, setOrders] = useState([]);
  const t = LANG[currentLang];

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const ordersData = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(ordersData);
  };

  const saveOrders = (ordersData) => {
    localStorage.setItem("orders", JSON.stringify(ordersData));
    setOrders(ordersData);
  };

  const addOrder = () => {
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
    const newOrders = [...orders, order];
    saveOrders(newOrders);

    alert(t.added);

    // Clear inputs
    document.getElementById("customer").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("price").value = "";
    document.getElementById("received").value = "";
    document.getElementById("return").value = "";
  };

  const deleteOrder = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    saveOrders(newOrders);
  };

  const toggleLanguage = () => {
    const lang = currentLang === "en" ? "vi" : "en";
    setCurrentLang(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="orders-card">
      <button id="toggleLang" onClick={toggleLanguage}>
        {currentLang === "en" ? "🇻🇳 Tiếng Việt" : "🇺🇸 English"}
      </button>

      <h2 id="newOrderTitle">{t.newOrder}</h2>

      <div className="input-group">
        <label id="lblCustomer">{t.customer}</label>
        <input type="text" id="customer" placeholder={t.customer} />
      </div>
      <div className="input-group">
        <label id="lblPhone">{t.phone}</label>
        <input type="text" id="phone" placeholder={t.phone} />
      </div>
      <div className="input-group">
        <label id="lblWeight">{t.weight}</label>
        <input type="number" id="weight" placeholder={t.weight} />
      </div>
      <div className="input-group">
        <label id="lblPrice">{t.price}</label>
        <input type="number" id="price" placeholder={t.price} />
      </div>
      <div className="input-group">
        <label id="lblReceived">{t.received}</label>
        <input type="date" id="received" />
      </div>
      <div className="input-group">
        <label id="lblReturn">{t.return}</label>
        <input type="date" id="return" />
      </div>

      <button id="addOrder" onClick={addOrder}>{t.addOrder}</button>

      <h2 id="orderListTitle">{t.ordersList}</h2>
      <table>
        <thead>
          <tr>
            <th id="colCustomer">{t.colCustomer}</th>
            <th id="colPhone">{t.colPhone}</th>
            <th id="colKg">{t.colKg}</th>
            <th id="colTotal">{t.colTotal}</th>
            <th id="colReceived">{t.colReceived}</th>
            <th id="colReturn">{t.colReturn}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, index) => (
            <tr key={index}>
              <td>{o.customer}</td>
              <td>{o.phone}</td>
              <td>{o.weight}</td>
              <td>{o.total.toLocaleString()} đ</td>
              <td>{o.received}</td>
              <td>{o.return}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteOrder(index)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
