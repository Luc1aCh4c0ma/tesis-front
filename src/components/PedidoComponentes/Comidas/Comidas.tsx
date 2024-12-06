import React, { useEffect, useState } from "react";
import { useResumen } from "../../../context/ResumenContext";
import { obtenerProductos, Producto } from "../../../service/productosService";
import "../Bebidas/Productos.css";

const Comidas: React.FC = () => {
  const [comidas, setComidas] = useState<Producto[]>([]);
  const { agregarItem } = useResumen();

  useEffect(() => {
    const fetchComidas = async () => {
      try {
        const categoriaId = 2; // ID para la categoría "Comidas"
        const productos = await obtenerProductos(categoriaId);
        // Filtramos solo las comidas disponibles
        const comidasDisponibles = productos.filter(comida => comida.disponible);
        setComidas(comidasDisponibles);
      } catch (error) {
        console.error("Error al cargar las comidas:", error);
      }
    };
    fetchComidas();
  }, []);

  return (
    <div className="productos-container">
      <h2 className="productos-titulo">🍕 Comidas 🍔</h2>
      <div className="productos-lista">
        {comidas.map((comida) => (
          <div key={comida.id} className="producto-item">
            <img
              src={comida.imagen}
              alt={comida.nombre}
              className="producto-imagen"
            />
            <div className="producto-detalles">
              <span className="producto-nombre">{comida.nombre}</span>
              <span className="producto-precio">${comida.precio.toFixed(2)}</span>
              <button
                className="producto-boton"
                onClick={() => agregarItem({ ...comida, cantidad: 1 })}
              >
                Añadir al carrito 🛒
              </button>
              <div className="producto-descripcion">
                <p>{comida.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comidas;
