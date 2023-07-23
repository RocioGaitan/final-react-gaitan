import { useContext } from 'react'
import { carritoContext } from '../../context/CarritoContex'
import { Link } from 'react-router-dom'
import './CartWidget.css'



const CartWidget = () => {
  const {cantidadTotal} = useContext(carritoContext);

  const carrito = "../img/carritodecompras.png";

  return (
    <div className='ladoDerecho'>
      <Link to="/cart"> 
      <img className='carrito' src={carrito} alt="imagen del carrito de compras" />
       {
         cantidadTotal > 0 && <strong> {cantidadTotal} </strong>
       }
      </Link>
    </div>
  )

}

export default CartWidget