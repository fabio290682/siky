
'use server';

const API_BASE_URL = 'http://localhost:3001/api';

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

async function fetchFromApi<T>(endpoint: string, params: Record<string, string | number>, isArray: boolean = true): Promise<any> {
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
            console.error(`Erro na API interna: ${response.status} ${errorText}`);
            if (isArray) return [];
            return null as T;
        }

        return response.json();
    } catch (error) {
        console.error(`Falha ao buscar dados da API interna para o endpoint ${endpoint}:`, error);
        if (isArray) return [];
        return null as T;
    }
}


export async function getEmendas(ano: number): Promise<Emenda[]> {
    return fetchFromApi<Emenda>('transparencia/emendas', { ano: ano.toString(), pagina: 1 }, true) as Promise<Emenda[]>;
}

export async function getEmendaDetail(codigo: string): Promise<Emenda | null> {
    if (!codigo) return null;
    return fetchFromApi<Emenda>(`transparencia/emendas/${codigo}`, {}, false) as Promise<Emenda | null>;
}
