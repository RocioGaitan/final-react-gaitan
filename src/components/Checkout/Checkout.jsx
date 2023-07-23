import { useState, useContext } from "react"
import { carritoContext } from "../../context/CarritoContex"
import { db } from "../../service/config"
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore'
import './Checkout.css'

const Checkout = () => {
 const {carrito, vaciarCarrito, cantidadTotal, total} = useContext(carritoContext);
 const [nombre, setNombre] = useState("");
 const [apellido, setApellido] = useState("");
 const [telefono, setTelefono] = useState("");
 const [email, setEmail] = useState("");
 const [emailConfirmacion, setEmailConfirmacion] = useState("");
 const [error, setError] = useState("");
 const [ordenId, setOrdenId] = useState("");

 const manejadorFormulario = (e) => {
     e.preventDefault();

     if(!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
        setError("Porfavor complete todos los campos");
        return;
     }

     if(email !== emailConfirmacion) {
        setError("Los campos de email no coinciden. Porfavor ingresa el mismo email");
        return;
     }

     const orden = {
        items: carrito.map(producto => ({
            id: producto.item.id,
            nombre: producto.item.nombre,
            cantidad: producto.cantidad
        })),
        total: cantidadTotal,
        nombre,
        apellido,
        telefono,
        email,
     };

     Promise.all(
        orden.items.map(async (producto) => {
            const productoRef = doc(db, "inventario", producto.id);
            const productoDoc = await getDoc(productoRef);
            const stockActual = productoDoc.data().stock;

            await updateDoc(productoRef, {
                stock: stockActual - producto.cantidad
            });
           
        })
     )
        .then(() => {
            addDoc(collection(db, "ordenes"), orden)
                .then((docRef) => {
                    setOrdenId(docRef.id);
                    vaciarCarrito();
                })
                .catch((error) => {
                    console.log("Error al crear la orden", error);
                    setError("Error al crear la orden, vuelva más tarde");
                })
        })
        .catch((error) => {
            console.log("Error al actualizar el stock", error);
            setError("Error al actualizar el stock. Intente nuevamente");
        })

        setNombre("");
        setApellido("");
        setTelefono("");
        setEmail("");
        setEmailConfirmacion("");
    }

  return (
    <div className="form">
        <h2 className="titulo">Checkout de tu compra</h2>

        <form onSubmit={manejadorFormulario}>
            {carrito.map(producto => (
                <div>
                    <p>Producto: {producto.item.nombre} </p>
                    <p>Precio unitario: $ {producto.item.precio} </p>
                    <hr />
                    <p>Cantidad productos: {cantidadTotal} </p>
                    <p>total: $ {total} </p>
                    
                </div>
            ))}
            <hr />

            <div className="opcion">
             <label htmlFor="nombre"> Nombre: </label>
             <input type="text" id="nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)}/> 
            </div>

            <div className="opcion">
                <label htmlFor="apellido"> Apellido: </label>
                <input type="text" id="apellido" value={apellido} onChange={(e)=> setApellido(e.target.value)}/>
            </div>

            <div className="opcion">
                <label htmlFor="telefono"> Telefono: </label>
                <input type="text" id="telefono" value={telefono} onChange={(e)=> setTelefono(e.target.value)} />
            </div>

            <div className="opcion">
                <label htmlFor="email"> Email: </label>
                <input type="text" id="texto" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>

            <div className="opcion">
                <label htmlFor="emailConfirmacion"> Email de Confirmacion: </label>
                <input type="text" id="emailConformacion" value={emailConfirmacion} onChange={(e)=>setEmailConfirmacion(e.target.value)} />
            </div>

            {
                error && <p style={{color: "red"}}> {error} </p>
            }

            <button className="botonFinal" type="submit" > Finalizar compra </button>

        </form>
         
        {
           ordenId && (
            <strong> ¡Gracias por tu compra! Tu numero de orden es: {ordenId} </strong>
           ) 
        }

       
    </div>
  )
}

export default Checkout