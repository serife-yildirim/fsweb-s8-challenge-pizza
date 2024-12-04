import Button from './Button';
import Urunler from './Urunler';
import "../Styles/OrderForm.css";
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function OrderForm() {
    const [size, setSize] = useState('');
    const [selectUrunler, setSelectUrunler] = useState([]);
    const [isim, setIsim] = useState('');
    const [notes, setNotes] = useState('');
    const [dough, setDough] = useState('');
    const [pizzaCount, setPizzaCount] = useState(1);
    const history = useHistory();

    const handleSize = (event) => {
        setSize(event.target.value);
    };

    const handleSelectUrunler = (event) => {
        const urun = event.target.value;
        setSelectUrunler((items) =>
            event.target.checked
                ? [...items, urun]
                : items.filter((item) => item !== urun)
        );
    };

    const handleNameChange = (event) => {
        setIsim(event.target.value);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleDoughChange = (event) => {
        setDough(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const orderData = {
            isim,
            boyut: size,
            ekMalzemeler: selectUrunler,
            note: notes,
            hamurKalınlığı: dough,
            pizzaSayisi: pizzaCount,
        };

        axios
            .post('https://reqres.in/api/pizza', orderData)
            .then((res) => {
                if (res.data && res.data.id) {
                    history.push('/success', { formData: orderData, count: pizzaCount });
                } else {
                    history.push('/order');
                }
            })
            .catch((error) => {
                console.error('Sipariş sırasında bir hata oluştu:', error);
                history.push('/order');
            });
    };

    const isFormValid =
        size &&
        selectUrunler.length >= 4 &&
        selectUrunler.length <= 10 &&
        isim.length >= 3 &&
        dough &&
        pizzaCount > 0;

    const addPizza = () => {
        setPizzaCount(pizzaCount + 1);
    };

    const removePizza = () => {
        if (pizzaCount > 1) {
            setPizzaCount(pizzaCount - 1);
        }
    };

    const selectedMaterialsPrice = selectUrunler.length * 5;
    const basePrice = 85.5;
    const totalAmount = (basePrice + selectedMaterialsPrice) * pizzaCount;

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="size">
                    <div>
                        <h4>Boyut Seç</h4>
                        <input
                            type="radio"
                            name="size"
                            value="small"
                            onChange={handleSize}
                            checked={size === 'small'}
                            data-cy="size-small"
                        />
                        <label htmlFor="kucuk">Küçük</label>

                        <input
                            type="radio"
                            name="size"
                            value="medium"
                            onChange={handleSize}
                            checked={size === 'medium'}
                            data-cy="size-medium"
                        />
                        <label htmlFor="orta">Orta</label>

                        <input
                            type="radio"
                            name="size"
                            value="large"
                            onChange={handleSize}
                            checked={size === 'large'}
                            data-cy="size-large"
                        />
                        <label htmlFor="buyuk">Büyük</label>
                    </div>
                    <div>
                        <h4>Hamur Seç</h4>
                        <select
                            value={dough}
                            onChange={handleDoughChange}
                            data-cy="size-dough"
                        >
                            <option value="">Hamur Kalınlığı</option>
                            <option value="ince">İnce</option>
                            <option value="normal">Normal</option>
                            <option value="kalın">Kalın</option>
                        </select>
                    </div>
                </div>

                <Urunler handleSelectUrunler={handleSelectUrunler} />
                <div>
                    <label>İsim:</label>
                    <label>
                        <input
                            type="text"
                            id="name"
                            value={isim}
                            onChange={handleNameChange}
                            minLength={3}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>Sipariş Notu</label>
                    <div>
                        <label>
                            <textarea
                                placeholder="Siparişine eklemek istediğin bir not var mı?"
                                value={notes}
                                onChange={handleNotesChange}
                            />
                        </label>
                    </div>
                </div>
                <Button
                    isFormValid={isFormValid}
                    pizzaCount={pizzaCount}
                    add={addPizza}
                    removed={removePizza}
                    selectedMaterialsPrice={selectedMaterialsPrice}
                    totalAmount={totalAmount}
                />
            </form>
        </div>
    );
}

export default OrderForm;
