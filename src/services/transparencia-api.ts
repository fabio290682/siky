
'use server';

// NOTE: The API key needs to be configured in your environment variables.
// You can get a key from: https://portaldatransparencia.gov.br/api-de-dados
const API_KEY = "99f10a688a8421cf108943301d711160";
const API_BASE_URL = 'https://api.portaldatransparencia.gov.br/api-de-dados';

if (!API_KEY) {
    console.warn("Chave da API do Portal da Transparência não configurada. As chamadas à API serão desabilitadas.");
}

export interface Emenda {
    ano: number;
    autor: string;
    beneficiario: string;
    codigoEmenda: string;
    funcao: string;
    localidadeGasto: string;
    numeroEmenda: string;
    subfuncao: string;
    tipoEmenda: string;
    valorEmpenhado: string;
    valorLiquidado: string;
    valorPago: string;
    valorRestoAPagar: string;
}

async function fetchFromApi<T>(endpoint: string, params: Record<string, string | number>, isArray: boolean = true): Promise<T | T[]> {
    if (!API_KEY) {
        if (isArray) return [];
        return null as T;
    }
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) url.searchParams.append(key, String(value));
    });

    try {
        const response = await fetch(url.toString(), {
            headers: { 'chave-api-dados': API_KEY },
            next: { revalidate: 3600 } 
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Erro na API: ${response.status} ${errorText}`);
            if (isArray) return [];
            return null as T;
        }

        return response.json();
    } catch (error) {
        console.error(`Falha ao buscar dados da API para o endpoint ${endpoint}:`, error);
        if (isArray) return [];
        return null as T;
    }
}


export async function getEmendas(ano: number, pagina: number = 1): Promise<Emenda[]> {
    return fetchFromApi<Emenda>('emendas', { ano, pagina }, true) as Promise<Emenda[]>;
}

export async function getEmendaDetail(codigo: string): Promise<Emenda | null> {
    if (!codigo) return null;
    return fetchFromApi<Emenda>(`emendas/${codigo}`, {}, false) as Promise<Emenda | null>;
}
