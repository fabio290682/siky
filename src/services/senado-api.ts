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

interface LegislaturaResponse {
    ListaParlamentarLegislatura: {
        Parlamentares: {
            Parlamentar: Senador[];
        }
    }
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
        const currentLegislatureResponse = await fetchWithCache(`${API_BASE_URL}/senador/lista/atual`);
        if (!currentLegislatureResponse.ok) {
            throw new Error('Erro ao buscar senadores da legislatura atual');
        }
        const currentLegislatureData: SenadoresResponse = await currentLegislatureResponse.json();
        const senadores = new Map(currentLegislatureData.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.map(s => [s.IdentificacaoParlamentar.CodigoParlamentar, s]));

        const LATEST_LEGISLATURA = 57;
        const legislaturePromises = [];

        // Fetch all legislatures in parallel
        for (let i = 1; i <= LATEST_LEGISLATURA; i++) {
            legislaturePromises.push(fetchWithCache(`${API_BASE_URL}/senador/lista/legislatura/${i}`));
        }

        const responses = await Promise.all(legislaturePromises);

        for (const response of responses) {
            if (response.ok) {
                const data: LegislaturaResponse = await response.json();
                if (data.ListaParlamentarLegislatura.Parlamentares && data.ListaParlamentarLegislatura.Parlamentares.Parlamentar) {
                    data.ListaParlamentarLegislatura.Parlamentares.Parlamentar.forEach(senador => {
                        // Add only if not already in the map to avoid duplicates
                        if (!senadores.has(senador.IdentificacaoParlamentar.CodigoParlamentar)) {
                            senadores.set(senador.IdentificacaoParlamentar.CodigoParlamentar, senador);
                        }
                    });
                }
            } else {
                // It's better to log a warning than to throw an error, so the app can still work with partial data.
                console.warn(`Não foi possível buscar senadores de uma das legislaturas.`);
            }
        }
        
        return Array.from(senadores.values());

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
