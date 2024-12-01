import { sizes, kalinlik, ekstralar, puan } from "./secenekler";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SiparisFormu({ formData, setFormData, count, setCount }) {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        if (name === "npmHizindaTeslimat") {
          return {
            ...prevData,
            npmHizindaTeslimat: checked,
            total: checked ? prevData.total + 50 : prevData.total - 50,
          };
        } else {
          const updatedSecimler = checked
            ? [...prevData.secimler, value]
            : prevData.secimler.filter((item) => item !== value);
          return { ...prevData, secimler: updatedSecimler };
        }
      }
      return { ...prevData, [name]: value };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.boySecim) {
      newErrors.boyut = "Bir boyut seçmelisiniz.";
    }

    if (!formData.kalinlikSecim) {
      newErrors.hamur = "Hamur kalınlığı seçmelisiniz.";
    }

    if (formData.secimler.length < 3) {
      newErrors.ekstralar = "En az 3 malzeme seçmelisiniz.";
    }

    if (!formData.siparisNotu) {
      newErrors.siparisNotu = "Sipariş notu boş bırakılamaz.";
    } else if (formData.siparisNotu.length < 5) {
      newErrors.siparisNotu = "Sipariş notu en az 5 karakter olmalıdır.";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData, count]);

  const decrement = (e) => {
    e.preventDefault();
    count > 1 ? setCount(count - 1) : setCount(1);
  };

  const increment = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid) {
      axios
        .post("https://reqres.in/api/pizza", formData)
        .then((response) => {
          toast.success("Sipariş başarılıyla alındı, afiyet olsun");
          navigate("/siparis-onayi");
        })
        .catch((error) => {
          toast.error("Bir hata oluştu, lütfen tekrar deneyin.");
        });
    }
  };

  return (
    <div className="bg-secondary p-ts reset-padding">
      <div className="container-md flex-col gap-s barlow">
        <h2>{puan.isim}</h2>
        <div className="flex between">
          <p className="pricetag">{formData.fiyat} TL</p>
          <div className="flex gap-m review">
            <div>
              <p>⭐ ({puan.p})</p>
            </div>
            <div>
              <p>🗨 ({puan.com})</p>
            </div>
          </div>
        </div>
        <article className="article">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
        </article>
        <form className="barlow flex-col between" onSubmit={handleSubmit}>
          <div className="flex between margin-bottom">
            <div className="flex-col gap-s">
              <h3 className="margin-bottom">
                Boyut Seç <span style={{ color: "red" }}>*</span>
              </h3>
              {sizes.map((boyut) => (
                <label className="flex gap-s" key={boyut.id}>
                  <input
                    type="radio"
                    name="boySecim"
                    value={boyut.boy}
                    checked={formData.boySecim === boyut.boy}
                    onChange={handleChange}
                  />
                  {boyut.boy}
                </label>
              ))}
              {errors.boyut && <p style={{ color: "red" }}>{errors.boyut}</p>}
            </div>

            <div>
              <label htmlFor="hamur" className="flex-col">
                <h3 className="margin-bottom">
                  Hamur Kalınlığı <span style={{ color: "red" }}>*</span>
                </h3>
                <select
                  name="kalinlikSecim"
                  value={formData.kalinlikSecim}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Kalınlık Seçiniz
                  </option>
                  {kalinlik.map((kalinlik) => (
                    <option key={kalinlik.id} value={kalinlik.size}>
                      {kalinlik.size}
                    </option>
                  ))}
                </select>
              </label>
              {errors.hamur && <p style={{ color: "red" }}>{errors.hamur}</p>}
            </div>
          </div>

          <div>
            <h2>Ek Malzemeler</h2>
            <p className="margin-bottom">
              En az 3, fazla 10 malzeme seçebilirsiniz.
              <span style={{ color: "red", fontWeight: "600" }}>&nbsp; Tanesi 5 TL</span>
            </p>
            <div className="grid-container">
              {ekstralar.map((ekstra) => (
                <div className="grid-item" key={ekstra.id}>
                  <label className="flex gap-s margin-bottom semi-bold">
                    <input
                      type="checkbox"
                      name="secimler"
                      value={ekstra.name}
                      onChange={handleChange}
                      disabled={formData.secimler.length >= 10}
                    />
                    {ekstra.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.ekstralar && (
              <p style={{ color: "red" }}>{errors.ekstralar}</p>
            )}
          </div>

          <div className="flex-col margin-bottom-lg">
            <label htmlFor="siparisNotu">
              <h3>Sipariş Notu:</h3>
            </label>
            <textarea
              name="siparisNotu"
              value={formData.siparisNotu}
              onChange={handleChange}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              style={{
                maxWidth: "960px",
                minWidth: "376px",
                borderRadius: "5px",
              }}
              cols={5}
              rows={4}
            />
            {errors.siparisNotu && (
              <p style={{ color: "red" }}>{errors.siparisNotu}</p>
            )}
          </div>
          <hr />
          <label className="flex gap-s semi-bold padding-s">
            <input
              type="checkbox"
              name="npmHizindaTeslimat"
              checked={formData.npmHizindaTeslimat}
              onChange={handleChange}
            />
            Npm Hızında Acil Teslimat 🛵💨
            <span style={{ color: "red" }}>(+50 TL)</span>
          </label>

          <hr className="margin-bottom-lg" />
          <div className="flex between">
            <div className="buton-div">
              <button className="buton" onClick={decrement}>
                -
              </button>
              <div className="counter semi-bold">{count}</div>
              <button className="buton" onClick={increment}>
                +
              </button>
            </div>

            <div className="order-container">
              <div className="flex-col">
                <h3 className="padding-s">Sipariş Toplamı</h3>
                <div className="flex between padding-s semi-bold">
                  <div>Seçimler:</div>
                  <div>{formData.secimler.length * 5} TL</div>
                </div>
                <div
                  className="flex between padding-s margin-bottom semi-bold"
                  style={{ color: "#CE2829" }}
                >
                  <div>Toplam:</div>
                  <div>
                    {formData.total}
                    TL
                  </div>
                </div>
                <button
                  type="submit"
                  className="buton semi-bold black padding-s"
                  disabled={!isValid}
                >
                  SİPARİŞ VER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SiparisFormu;
