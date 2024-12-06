import React, { useState, useEffect } from 'react';
import { Categoria, CategoriaService } from '../../service/CategoriaService';
import { ProductoService } from '../../service/ProductoService';

const CargarProducto: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]); // Categorías disponibles
  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0,
    categoriaId: '',
    descripcion: '',
    imagen: null as File | null,
  });

  // Cargar categorías al montar el componente
  useEffect(() => {
    async function fetchCategorias() {
      try {
        const data = await CategoriaService.obtenerCategorias();
        setCategorias(data); // Guardar las categorías en el estado
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    }
    fetchCategorias();
  }, []);

  // Manejar cambios en los inputs de texto y área de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Manejar cambios en el campo de selección de categorías
  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProducto({ ...producto, categoriaId: e.target.value });
  };

  // Manejar selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProducto({ ...producto, imagen: e.target.files[0] });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear un FormData para enviar los datos
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
    <form onSubmit={handleSubmit}>
      <h2>Cargar Producto</h2>
      
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleInputChange}
          required
        />
      </label>
      
      <label>
        Precio:
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleInputChange}
          required
        />
      </label>
      
      <label>
        Categoría:
        <select
          name="categoriaId"
          value={producto.categoriaId}
          onChange={handleCategoriaChange}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        Descripción:
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleInputChange}
          required
        />
      </label>
      
      <label>
        Imagen:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      
      <button type="submit">Guardar Producto</button>
    </form>
  );
};

export default CargarProducto;
