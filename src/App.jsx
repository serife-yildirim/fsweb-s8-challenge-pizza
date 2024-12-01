import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames';
import './App.css';

function App() {
  // State for form data and order count
  const [formData, setFormData] = useState({
    boyut: 'orta',
    hamur: 'hamur-kalinligi',
    secimler: [],
    fiyat: 0,
  });
  const [count, setCount] = useState(1);


useEffect(() => {
  let totalPrice = 85.50;

  // ekstra malzemleri fiyata ekleme
  formData.secimler.forEach((secim) => {
    switch (secim) {
      case 'pepperoni':
        totalPrice += 3;
        break;
      case 'sosis':
        totalPrice += 2;
        break;
      case 'domates':
        totalPrice += 1;
        break;
      
      default:
        break;
    }
  });

  // hamur kalınlığı ve pizza boyutuna göre fiyat belirleme 
  if (formData.boyut === 'buyuk') {
    totalPrice += 10;
  }
  if (formData.hamur === 'hamur-kalinligi') {
    totalPrice += 5;
  }

  // son ücreti belirleme
  setFormData((prevData) => ({
    ...prevData,
    fiyat: totalPrice * count,
  }));
}, [formData, count]);

// Handle form data changes
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleCheckboxChange = (e) => {
  const { value } = e.target;
  setFormData((prevData) => {
    const newSecimler = prevData.secimler.includes(value)
      ? prevData.secimler.filter((item) => item !== value)
      : [...prevData.secimler, value];
    return {
      ...prevData,
      secimler: newSecimler,
    };
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  toast.success('Siparişiniz alındı!');
};

return (
  <Router>
    <div className="App">
      <nav>
        <NavLink
          to="/"
          exact
          className="nav-link"
          activeClassName="active-link"
        >
          Ana Sayfa
        </NavLink>
        <NavLink
          to="/siparis-formu"
          className="nav-link"
          activeClassName="active-link"
        >
          Sipariş Formu
        </NavLink>
        <NavLink
          to="/siparis-onayi"
          className="nav-link"
          activeClassName="active-link"
        >
          Sipariş Onayı
        </NavLink>
      </nav>

      <Switch>
        <Route path="/" exact>
          <div className="home">
            <h1>Teknolojik Yemekler</h1>
            <p>Kod acıktırır pizza, doyurur.</p>
            <NavLink to="/siparis-formu" className="order-button">
              Sipariş Ver
            </NavLink>
          </div>
        </Route>

        <Route path="/siparis-formu">
          <div className="order-form">
            <h2>Pizza Siparişi Ver</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Boyut Seç</label>
                <select
                  name="boyut"
                  value={formData.boyut}
                  onChange={handleChange}
                >
                  <option value="kucuk">Küçük</option>
                  <option value="orta">Orta</option>
                  <option value="buyuk">Büyük</option>
                </select>
              </div>

              <div>
                <label>Hamur Seç</label>
                <select
                  name="hamur"
                  value={formData.hamur}
                  onChange={handleChange}
                >
                  <option value="hamur-ince">İnce</option>
                  <option value="hamur-kalinligi">Kalın</option>
                </select>
              </div>

              <div>
                <label>Ek Malzemeler</label>
                <div>
                  <input
                    type="checkbox"
                    value="pepperoni"
                    onChange={handleCheckboxChange}
                    checked={formData.secimler.includes('pepperoni')}
                  />
                  Pepperoni
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="sosis"
                    onChange={handleCheckboxChange}
                    checked={formData.secimler.includes('sosis')}
                  />
                  Sosis
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="domates"
                    onChange={handleCheckboxChange}
                    checked={formData.secimler.includes('domates')}
                  />
                  Domates
                </div>
                {/* More toppings can be added here */}
              </div>

              <div>
                <label>Sipariş Sayısı</label>
                <button type="button" onClick={() => setCount(count - 1)}>-</button>
                <span>{count}</span>
                <button type="button" onClick={() => setCount(count + 1)}>+</button>
              </div>

              <div>
                <h3>Sipariş Tutarı: {formData.fiyat.toFixed(2)} TL</h3>
              </div>

              <button type="submit">Siparişi Ver</button>
            </form>
          </div>
        </Route>

        <Route path="/siparis-onayi">
          <div className="order-confirmation">
            <h2>Teşekkürler!</h2>
            <p>Siparişiniz alındı, en kısa zamanda hazırlanacak.</p>
          </div>
        </Route>
      </Switch>

      <ToastContainer position="top-right" />
    </div>
  </Router>
);
}

export default App;