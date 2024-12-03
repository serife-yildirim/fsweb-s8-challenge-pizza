import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Success.css";

const Success = () => {
  const location = useLocation();
  const orderData = location.state || {
    size: "Orta",
    dough: "Normal",
    ingredients: ["Pepperoni", "Domates"],
    quantity: 1,
    total: 85.5,
  };

  return (
    <div className="success-page">
      <h1>Siparişiniz Alındı!</h1>
      <p>Afiyet olsun! Siparişiniz başarıyla alındı.</p>
      <div className="order-summary">
        <h2>Sipariş Özeti</h2>
        <p><strong>Boyut:</strong> {orderData.size}</p>
        <p><strong>Hamur:</strong> {orderData.dough}</p>
        <p><strong>Malzemeler:</strong> {orderData.ingredients.join(", ")}</p>
        <p><strong>Adet:</strong> {orderData.quantity}</p>
        <p><strong>Toplam Fiyat:</strong> {orderData.total.toFixed(2)}₺</p>
      </div>
      <Link to="/">
        <button className="back-button">Anasayfaya Dön</button>
      </Link>
    </div>
  );
};

export default Success;
