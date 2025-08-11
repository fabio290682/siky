'use server';

// NOTE: The API key needs to be configured in your environment variables.
// You can get a key from: https://portaldatransparencia.gov.br/api-de-dados
const API_KEY = process.env.TRANSPARENCIA_API_KEY;
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

export async function getEmendas(ano: number, pagina: number = 1): Promise<Emenda[]> {
    if (!API_KEY) {
        // Return empty array if API key is not set, but log for debugging.
        console.log("Retornando dados mocados de emendas pois a chave da API não foi configurada.");
        return [];
    }

    try {
        const url = new URL(`${API_BASE_URL}/emendas`);
        url.searchParams.append('ano', ano.toString());
        url.searchParams.append('pagina', pagina.toString());

        const response = await fetch(url.toString(), {
            headers: {
                'chave-api-dados': API_KEY,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao buscar emendas: ${response.status} ${errorText}`);
        }

        const data: Emenda[] = await response.json();
        return data;
    } catch (error) {
        console.error('Falha ao buscar dados de emendas:', error);
        return [];
    }
}

export async function getEmendaDetail(codigo: string): Promise<Emenda | null> {
    if (!API_KEY) {
        console.log(`Retornando null para getEmendaDetail pois a chave da API não foi configurada (código: ${codigo}).`);
        return null;
    }

    try {
        const url = new URL(`${API_BASE_URL}/emendas/${codigo}`);

        const response = await fetch(url.toString(), {
            headers: {
                'chave-api-dados': API_KEY,
            },
        });

        if (!response.ok) {
             if (response.status === 404) {
                console.warn(`Nenhuma emenda encontrada com o código: ${codigo}`);
                return null;
            }
            throw new Error(`Erro ao buscar detalhes da emenda: ${response.status}`);
        }
        
        const data: Emenda = await response.json();
        return data;

    } catch (error) {
        console.error(`Falha ao buscar detalhes da emenda ${codigo}:`, error);
        return null;
    }
}
