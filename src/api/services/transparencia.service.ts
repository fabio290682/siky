
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

    let allEmendas: any[] = [];
    let currentPage = pagina;
    let hasMore = true;

    while (hasMore) {
        const queryParams = new URLSearchParams({ ano, pagina: currentPage.toString() });
        if (codigoEmenda) queryParams.set('codigoEmenda', codigoEmenda);
        
        const url = `${BASE_URL}/emendas?${queryParams.toString()}`;
        
        try {
            const data = await fetchWithRetry(url, { headers: this.getHeaders() });
            if (data && data.length > 0) {
                allEmendas = allEmendas.concat(data);
                if (data.length < 15) { // API default page size is 15
                    hasMore = false;
                } else {
                    currentPage++;
                }
            } else {
                hasMore = false;
            }
        } catch (error) {
            console.error(`Erro ao buscar emendas na página ${currentPage}:`, error);
            hasMore = false; // Stop on error
        }
        if (currentPage > 200) { // Safety break
             console.warn("Atingido o limite de 200 páginas na busca de emendas.");
             hasMore = false;
        }
    }
    return allEmendas;
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
