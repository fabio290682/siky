
'use server';

<<<<<<< HEAD
// NOTE: The API key needs to be configured in your environment variables.
// You can get a key from: https://portaldatransparencia.gov.br/api-de-dados
=======
import { API_BASE_URL } from "@/config";
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31

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

<<<<<<< HEAD
const API_BASE_URL = 'https://api.portaldatransparencia.gov.br/api-de-dados';

async function fetchFromApi<T>(endpoint: string, params: Record<string, string | number | undefined>, isArray: boolean = true): Promise<T[]> {
    const API_KEY = process.env.TRANSPARENCIA_API_KEY;
    if (!API_KEY) {
        console.warn("Chave da API do Portal da Transparência não configurada. As chamadas à API retornarão dados vazios.");
        return [];
    }
    
=======
async function fetchFromApi<T>(endpoint: string, params: Record<string, string | number>, isArray: boolean = true): Promise<any> {
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) url.searchParams.append(key, String(value));
    });

    try {
        const response = await fetch(url.toString(), {
            next: { revalidate: 3600 } 
        });

        if (!response.ok) {
            const errorText = await response.text();
<<<<<<< HEAD
            console.error(`Erro na API: ${response.status} ${errorText}`);
            return [];
=======
            console.error(`Erro na API interna: ${response.status} ${errorText}`);
            if (isArray) return [];
            return null as T;
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
        }

        return response.json();
    } catch (error) {
<<<<<<< HEAD
        console.error(`Falha ao buscar dados da API para o endpoint ${endpoint}:`, error);
        return [];
=======
        console.error(`Falha ao buscar dados da API interna para o endpoint ${endpoint}:`, error);
        if (isArray) return [];
        return null as T;
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
    }
}


<<<<<<< HEAD
export async function getEmendas(params: { ano?: number; pagina?: number; autor?: string; numeroEmenda?: string }): Promise<Emenda[]> {
    const endpointParams = {
        ano: params.ano,
        pagina: params.pagina || 1,
        autor: params.autor,
        numeroEmenda: params.numeroEmenda
    };
    return fetchFromApi<Emenda>('emendas', endpointParams, true);
=======
export async function getEmendas(ano: number): Promise<Emenda[]> {
    return fetchFromApi<Emenda>('transparencia/emendas', { ano: ano.toString(), pagina: 1 }, true) as Promise<Emenda[]>;
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
}

export async function getEmendaDetail(codigo: string): Promise<Emenda | null> {
    if (!codigo) return null;
<<<<<<< HEAD
    const results = await fetchFromApi<Emenda>(`emendas/${codigo}`, {}, false);
    return (results as Emenda[]).length > 0 ? results[0] : null;
=======
    return fetchFromApi<Emenda>(`transparencia/emendas/${codigo}`, {}, false) as Promise<Emenda | null>;
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
}
