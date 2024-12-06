import React, { useEffect, useState } from "react";
import "../Bebidas/Productos.css";
import { useResumen } from "../../../context/ResumenContext";
import { obtenerProductos, Producto } from "../../../service/productosService";



const DesayunosMeriendas: React.FC = () => {
  const [desayunos, setDesayunos] = useState<Producto[]>([]);
  const { agregarItem } = useResumen();

  useEffect(() => {
    const fetchDesayunos = async () => {
      try {
        const categoriaId = 3; // ID de la categoría "Desayunos y Meriendas"
        const productos = await obtenerProductos(categoriaId);
        
        // Filtrar productos disponibles
        const productosDisponibles = productos.filter(producto => producto.disponible);
        setDesayunos(productosDisponibles);
      } catch (error) {
        console.error("Error al cargar los desayunos:", error);
      }
    };
    fetchDesayunos();
  }, []);

  return (
    <div className="productos-container">
      <h2 className="productos-titulo">🥐 Desayunos y Meriendas ☕</h2>
      <div className="productos-lista">
        {desayunos.map((desayuno) => (
          <div key={desayuno.id} className="producto-item">
            <img
              src={desayuno.imagen}
              alt={desayuno.nombre}
              className="producto-imagen"
            />
            <div className="producto-detalles">
              <span className="producto-nombre">{desayuno.nombre}</span>
              <span className="producto-precio">${desayuno.precio.toFixed(2)}</span>
              <button
                className="producto-boton"
                onClick={() => agregarItem({ ...desayuno, cantidad: 1 })}
              >
                Añadir al carrito 🛒
              </button>
              <div className="producto-descripcion">
                <p>{desayuno.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesayunosMeriendas;
