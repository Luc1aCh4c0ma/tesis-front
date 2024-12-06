import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export const createProduct = async (productData: FormData) => {
  return axios.post(API_URL, productData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Importante para enviar archivos
    },
  });
};
