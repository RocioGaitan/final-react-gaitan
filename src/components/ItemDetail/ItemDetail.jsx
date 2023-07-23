import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'
import { carritoContext } from '../../context/CarritoContex'

const ItemDetail = ({ id, nombre, precio, img, stock }) => {
  const [agregarCantidad, setAgregarCantidad] = useState(0);
  
  const {agregarProducto} = useContext(carritoContext);

  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    const item = {id, nombre, precio};
    agregarProducto(item, cantidad);
  }

  return (
    <div className='detalleProductos'>
        <img src={img} alt={nombre} />
        <h2>{nombre} </h2>
        <h3>Precio: ${precio} </h3>
        <h3>Articulo: {id} </h3>
        <h3>Stock: {stock}</h3>
       <div className='botonCompra'>
       {
         agregarCantidad > 0 ? (<Link to="/cart"> Finalizar Compra</Link>) : (<ItemCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad}/>)
        }
       </div>
    </div>   
       
  )
}

export default ItemDetail