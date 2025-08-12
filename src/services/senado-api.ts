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
            console.error(`Erro ao buscar senadores: ${response.statusText}`);
            return [];
        }
        const data: SenadoresResponse = await response.json();
        return data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
    } catch (error) {
        console.error('Falha ao buscar dados dos senadores:', error);
        return [];
    }
}
