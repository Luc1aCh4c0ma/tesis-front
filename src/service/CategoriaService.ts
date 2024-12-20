import axios from 'axios';

// Define la estructura de una categoría
export interface Categoria {
  id: number;
  nombre: string;
}

const BASE_URL = 'https://tesis-back-production-8e0c.up.railway.app/categorias';

export const CategoriaService = {
    async obtenerCategorias(): Promise<Categoria[]> {
      const response = await axios.get<Categoria[]>(BASE_URL);
      return response.data;
    },

  // Crear una nueva categoría
  async crearCategoria(categoria: { nombre: string }) {
    const response = await axios.post(BASE_URL, categoria);
    return response.data;
  },
};
