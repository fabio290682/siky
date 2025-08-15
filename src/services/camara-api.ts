
'use server';

import { API_BASE_URL } from "@/config";

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

async function fetchFromApi(endpoint: string, options?: RequestInit) {
    const url = `${API_BASE_URL}/${endpoint}`;
    return fetch(url, { ...options, next: { revalidate: 3600 } });
}

async function getFromApi<T>(endpoint: string, errorMessage: string): Promise<T> {
  try {
    const response = await fetchFromApi(endpoint);
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error(`Falha ao buscar dados de ${endpoint}:`, error);
    // Return a default structure to avoid breaking the UI
    if (endpoint.includes('deputados') || endpoint.includes('partidos') || endpoint.includes('despesas') || endpoint.includes('orgaos') || endpoint.includes('frentes')) {
      return { dados: [], links: [] } as any;
    }
    throw error;
  }
}

export async function getDeputados(): Promise<DeputadosResponse> {
  return getFromApi<DeputadosResponse>('camara/deputados', 'Erro ao buscar deputados');
}

export async function getDeputadoDetalhes(id: number): Promise<DeputadoDetalhesResponse> {
    return getFromApi<DeputadoDetalhesResponse>(`camara/deputados/${id}`, `Erro ao buscar detalhes do deputado: ${id}`);
}

export async function getDeputadoDespesas(id: number): Promise<DespesasResponse> {
    return getFromApi<DespesasResponse>(`camara/deputados/${id}/despesas`, `Erro ao buscar despesas do deputado: ${id}`);
}

export async function getDeputadoOrgaos(id: number): Promise<OrgaosResponse> {
    return getFromApi<OrgaosResponse>(`camara/deputados/${id}/orgaos`, `Erro ao buscar órgãos do deputado: ${id}`);
}

export async function getDeputadoFrentes(id: number): Promise<FrentesResponse> {
    return getFromApi<FrentesResponse>(`camara/deputados/${id}/frentes`, `Erro ao buscar frentes parlamentares do deputado: ${id}`);
}

export async function getPartidos(): Promise<PartidosResponse> {
    return getFromApi<PartidosResponse>('camara/partidos', 'Erro ao buscar partidos');
}
