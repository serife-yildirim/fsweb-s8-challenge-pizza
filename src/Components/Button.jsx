import React from 'react'
import "../Styles/Button.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Button({ isFormValid, pizzaCount, add, removed, totalAmount, selectedMaterialsPrice }) {
  const history = useHistory()
  const handleOrder = () => {
    if(isFormValid){
      history.push('/success')
    }
  }

  return (
    <div className='lower'>
      <div>
        <button onClick={removed}>-</button>
        <span className='count'> {pizzaCount} </span>
        <button onClick={add}>+</button>
      </div>
      <div>
        <h4>Sipariş Toplamı</h4>
        <p>Seçimler: {selectedMaterialsPrice.toFixed(2)}₺</p>
        <p style={{color: 'red'}}>Toplam: {totalAmount.toFixed(2)}₺</p>
        <button className='siparis' type='button' disabled={!isFormValid} onClick={handleOrder}>Sipariş Ver</button>
      </div>
    </div>
  )
}

export default Button