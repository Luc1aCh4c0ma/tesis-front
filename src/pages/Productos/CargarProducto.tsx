import React, { useState, useEffect } from 'react';
import { Categoria, CategoriaService } from '../../service/CategoriaService';
import { ProductoService } from '../../service/ProductoService';
import './CargarProductoStyles.css'; // Archivo CSS con el nuevo estilo
import Navbar from '../../components/NavBar/NavBar';

const CargarProducto: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0,
    categoriaId: '',
    descripcion: '',
    imagen: null as File | null,
  });

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const data = await CategoriaService.obtenerCategorias();
        setCategorias(data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    }
    fetchCategorias();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProducto({ ...producto, imagen: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio.toString());
    formData.append('categoriaId', producto.categoriaId);
    formData.append('descripcion', producto.descripcion);
    if (producto.imagen) {
      formData.append('imagen', producto.imagen);
    }

    try {
      await ProductoService.crearProducto(formData);
      alert('Producto cargado exitosamente');
      setProducto({ nombre: '', precio: 0, categoriaId: '', descripcion: '', imagen: null });
    } catch (error) {
      console.error('Error al cargar el producto:', error);
      alert('Error al cargar el producto');
    }
  };

  return (
    <>
      <Navbar />
    <div className="producto-form-container">
      <form onSubmit={handleSubmit} className="producto-form">
        <h2 className="producto-form-title">Crear Producto</h2>
        <div className="producto-form-group">
          <label className="producto-form-label">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            required
            className="producto-form-input"
          />
        </div>
        <div className="producto-form-group">
          <label className="producto-form-label">Precio:</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
            required
            className="producto-form-input"
          />
        </div>
        <div className="producto-form-group">
          <label className="producto-form-label">Categoría:</label>
          <select
            name="categoriaId"
            value={producto.categoriaId}
            onChange={(e) => setProducto({ ...producto, categoriaId: e.target.value })}
            required
            className="producto-form-select"
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="producto-form-group">
          <label className="producto-form-label">Descripción:</label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleInputChange}
            required
            className="producto-form-textarea"
          />
        </div>
        <div className="producto-form-group">
          <label className="producto-form-label">Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="producto-form-input-file"
          />
        </div>
        <button type="submit" className="producto-form-button">
          Guardar Producto
        </button>
      </form>
    </div>
    </>
  );
};

export default CargarProducto;
