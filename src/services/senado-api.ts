
'use server';

const API_BASE_URL = 'http://localhost:3001/api';

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
}

export async function getSenadores(): Promise<Senator[]> {
  const data = await getFromApi<{ dados: Senator[] }>(`senado/senadores`, 'Erro ao buscar senadores', { dados: [] });
  return data.dados;
}

export async function getSenador(id: string): Promise<Senator | null> {
    const data = await getFromApi<{dados: Senator}>(`senado/senadores/${id}`, `Erro ao buscar senador ${id}`, {dados: null});
    return data.dados;
}
