
'use server';

import { API_BASE_URL } from "@/config";

export type Senator = {
    id: string;
    nome: string;
    partido: string;
    uf: string;
    periodo: string;
    telefones: string;
    email: string;
    foto: string;
};

<<<<<<< HEAD
async function fetchWithCache(url: string, options?: RequestInit) {
    try {
        const response = await fetch(url, { 
            ...options, 
            next: { revalidate: 3600 },
            headers: { 'Accept': 'application/json', ...options?.headers }
        });
        if (!response.ok) {
            console.error(`API Error: ${response.status} ${await response.text()}`);
            return null;
        }
        return response.json();
    } catch(error) {
        console.error(`Fetch Error for ${url}:`, error);
        return null;
    }
}

export async function getSenadores(): Promise<Senator[]> {
    const data = await fetchWithCache(`${API_BASE_URL}/lista/atual`);
    if (!data || !data.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar) {
        return [];
    }
    const parlamentares = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;

    return parlamentares.map((p: any) => ({
        id: p.IdentificacaoParlamentar.CodigoParlamentar,
        nome: p.IdentificacaoParlamentar.NomeParlamentar,
        partido: p.IdentificacaoParlamentar.SiglaPartidoParlamentar,
        uf: p.IdentificacaoParlamentar.UfParlamentar,
        periodo: p.Mandato ? `${p.Mandato.PrimeiraLegislaturaDoMandato.NumeroLegislatura} - ${p.Mandato.SegundaLegislaturaDoMandato.NumeroLegislatura}` : 'Não informado',
        telefones: p.Telefones?.Telefone.find((t:any) => t.TipoTelefone === 'Gabinete')?.NumeroTelefone || 'Não informado',
        email: p.IdentificacaoParlamentar.EmailParlamentar,
        foto: p.IdentificacaoParlamentar.UrlFotoParlamentar,
    }));
=======
async function fetchFromApi(endpoint: string, options?: RequestInit) {
    const url = `${API_BASE_URL}/${endpoint}`;
    return fetch(url, { ...options, next: { revalidate: 3600 } });
}

async function getFromApi<T>(endpoint: string, errorMessage: string, defaultValue: T): Promise<T> {
  try {
    const response = await fetchFromApi(endpoint);
    if (!response.ok) {
      console.error(`${errorMessage}. Status: ${response.status}`);
      return defaultValue;
    }
    return await response.json();
  } catch (error) {
    console.error(`Falha ao buscar dados de ${endpoint}:`, error);
    return defaultValue;
  }
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
}

export async function getSenadores(): Promise<Senator[]> {
  const data = await getFromApi<{ dados: Senator[] }>(`senado/senadores`, 'Erro ao buscar senadores', { dados: [] });
  return data.dados;
}

export async function getSenador(id: string): Promise<Senator | null> {
<<<<<<< HEAD
    const data = await fetchWithCache(`${API_BASE_URL}/${id}`);
    if (!data || !data.DetalheParlamentar?.Parlamentar) {
        return null;
    }
    const p = data.DetalheParlamentar.Parlamentar;
  
    return {
        id: p.IdentificacaoParlamentar.CodigoParlamentar,
        nome: p.IdentificacaoParlamentar.NomeParlamentar,
        partido: p.IdentificacaoParlamentar.SiglaPartidoParlamentar,
        uf: p.IdentificacaoParlamentar.UfParlamentar,
        periodo: p.Mandato ? `${p.Mandato.PrimeiraLegislaturaDoMandato.NumeroLegislatura} - ${p.Mandato.SegundaLegislaturaDoMandato.NumeroLegislatura}` : 'Não informado',
        telefones: p.Telefones?.Telefone.find((t:any) => t.TipoTelefone === 'Gabinete')?.NumeroTelefone || 'Não informado',
        email: p.IdentificacaoParlamentar.EmailParlamentar,
        foto: p.IdentificacaoParlamentar.UrlFotoParlamentar,
    }
=======
    const data = await getFromApi<{dados: Senator}>(`senado/senadores/${id}`, `Erro ao buscar senador ${id}`, {dados: null});
    return data.dados;
>>>>>>> c1740fb8823cf88967e2c55b5a93f55bccf0fd31
}
