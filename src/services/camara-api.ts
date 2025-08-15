

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
    try {
        const response = await fetch(url, { ...options, next: { revalidate: 3600 } });
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


export async function getDeputados(params?: URLSearchParams): Promise<DeputadosResponse> {
  const defaultParams = new URLSearchParams({
    ordem: 'ASC',
    ordenarPor: 'nome',
    itens: '100'
  });
  const mergedParams = new URLSearchParams({
    ...Object.fromEntries(defaultParams),
    ...Object.fromEntries(params || new URLSearchParams()),
  })
  const url = `${API_BASE_URL}/deputados?${mergedParams.toString()}`;
  const data = await fetchWithCache(url);
  return data || { dados: [], links: [] };
}

export async function getDeputadoDetalhes(id: number): Promise<DeputadoDetalhesResponse> {
    const data = await fetchWithCache(`${API_BASE_URL}/deputados/${id}`);
    if (!data) throw new Error(`Failed to fetch details for deputy ${id}`);
    return data;
}

export async function getDeputadoDespesas(id: number, orderBy: 'dataDocumento' | 'ano' = 'dataDocumento'): Promise<DespesasResponse> {
    const url = `${API_BASE_URL}/deputados/${id}/despesas?ordem=DESC&ordenarPor=${orderBy}&itens=100`;
    const data = await fetchWithCache(url);
    return data || { dados: [], links: [] };
}

export async function getDeputadoOrgaos(id: number): Promise<OrgaosResponse> {
    const url = `${API_BASE_URL}/deputados/${id}/orgaos?ordem=ASC&ordenarPor=nomeOrgao`;
    const data = await fetchWithCache(url);
    return data || { dados: [], links: [] };
}

export async function getDeputadoFrentes(id: number): Promise<FrentesResponse> {
    const url = `${API_BASE_URL}/deputados/${id}/frentes`;
    const data = await fetchWithCache(url);
    return data || { dados: [], links: [] };
}


export async function getPartidos(): Promise<PartidosResponse> {
    const url = `${API_BASE_URL}/partidos?itens=100&ordem=ASC&ordenarPor=sigla`;
    const data = await fetchWithCache(url);
    return data || { dados: [], links: [] };
}
