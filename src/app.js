// src/screens/Orders/Orders.jsx
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

export default function OrdersScreen({ lang, onLogout, toggleLanguage }) {
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [received, setReceived] = useState("");
  const [ret, setRet] = useState("");

  const t = LANG[lang];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const handleAddOrder = () => {
    if (!customer || !weight || !price) {
      alert(t.required);
      return;
    }
    const total = Number(weight) * Number(price);
    const newOrder = { customer, phone, weight, price, total, received, return: ret };
    const updatedOrders = [...orders, newOrder];
    saveOrders(updatedOrders);
    alert(t.added);

    setCustomer(""); setPhone(""); setWeight(""); setPrice(""); setReceived(""); setRet("");
  };

  const handleDelete = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    saveOrders(updatedOrders);
  };

  return (
    <div className="orders-wrapper">
      <div className="orders-header">
        <h2>{t.newOrder}</h2>
        <div>
          <button onClick={toggleLanguage} className="lang-btn">{lang.toUpperCase()}</button>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {/* Add Order Form */}
      <div className="order-form">
        <input type="text" placeholder={t.customer} value={customer} onChange={(e)=>setCustomer(e.target.value)} />
        <input type="text" placeholder={t.phone} value={phone} onChange={(e)=>setPhone(e.target.value)} />
        <input type="number" placeholder={t.weight} value={weight} onChange={(e)=>setWeight(e.target.value)} />
        <input type="number" placeholder={t.price} value={price} onChange={(e)=>setPrice(e.target.value)} />
        <input type="date" placeholder={t.received} value={received} onChange={(e)=>setReceived(e.target.value)} />
        <input type="date" placeholder={t.return} value={ret} onChange={(e)=>setRet(e.target.value)} />
        <button onClick={handleAddOrder}>{t.addOrder}</button>
      </div>

      {/* Orders Table */}
      <h3>{t.ordersList}</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>{t.colCustomer}</th>
            <th>{t.colPhone}</th>
            <th>{t.colKg}</th>
            <th>{t.colTotal}</th>
            <th>{t.colReceived}</th>
            <th>{t.colReturn}</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <
