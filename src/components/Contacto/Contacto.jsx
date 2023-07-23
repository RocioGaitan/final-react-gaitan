import { useState } from "react"
import { db } from "../../service/config"
import { collection, addDoc } from 'firebase/firestore'
import './Contacto.css'

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejadorFormulario = (e) => {
    e.preventDefault();

    addDoc(collection(db, "usuarios"), {
      nombre: nombre,
      apellido: apellido,
      mensaje: mensaje
    })

    setNombre("");
    setApellido("");
    setMensaje("");

  }

  return (
    <form className="formulario" onSubmit={manejadorFormulario}>
      
      <h2>Formulario de contato. Deje aqui su consulta</h2>

      <label htmlFor="nombre"> Nombre </label>
      <input type="text" id="nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)}/>

      <label htmlFor="apellido"> Apellido </label>
      <input type="text" id="apellido" value={apellido} onChange={(e)=> setApellido(e.target.value)}/>

      <label htmlFor="mensaje"> Mensaje </label>
      <input type="text" id="mensaje" value={mensaje} onChange={(e)=> setMensaje(e.target.value)}/>
        
      <button  className="botonEnviar" type="submit"> Enviar </button>

    </form>
  )
}

export default Contacto