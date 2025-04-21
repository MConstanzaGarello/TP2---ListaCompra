import { useState } from 'react'

function Item({ item, index, onEliminar, onEditar, onToggleComprado }) {
  const [editando, setEditando] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState(item.nombre)
  const [nuevaCantidad, setNuevaCantidad] = useState(item.cantidad)

  const guardarCambios = () => {
    if (nuevoNombre.trim() === '' || nuevaCantidad <= 0) return
    onEditar(index, {
      ...item,
      nombre: nuevoNombre,
      cantidad: parseInt(nuevaCantidad),
    })
    setEditando(false)
  }

  return (
    <li style={{ textDecoration: item.comprado ? 'line-through' : 'none' }}>
      {editando ? (
        <>
          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <input
            type="number"
            min="1"
            value={nuevaCantidad}
            onChange={(e) => setNuevaCantidad(e.target.value)}
          />
          <button onClick={guardarCambios}>Guardar</button>
        </>
      ) : (
        <>
          {item.nombre} - Cantidad: {item.cantidad}
          <div className="item-botones">
            <button onClick={() => setEditando(true)}>EDITAR</button>
            <button onClick={() => onEliminar(index)}>BORRAR</button>
            <button onClick={() => onToggleComprado(index)}>
              {item.comprado ? 'NO COMPRADO' : 'COMPRADO'}
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default Item
