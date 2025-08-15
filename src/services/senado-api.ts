
'use server';

const API_BASE_URL = 'https://legis.senado.leg.br/dadosabertos/senador';

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
}

export async function getSenador(id: string): Promise<Senator | null> {
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
}
