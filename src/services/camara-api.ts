'use server';

const API_BASE_URL = 'https://dadosabertos.camara.leg.br/api/v2';

interface Deputado {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
}

interface Link {
  rel: string;
  href: string;
}

interface DeputadosResponse {
  dados: Deputado[];
  links: Link[];
}

export async function getDeputados(): Promise<DeputadosResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/deputados`);
    if (!response.ok) {
      throw new Error('Erro ao buscar deputados');
    }
    const data: DeputadosResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Falha ao buscar dados dos deputados:', error);
    // Return empty response on error
    return { dados: [], links: [] };
  }
}
