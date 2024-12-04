import "../Styles//Urunler.css";

function Urunler({ handleSelectUrunler }) {
    const urunListesi = [
        { name: "Papperoni" },
        { name: "Sosis" },
        { name: "Kanada Jambonu" },
        { name: "Tavuk Izgara" },
        { name: "Soğan" },
        { name: "Domates" },
        { name: "Mısır" },
        { name: "Sucuk" },
        { name: "Jalepeno" },
        { name: "Sarımsak" },
        { name: "Biber" },
        { name: "Ananas" },
        { name: "Kabak" },
    ];

    return (
        <div>
            <label className="urunler">Ek Malzemeler</label>
            <div>
                <label>En fazla 10 malzeme seçebilirsiniz. 5₺</label>
            </div>
            <div className="check">
                {urunListesi.map((urun, index) => (
                    <div key={index} className="urunler-item">
                        <input
                            type="checkbox"
                            id={urun.name}
                            value={urun.name}
                            onChange={handleSelectUrunler}
                            data-cy={`checkbox-${urun.name}`}
                        />
                        <label htmlFor={urun.name}>{urun.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Urunler;
