import React, { useState } from "react";
import "../styles/Order.css";

const Order = () => {
  const [formData, setFormData] = useState({
    size: "",
    dough: "Hamur Kalınlığı",
    ingredients: [],
    quantity: 1,
    notes: "",
    price: 85.5, // Base price
    total: 85.5,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        ingredients: checked
          ? [...prev.ingredients, value]
          : prev.ingredients.filter((ingredient) => ingredient !== value),
      }));
    } else if (name === "quantity") {
      const newQuantity = Math.max(1, formData.quantity + (value === "increase" ? 1 : -1));
      setFormData((prev) => ({
        ...prev,
        quantity: newQuantity,
        total: prev.price * newQuantity,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Data:", formData);
    alert("Siparişiniz alındı!");
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2>Position Absolute Acı Pizza</h2>
      <p className="price">85.50₺</p>
      <div className="options">
        <fieldset>
          <legend>Boyut Seç</legend>
          <label><input type="radio" name="size" value="Küçük" onChange={handleChange} /> Küçük</label>
          <label><input type="radio" name="size" value="Orta" onChange={handleChange} /> Orta</label>
          <label><input type="radio" name="size" value="Büyük" onChange={handleChange} /> Büyük</label>
        </fieldset>
        <fieldset>
          <legend>Hamur Seç</legend>
          <select name="dough" value={formData.dough} onChange={handleChange}>
            <option disabled>Hamur Kalınlığı</option>
            <option value="İnce">İnce</option>
            <option value="Normal">Normal</option>
            <option value="Kalın">Kalın</option>
          </select>
        </fieldset>
      </div>
      <fieldset className="ingredients">
        <legend>Ek Malzemeler (En Fazla 10 Seçim)</legend>
        <label><input type="checkbox" name="ingredients" value="Pepperoni" onChange={handleChange} /> Pepperoni</label>
        <label><input type="checkbox" name="ingredients" value="Domates" onChange={handleChange} /> Domates</label>
        <label><input type="checkbox" name="ingredients" value="Biber" onChange={handleChange} /> Biber</label>
        <label><input type="checkbox" name="ingredients" value="Mısır" onChange={handleChange} /> Mısır</label>
        <label><input type="checkbox" name="ingredients" value="Sucuk" onChange={handleChange} /> Sucuk</label>
      </fieldset>
      <label>
        Sipariş Notu:
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Siparişe eklemek istediğiniz notlar?"></textarea>
      </label>
      <div className="quantity-total">
        <button type="button" onClick={() => handleChange({ target: { name: "quantity", value: "decrease" } })}>-</button>
        <span>{formData.quantity}</span>
        <button type="button" onClick={() => handleChange({ target: { name: "quantity", value: "increase" } })}>+</button>
        <p>Toplam: {formData.total.toFixed(2)}₺</p>
      </div>
      <button type="submit" className="submit-button">Sipariş Ver</button>
    </form>
  );
};

export default Order;
