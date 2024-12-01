import React from "react";

function SiparisOnayi({ formData, count }) {
  return (
    <div className="hero-section flex-col gap-m">
      <div className="text-center">
        <h2>Siparişiniz Başarılı!</h2>
      </div>
      <div className="flex-col gap-m text-center bigger barlow order-bg">
        <div className="text-center">
          <h3 className="big white text-center">SEÇİMLERİNİZ</h3>
        </div>
        <div>
          <strong>Pizza Seçimi:</strong> {formData.pizzaSecim}
        </div>
        <div>
          <strong>Adet:</strong> {count}
        </div>
        <div>
          <strong>Boyut:</strong> {formData.boySecim}
        </div>
        <div>
          <strong>Hamur Kalınlığı:</strong> {formData.kalinlikSecim}
        </div>
        <div>
          <strong>Ekstra Malzemeler:</strong> {formData.secimler.join(", ")}
        </div>
        <div>
          <strong>Sipariş Notu:</strong> {formData.siparisNotu}
        </div>
        <div>
          <strong>Teslimat Türü:</strong>{" "}
          {formData.npmHizindaTeslimat ? "NPM Hızında 🛵💨" : "Standart"}
        </div>
        <div>
          <h3 className="black">Toplam Tutar:</h3>
          {formData.npmHizindaTeslimat && (
            <h3 className="deli">Acil Teslim: 50 TL</h3>
          )}
          <h4>{formData.total} TL</h4>
        </div>
      </div>
    </div>
  );
}

export default SiparisOnayi;
