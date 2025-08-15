
import { fetchWithRetry } from "../utils/fetchData";

const BASE_URL = "https://servicodados.ibge.gov.br/api/v1";

class IBGEService {
  async getEstados() {
    const url = `${BASE_URL}/localidades/estados`;
    return await fetchWithRetry(url);
  }

  async getMunicipios(uf?: string) {
    const url = uf 
      ? `${BASE_URL}/localidades/estados/${uf}/municipios`
      : `${BASE_URL}/localidades/municipios`;
    return await fetchWithRetry(url);
  }
}

export const ibgeService = new IBGEService();
