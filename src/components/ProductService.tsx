import axios from 'axios';

const API_URL = 'https://tesis-back-production-8e0c.up.railway.app/products';

export const createProduct = async (productData: FormData) => {
  return axios.post(API_URL, productData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Importante para enviar archivos
    },
  });
};
