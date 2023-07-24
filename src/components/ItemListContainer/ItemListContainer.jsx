import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import './ItemListContainer.css'
import { db } from '../../service/config'
import { collection, getDocs, query, where } from 'firebase/firestore'


const ItemListContainer = () => {
  const[productos, setProductos] = useState([]);
  const {idCategoria} = useParams();

  useEffect( () => {
    
    const misProductos = idCategoria ? query(collection(db, "inventario"), where ("idCat", "==", idCategoria)) : collection(db, "inventario");

    getDocs(misProductos)
    .then(res =>{
      const nuevoProducto = res.docs.map(doc =>{
      const data = doc.data();
      return {id: doc.id, ...data}
    })
    setProductos(nuevoProducto);
    })
    .catch(error => console.log(error));
  }, [idCategoria]);


  return (
    <>
      <div>
      <h3>¡La ropa interior que va con cada prenda!</h3>
      <h3 style={{ textAlign: "center" }}> Nueva Coleccion </h3>
        <ItemList productos={productos} />
      </div>
    
     </>
  )
}

export default ItemListContainer