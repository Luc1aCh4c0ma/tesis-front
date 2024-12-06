import axios from 'axios';

// URL base del backend
const BASE_URL = 'https://tesis-back-production-8e0c.up.railway.app/productos';

// Define la interfaz para un producto
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean; // Esta propiedad debe estar definida
  categoria: { [x: string]: any; nombre: string };
  imagen?: string;
}


export const ProductoService = {
  // Obtener todos los productos
  async obtenerProductos(): Promise<Producto[]> {
    const response = await axios.get<Producto[]>(BASE_URL);
    return response.data;
  },

  // Obtener un producto por ID
  async obtenerProducto(id: number): Promise<Producto> {
    const response = await axios.get<Producto>(`${BASE_URL}/${id}`);
    return response.data;
  },
  

  // Crear un nuevo producto
  async crearProducto(producto: FormData): Promise<Producto> {
    const response = await axios.post<Producto>(BASE_URL, producto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Actualizar un producto por ID
  async actualizarProducto(id: number, producto: FormData): Promise<Producto> {
    const response = await axios.put<Producto>(`${BASE_URL}/${id}`, producto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Eliminar un producto por ID
  async eliminarProducto(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
  async cambiarDisponibilidad(id: number, disponible: boolean): Promise<Producto> {
    const response = await axios.patch<Producto>(`${BASE_URL}/${id}`, { disponible });
    return response.data;
  },
  async obtenerProductosPorCategoria(categoriaId: number): Promise<Producto[]> {
    const response = await axios.get<Producto[]>(
      `http://localhost:3000/productos?categoriaId=${categoriaId}`,
    );
    return response.data;
  },
};
