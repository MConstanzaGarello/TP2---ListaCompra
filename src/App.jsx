import { useState } from 'react'
import Formulario from './Formulario'
import Item from './Item'
import './App.css'

function App() {
  const [listas, setListas] = useState([
    { nombre: 'Principal', color: '#4CAF50', items: [] }
  ])
  const [listaSeleccionada, setListaSeleccionada] = useState(0)

  const traducirColor = (color) => {
    const colores = {
      rojo: 'red',
      verde: 'green',
      azul: 'blue',
      negro: 'black',
      blanco: 'white',
      amarillo: 'yellow',
      marrón: '#a0522d',
      violeta: 'purple',
      rosa: 'pink',
      gris: 'gray',
      naranja: 'orange',
      celeste: '#00bcd4',
      dorado: '#ffd700',
      beige: '#f5f5dc',
    }
    return colores[color.toLowerCase()] || color
  }

  const agregarItem = (item) => {
    const nuevasListas = [...listas]
    nuevasListas[listaSeleccionada].items.push(item)
    setListas(nuevasListas)
  }

  const eliminarItem = (indexAEliminar) => {
    const nuevasListas = [...listas]
    nuevasListas[listaSeleccionada].items = nuevasListas[listaSeleccionada].items.filter(
      (_, index) => index !== indexAEliminar
    )
    setListas(nuevasListas)
  }

  const editarItem = (index, itemEditado) => {
    const nuevasListas = [...listas]
    nuevasListas[listaSeleccionada].items[index] = itemEditado
    setListas(nuevasListas)
  }

  const toggleComprado = (index) => {
    const nuevasListas = [...listas]
    const listaActual = nuevasListas[listaSeleccionada]
    listaActual.items[index].comprado = !listaActual.items[index].comprado

    const noComprados = listaActual.items.filter((item) => !item.comprado)
    const comprados = listaActual.items.filter((item) => item.comprado)

    listaActual.items = [...noComprados, ...comprados]
    setListas(nuevasListas)
  }

  const agregarNuevaLista = () => {
    const nombre = prompt('Nombre de la nueva lista:')
    const color = prompt('Color:')
    if (!nombre || !color) return

    const colorTraducido = traducirColor(color)
    setListas([...listas, { nombre, color: colorTraducido, items: [] }])
    setListaSeleccionada(listas.length)
  }

  const eliminarLista = (index) => {
    if (listas.length === 1) {
      alert('Debe haber al menos una lista.')
      return
    }

    const nuevasListas = listas.filter((_, i) => i !== index)

    const nuevaSeleccion =
      index === listaSeleccionada
        ? 0
        : index < listaSeleccionada
        ? listaSeleccionada - 1
        : listaSeleccionada

    setListas(nuevasListas)
    setListaSeleccionada(nuevaSeleccion)
  }

  return (
    <div className="app">
      <h1>LISTA DE COMPRAS</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {listas.map((lista, index) => (
          <button
            key={index}
            onClick={() => setListaSeleccionada(index)}
            style={{
              backgroundColor: lista.color,
              border: index === listaSeleccionada ? '2px solid black' : 'none',
              padding: '5px 10px',
              color: 'white',
              borderRadius: '5px',
            }}
          >
            {lista.nombre}
          </button>
        ))}
        <button onClick={agregarNuevaLista}>Agregar lista</button>
      </div>

      {listas.length > 1 && (
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => eliminarLista(listaSeleccionada)}
            style={{
              backgroundColor: 'crimson',
              color: 'white',
              borderRadius: '5px',
              padding: '8px 12px',
            }}
          >
            Borrar lista actual
          </button>
        </div>
      )}

      <Formulario onAgregarItem={agregarItem} />

      <ul>
        {listas[listaSeleccionada].items.map((item, index) => (
          <Item
            key={index}
            item={item}
            index={index}
            onEliminar={eliminarItem}
            onEditar={editarItem}
            onToggleComprado={toggleComprado}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
