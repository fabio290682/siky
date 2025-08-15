
import dotenv from 'dotenv';

dotenv.config();

export const API_KEYS = {
  TRANSPARENCIA: process.env.TRANSPARENCIA_API_KEY || ''
};

if (!API_KEYS.TRANSPARENCIA) {
    console.warn(`⚠️  Chave de API para TRANSPARENCIA não encontrada no .env`);
}
