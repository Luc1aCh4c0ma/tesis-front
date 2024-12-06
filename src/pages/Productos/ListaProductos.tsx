import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Producto, ProductoService } from '../../service/ProductoService';
import { Categoria, CategoriaService } from '../../service/CategoriaService';
import './ListaProductosStyles.css'; // Importar el archivo CSS
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Navbar from '../../components/NavBar/NavBar';



const ListaProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const productosData = await ProductoService.obtenerProductos();
        const categoriasData = await CategoriaService.obtenerCategorias();
        setProductos(productosData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    }
    fetchData();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      filtroCategoria === '' || (producto.categoria && producto.categoria.nombre === filtroCategoria);
    return coincideNombre && coincideCategoria;
  });

  const cambiarDisponibilidad = async (id: number, disponible: boolean) => {
    try {
      const productoActualizado = await ProductoService.cambiarDisponibilidad(id, !disponible);
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id === id ? { ...producto, disponible: productoActualizado.disponible } : producto
        )
      );
    } catch (error) {
      console.error('Error al cambiar la disponibilidad:', error);
    }
  };

  const eliminarProducto = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await ProductoService.eliminarProducto(id);
        setProductos(productos.filter((producto) => producto.id !== id));
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
    <div className="productos-container">
      <h2 className="productos-title">Lista de Productos</h2>
      <div className="productos-controls">
        <input
          type="text"
          className="productos-search"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          className="productos-filter"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.nombre}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        <button
          className="productos-create-btn"
          onClick={() => navigate('/products-create')}
        >Crear Producto
        </button>
      </div>
      {productosFiltrados.length > 0 ? (
        <table className="productos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.categoria ? producto.categoria.nombre : 'Sin categoría'}</td>
                <td>
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="productos-image"
                    />
                  ) : (
                    <span>No disponible</span>
                  )}
                </td>
                <td>
                  <button
                    className="productos-edit-btn"
                    onClick={() => navigate(`/products-edit/${producto.id}`)}
                  >
                    <MdEditSquare />
                  </button>
                  <button
                    className="productos-delete-btn"
                    onClick={() => eliminarProducto(producto.id)}
                  >
<RiDeleteBin6Fill />
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="productos-empty">No hay productos que coincidan con los criterios de búsqueda.</p>
      )}
    </div>
    </>
  );
};

export default ListaProductos;
