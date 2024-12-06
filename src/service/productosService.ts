import axios from 'axios';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  disponible: boolean; 
  descripcion: string; // Esta es la propiedad que falta
  categoria: { id: number; nombre: string };
}

export const obtenerProductos = async (categoriaId?: number): Promise<Producto[]> => {
  try {
    const response = await axios.get('https://tesis-back-production-8e0c.up.railway.app/productos', {
      params: { categoriaId },
    });
    return response.data;
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    throw error;
  }
};
