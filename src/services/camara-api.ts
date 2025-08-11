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

interface DeputadoDetalhes {
    cpf: string;
    dataFalecimento: string | null;
    dataNascimento: string;
    escolaridade: string;
    id: number;
    municipioNascimento: string;
    nomeCivil: string;
    redeSocial: string[];
    sexo: string;
    ufNascimento: string;
    ultimoStatus: {
      condicaoEleitoral: string;
      data: string;
      descricaoStatus: string | null;
      email: string;
      gabinete: {
        andar: string;
        email: string;
        nome: string;
        predio: string;
        sala: string;
        telefone: string;
      };
      id: number;
      idLegislatura: number;
      nome: string;
      nomeEleitoral: string;
      siglaPartido: string;
      siglaUf: string;
      situacao: string;
      uri: string;
      uriPartido: string;
      urlFoto: string;
    };
    uri: string;
    urlWebsite: string | null;
  }
  
  interface DeputadoDetalhesResponse {
    dados: DeputadoDetalhes;
    links: Link[];
  }

interface Partido {
    id: number;
    sigla: string;
    nome: string;
    uri: string;
}

interface PartidoStatus {
    id: number;
    nome: string;
    sigla: string;
    uri: string;
    status: {
        lider: {
            nome: string;
            siglaPartido: string;
            uriPartido: string;
            uf: string;
            idLegislatura: number;
            urlFoto: string;
        }
    }
}

interface PartidosResponse {
    dados: PartidoStatus[];
    links: Link[];
}

export async function getDeputados(): Promise<DeputadosResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/deputados?ordem=ASC&ordenarPor=nome`);
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

export async function getDeputadoDetalhes(id: number): Promise<DeputadoDetalhesResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/deputados/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar detalhes do deputado: ${id}`);
        }
        const data: DeputadoDetalhesResponse = await response.json();
        return data;
    } catch (error) {
        console.error(`Falha ao buscar dados do deputado ${id}:`, error);
        // Return a structure that matches the expected return type but indicates an error state or is empty.
        // For simplicity, we'll throw the error up to be handled by the page component.
        throw error;
    }
}

export async function getPartidos(): Promise<PartidosResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/partidos?itens=100&ordem=ASC&ordenarPor=sigla`);
        if (!response.ok) {
            throw new Error('Erro ao buscar partidos');
        }
        const data: PartidosResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Falha ao buscar dados dos partidos:', error);
        return { dados: [], links: [] };
    }
}
