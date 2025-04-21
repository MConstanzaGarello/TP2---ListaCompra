import { useState } from 'react'

function Formulario({ onAgregarItem }) {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState(1)

  const manejarSubmit = (e) => {
    e.preventDefault()
    if (nombre.trim() === '' || cantidad <= 0) return

    onAgregarItem({ nombre, cantidad: parseInt(cantidad), comprado: false })
    setNombre('')
    setCantidad(1)
  }

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        placeholder="Item"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  )
}

export default Formulario
