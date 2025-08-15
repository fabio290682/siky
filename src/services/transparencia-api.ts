
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

async function fetchFromApi<T>(endpoint: string, params: Record<string, string | number>, isArray: boolean = true): Promise<any> {
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


export async function getEmendas(ano: number): Promise<Emenda[]> {
    let allEmendas: Emenda[] = [];
    let pagina = 1;
    let hasMore = true;

    while(hasMore) {
        if (!API_KEY) {
            hasMore = false;
            break;
        }
        
        try {
            console.log(`Buscando emendas para o ano ${ano}, página ${pagina}...`);
            const emendas = await fetchFromApi<Emenda>('emendas', { ano, pagina }, true) as Emenda[];

            if(emendas && emendas.length > 0) {
                allEmendas = allEmendas.concat(emendas);
                pagina++;
                // The API doesn't give a total, so we assume if we get less than the default page size (15), it's the last page.
                if (emendas.length < 15) { 
                    hasMore = false;
                }
            } else {
                hasMore = false;
            }
        } catch (error) {
            console.error(`Falha ao buscar página ${pagina} de emendas para o ano ${ano}:`, error);
            hasMore = false;
        }
        // Safety break to avoid infinite loops in case of unexpected API behavior
        if (pagina > 200) { // Limit to 200 pages (~3000 results)
            console.warn('Atingido o limite de 200 páginas na busca de emendas.');
            hasMore = false;
        }
    }
    console.log(`Busca finalizada. Total de ${allEmendas.length} emendas encontradas para ${ano}.`);
    return allEmendas;
}

export async function getEmendaDetail(codigo: string): Promise<Emenda | null> {
    if (!codigo) return null;
    return fetchFromApi<Emenda>(`emendas/${codigo}`, {}, false) as Promise<Emenda | null>;
}
