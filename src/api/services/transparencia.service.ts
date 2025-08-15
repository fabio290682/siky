
import { fetchWithRetry } from "../utils/fetchData";
import { API_KEYS } from "../config/apiKeys";

const BASE_URL = "https://api.portaldatransparencia.gov.br/api-de-dados";

export interface EmendaParams {
  ano?: string;
  pagina?: number;
  codigoEmenda?: string;
  codigoFuncao?: string;
  codigoSubfuncao?: string;
}

export interface ConvenioParams {
  pagina?: number;
  numeroConvenio?: string;
  uf?: string;
  municipio?: string;
}

class TransparenciaService {
  private getHeaders() {
    if (!API_KEYS.TRANSPARENCIA) {
        throw new Error("Chave da API do Portal da Transparência não configurada.");
    }
    return { "chave-api-dados": API_KEYS.TRANSPARENCIA };
  }

  async getEmendas(params: EmendaParams = {}) {
    const {
      ano = new Date().getFullYear().toString(),
      pagina = 1,
      codigoEmenda,
    } = params;

    const queryParams = new URLSearchParams({ ano, pagina: pagina.toString() });
    if (codigoEmenda) queryParams.set('codigoEmenda', codigoEmenda);
    
    const url = `${BASE_URL}/emendas?${queryParams.toString()}`;
    
    try {
        console.log(`Buscando emendas para o ano ${ano}, página ${pagina}...`);
        const data = await fetchWithRetry(url, { headers: this.getHeaders() });
        console.log(`Busca finalizada. Total de ${data?.length || 0} emendas encontradas para ${ano}.`);
        return data || [];
    } catch (error) {
        console.error(`Erro ao buscar emendas na página ${pagina}:`, error);
        return []; // Retorna array vazio em caso de erro para não quebrar o cliente
    }
  }

  async getConvenios(params: ConvenioParams = {}) {
    const {
      pagina = 1,
      numeroConvenio,
      uf,
      municipio
    } = params;

    const queryParams = new URLSearchParams({ pagina: pagina.toString() });

    if (numeroConvenio) queryParams.append('convenio', numeroConvenio);
    if (uf) queryParams.append('uf', uf);
    if (municipio) queryParams.append('municipio', municipio);

    const url = `${BASE_URL}/convenios?${queryParams.toString()}`;
    return await fetchWithRetry(url, { headers: this.getHeaders() });
  }
}

export const transparenciaService = new TransparenciaService();
