
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
    status?: {
        lider?: {
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

interface Despesa {
    ano: number;
    mes: number;
    tipoDespesa: string;
    codDocumento: number;
    tipoDocumento: string;
    codTipoDocumento: number;
    dataDocumento: string;
    numDocumento: string;
    valorDocumento: number;
    urlDocumento: string;
    nomeFornecedor: string;
    cnpjCpfFornecedor: string;
    valorLiquido: number;
    valorGlosa: number;
    numRessarcimento: string;
    codLote: number;
    parcela: number;
}

interface DespesasResponse {
    dados: Despesa[];
    links: Link[];
}

interface Orgao {
    idOrgao: string;
    siglaOrgao: string;
    nomeOrgao: string;
    uriOrgao: string;
    codTitulo: string;
    titulo: string;
    dataInicio: string;
    dataFim: string | null;
}

interface OrgaosResponse {
    dados: Orgao[];
    links: Link[];
}

interface Frente {
    id: number;
    uri: string;
    titulo: string;
    idLegislatura: number;
}

interface FrentesResponse {
    dados: Frente[];
    links: Link[];
}

async function fetchWithCache(url: string, options?: RequestInit) {
    return fetch(url, { ...options, next: { revalidate: 3600 } });
}


export async function getDeputados(params?: URLSearchParams): Promise<DeputadosResponse> {
  const url = `${API_BASE_URL}/deputados?${params?.toString() || ''}`;
  try {
    const response = await fetchWithCache(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar deputados');
    }
    const data: DeputadosResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Falha ao buscar dados dos deputados:', error);
    return { dados: [], links: [] };
  }
}

export async function getDeputadoDetalhes(id: number): Promise<DeputadoDetalhesResponse> {
    try {
        const response = await fetchWithCache(`${API_BASE_URL}/deputados/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar detalhes do deputado: ${id}`);
        }
        const data: DeputadoDetalhesResponse = await response.json();
        return data;
    } catch (error) {
        console.error(`Falha ao buscar dados do deputado ${id}:`, error);
        throw error;
    }
}

export async function getDeputadoDespesas(id: number): Promise<DespesasResponse> {
    try {
        const url = `${API_BASE_URL}/deputados/${id}/despesas?ordem=DESC&ordenarPor=ano&itens=100`;
        const response = await fetchWithCache(url);
        if (!response.ok) {
            console.error(`Erro ao buscar despesas do deputado: ${id}. Status: ${response.status}`);
            return { dados: [], links: [] };
        }
        const data: DespesasResponse = await response.json();
        return data;
    } catch (error) {
        console.error(`Falha ao buscar despesas do deputado ${id}:`, error);
        return { dados: [], links: [] };
    }
}

export async function getDeputadoOrgaos(id: number): Promise<OrgaosResponse> {
    try {
        const response = await fetchWithCache(`${API_BASE_URL}/deputados/${id}/orgaos?ordem=ASC&ordenarPor=nomeOrgao`);
        if (!response.ok) {
            console.error(`Erro ao buscar órgãos do deputado: ${id}. Status: ${response.status}`);
            return { dados: [], links: [] };
        }
        const data: OrgaosResponse = await response.json();
        return data;
    } catch (error) {
        console.error(`Falha ao buscar órgãos do deputado ${id}:`, error);
        return { dados: [], links: [] };
    }
}

export async function getDeputadoFrentes(id: number): Promise<FrentesResponse> {
    try {
        const response = await fetchWithCache(`${API_BASE_URL}/deputados/${id}/frentes`);
        if (!response.ok) {
            console.error(`Erro ao buscar frentes do deputado: ${id}. Status: ${response.status}`);
            return { dados: [], links: [] };
        }
        const data: FrentesResponse = await response.json();
        return data;
    } catch (error) {
        console.error(`Falha ao buscar frentes do deputado ${id}:`, error);
        return { dados: [], links: [] };
    }
}


export async function getPartidos(): Promise<PartidosResponse> {
    try {
        const response = await fetchWithCache(`${API_BASE_URL}/partidos?itens=100&ordem=ASC&ordenarPor=sigla`);
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
