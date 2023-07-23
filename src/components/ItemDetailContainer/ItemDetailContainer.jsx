import { useState, useEffect } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams  } from 'react-router-dom'
import './ItemDetailContainer.css'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../service/config'

const ItemDetailContainer = () => {
 
  const [producto, setProducto] = useState(null);

  const {idItem} = useParams();

    useEffect( () => {
        const nuevoDoc = doc(db, "inventario", idItem);

        getDoc(nuevoDoc)
          .then(res => {
            const data = res.data();
            const nuevoProucto = {id:res.id, ...data};
            setProducto(nuevoProucto);
          })
          .catch(error => console.log(error))

    }, [idItem])

  return (
  <>
   <div className='detalle'>
     <h4>Detalle del producto:</h4>
      <ItemDetail {...producto} />
    </div>
  </>
    
  )
}

export default ItemDetailContainer