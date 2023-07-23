import { useState } from "react"
import './ItemCount.css'

const ItemCount = ({ inicial, stock, funcionAgregar }) => {

 const [contador, setContador] = useState(inicial);

 const incrementar = () => {
  if(contador < stock) {
     setContador(contador + 1);
    }
 }

 const decrementar = () => {
    if(contador > inicial) {
     setContador(contador - 1);
    }
 }

 return (
    <>
     <div className="contadores">
        <button onClick={decrementar}> - </button>
        <p className="numero"> {contador} </p>
        <button onClick={incrementar}> + </button>
     </div>
     
     <div className="botonAgregar">
       <button onClick={() => funcionAgregar(contador)}> Agregar al carrito </button>
     </div>
     
    </>
        
 )
}


export default ItemCount