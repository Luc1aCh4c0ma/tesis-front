import React, { useEffect, useState } from "react";
import "./Productos.css";
import { useResumen } from "../../../context/ResumenContext";
import { obtenerProductos, Producto } from "../../../service/productosService";

const Bebidas: React.FC = () => {
  const [bebidas, setBebidas] = useState<Producto[]>([]);
  const { agregarItem } = useResumen();

  useEffect(() => {
    const fetchBebidas = async () => {
      try {
        const categoriaId = 1; // ID de la categoría de Bebidas
        const productos = await obtenerProductos(categoriaId);
        const bebidasDisponibles = productos.filter((bebida) => bebida.disponible);
        setBebidas(bebidasDisponibles);
      } catch (error) {
        console.error("Error al cargar las bebidas:", error);
      }
    };
    fetchBebidas();
  }, []);

  return (
    <div className="productos-container">
      <h2 className="productos-titulo">🥤 Bebidas para Todos 🍹</h2>
      <div className="productos-lista">
        {bebidas.map((bebida) => (
          <div key={bebida.id} className="producto-item">
            <img
              src={bebida.imagen}
              alt={bebida.nombre}
              className="producto-imagen"
            />
            <div className="producto-detalles">
              <span className="producto-nombre">{bebida.nombre}</span>
              <span className="producto-precio">${bebida.precio.toFixed(2)}</span>
              <button
                className="producto-boton"
                onClick={() => agregarItem({ ...bebida, cantidad: 1 })}
              >
                Añadir al carrito 🛒
              </button>
              <div className="producto-descripcion">
                <p>{bebida.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bebidas;
