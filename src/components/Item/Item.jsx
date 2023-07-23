import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({id, nombre, precio, img, stock}) => {
  return (
    <div className='contenedor'>
        <img src={img} alt={nombre} />
        <h3> {nombre} </h3>
        <p>Precio: $ {precio} </p>
        <p>Articulo: {id} </p>
        <p>Stock: {stock} </p>
        <Link to={`/Item/${id}`}> Ver detalles </Link>
    </div>
  )
}

export default Item