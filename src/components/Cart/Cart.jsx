import { useContext } from "react"
import { carritoContext } from "../../context/CarritoContex"
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"
import './Cart.css'

const Cart = () => {
    
    const {carrito, vaciarCarrito, total, cantidadTotal} = useContext(carritoContext);

    
    if(cantidadTotal === 0) {
       return (
        <>
        <div className="carritoVacio">
         <h2>No hay productos en el carrito</h2>
         <Link to="/">Seguir viendo productos</Link>
        </div>
        </>
       )
        
    }

  return (
    <div className="cart">
      <h3>Detalle de tu compra:</h3>
     {carrito.map(producto => <CartItem key={producto.id} {...producto} /> )}
     <h3>Total: ${total} </h3>
     <h3> Cantidad de productos: {cantidadTotal} </h3>
     <button onClick={() => vaciarCarrito()} > Vaciar carrito </button>
     <Link to="/Checkout"> Finalizar compra </Link>
    </div>
       
  )
}

export default Cart

