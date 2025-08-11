'use server';

const API_BASE_URL = 'https://legis.senado.leg.br/dadosabertos';

interface Senador {
    IdentificacaoParlamentar: {
        CodigoParlamentar: string;
        NomeParlamentar: string;
        NomeCompletoParlamentar: string;
        SexoParlamentar: string;
        FormaTratamento: string;
        UrlFotoParlamentar: string;
        UrlPaginaParlamentar: string;
        EmailParlamentar: string;
        SiglaPartidoParlamentar: string;
        UfParlamentar: string;
    };
}

interface SenadoresResponse {
    ListaParlamentarEmExercicio: {
        Parlamentares: {
            Parlamentar: Senador[];
        };
    };
}

export interface Mandato {
    CodigoMandato: string;
    UfParlamentar: string;
    PrimeiraLegislaturaDoMandato: {
        NumeroLegislatura: string;
        DataInicio: string;
        DataFim: string;
    };
    SegundaLegislaturaDoMandato: {
        NumeroLegislatura: string;
        DataInicio: string;
        DataFim: string;
    };
    DescricaoParticipacao: string;
    Suplentes: {
        Suplente: any[];
    };
    Exercicios: {
        Exercicio: any[];
    };
    DataInicio: string;
    DataFim?: string;
    MandatoMotivoAfastamento?: string;
}

interface OutrosMandatos {
    Mandato: Mandato | Mandato[];
}

interface SenadorDetalhes {
    DetalheParlamentar: {
        Parlamentar: {
            IdentificacaoParlamentar: {
                CodigoParlamentar: string;
                NomeParlamentar: string;
                NomeCompletoParlamentar: string;
                SexoParlamentar: string;
                FormaTratamento: string;
                UrlFotoParlamentar: string;
                UrlPaginaParlamentar: string;
                EmailParlamentar: string;
                SiglaPartidoParlamentar: string;
                UfParlamentar: string;
            };
            DadosBasicosParlamentar: {
                DataNascimento: string;
                Naturalidade: string;
                UfNaturalidade: string;
                Profissao?: string;
            };
            Mandato: Mandato;
            OutrosMandatos?: OutrosMandatos;
        };
    };
}

async function fetchWithCache(url: string, options?: RequestInit) {
    return fetch(url, { ...options, next: { revalidate: 3600 } });
}

export async function getSenadores(): Promise<Senador[]> {
    try {
        const response = await fetchWithCache(`${API_BASE_URL}/senador/lista/atual`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Erro ao buscar senadores: ${response.statusText}`);
        }
        const data: SenadoresResponse = await response.json();
        return data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
    } catch (error) {
        console.error('Falha ao buscar dados dos senadores:', error);
        return [];
    }
}

export async function getSenadorDetalhes(id: string): Promise<SenadorDetalhes | null> {
    try {
        const response = await fetchWithCache(`${API_BASE_URL}/senador/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar detalhes do senador: ${id}`);
        }
        const data: SenadorDetalhes = await response.json();
        return data;
    } catch (error) {
        console.error(`Falha ao buscar dados do senador ${id}:`, error);
        return null;
    }
}
