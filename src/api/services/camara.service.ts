
import { fetchWithRetry } from "../utils/fetchData";

const BASE_URL = "https://dadosabertos.camara.leg.br/api/v2";

class CamaraService {
  async getDeputados() {
    const url = `${BASE_URL}/deputados?ordem=ASC&ordenarPor=nome&itens=100`;
    return await fetchWithRetry(url);
  }

  async getDeputadoDetalhes(id: string) {
    const url = `${BASE_URL}/deputados/${id}`;
    return await fetchWithRetry(url);
  }
  
  async getDespesasDeputado(id: string) {
    const url = `${BASE_URL}/deputados/${id}/despesas?ordem=DESC&ordenarPor=ano&itens=100`;
    return await fetchWithRetry(url);
  }

  async getOrgaosDeputado(id: string) {
    const url = `${BASE_URL}/deputados/${id}/orgaos?ordem=ASC&ordenarPor=nomeOrgao`;
    return await fetchWithRetry(url);
  }

  async getFrentesDeputado(id: string) {
      const url = `${BASE_URL}/deputados/${id}/frentes`;
      return await fetchWithRetry(url);
  }

  async getPartidos() {
    const url = `${BASE_URL}/partidos?itens=100&ordem=ASC&ordenarPor=sigla`;
    return await fetchWithRetry(url);
  }
}

export const camaraService = new CamaraService();
