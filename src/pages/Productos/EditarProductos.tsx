import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Categoria, CategoriaService } from '../../service/CategoriaService';
import { ProductoService } from '../../service/ProductoService';
import './CargarProductoStyles.css'; // Asegúrate de que el CSS esté enlazado.
import Navbar from '../../components/NavBar/NavBar';

const EditarProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0,
    categoriaId: '',
    descripcion: '',
    imagen: null as File | null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const productoData = await ProductoService.obtenerProducto(Number(id));
        const categoriasData = await CategoriaService.obtenerCategorias();
        setProducto({
          nombre: productoData.nombre,
          precio: productoData.precio,
          categoriaId: productoData.categoria.id.toString(),
          descripcion: productoData.descripcion,
          imagen: null,
        });
        setCategorias(categoriasData);
      } catch (error: any) {
        console.error('Error al cargar los datos:', error);
        alert(error.response?.data?.message || 'Error al cargar los datos del producto.');
      }
    }
    fetchData();
  }, [id]);

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
      await ProductoService.actualizarProducto(Number(id), formData);
      alert('Producto actualizado correctamente');
      navigate('/products');
    } catch (error: any) {
      console.error('Error al actualizar el producto:', error);
      alert(error.response?.data?.message || 'Error al actualizar el producto.');
    }
  };

  return (
    <>
      <Navbar />
    <div className="producto-form-container">
      <form className="producto-form" onSubmit={handleSubmit}>
        <h2 className="producto-form-title">Editar Producto</h2>
        <div className="producto-form-group">
          <label className="producto-form-label">Nombre:</label>
          <input
            type="text"
            name="nombre"
            className="producto-form-input"
            value={producto.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="producto-form-group">
          <label className="producto-form-label">Precio:</label>
          <input
            type="number"
            name="precio"
            className="producto-form-input"
            value={producto.precio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="producto-form-group">
          <label className="producto-form-label">Categoría:</label>
          <select
            name="categoriaId"
            className="producto-form-select"
            value={producto.categoriaId}
            onChange={(e) => setProducto({ ...producto, categoriaId: e.target.value })}
            required
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
            className="producto-form-textarea"
            value={producto.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="producto-form-group">
          <label className="producto-form-label">Imagen:</label>
          <input
            type="file"
            className="producto-form-input-file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="producto-form-button">
          Actualizar Producto
        </button>
      </form>
    </div>
    </>
  );
};

export default EditarProducto;
