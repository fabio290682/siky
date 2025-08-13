
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
    return fetch(url, { ...options, next: { revalidate: 3600 } });
}

export async function getSenadores(): Promise<Senator[]> {
  try {
    const response = await fetchWithCache(`${API_BASE_URL}/lista/atual`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    if (!response.ok) {
      throw new Error('Erro ao buscar senadores');
    }
    const data = await response.json();
    const parlamentares = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;

    return parlamentares.map((p: any) => ({
        id: p.IdentificacaoParlamentar.CodigoParlamentar,
        nome: p.IdentificacaoParlamentar.NomeParlamentar,
        partido: p.IdentificacaoParlamentar.SiglaPartidoParlamentar,
        uf: p.IdentificacaoParlamentar.UfParlamentar,
        periodo: `${p.Mandato.PrimeiraLegislaturaDoMandato.NumeroLegislatura} - ${p.Mandato.SegundaLegislaturaDoMandato.NumeroLegislatura}`,
        telefones: p.Telefones?.Telefone.find((t:any) => t.TipoTelefone === 'Gabinete')?.NumeroTelefone || 'Não informado',
        email: p.IdentificacaoParlamentar.EmailParlamentar,
        foto: p.IdentificacaoParlamentar.UrlFotoParlamentar,
    }));
  } catch (error) {
    console.error('Falha ao buscar dados dos senadores:', error);
    return [];
  }
}

export async function getSenador(id: string): Promise<Senator | null> {
    try {
      const response = await fetchWithCache(`${API_BASE_URL}/${id}`, {
          headers: {
              'Accept': 'application/json'
          }
      });
      if (!response.ok) {
        throw new Error(`Erro ao buscar senador: ${id}`);
      }
      const data = await response.json();
      const p = data.DetalheParlamentar.Parlamentar;
  
      return {
          id: p.IdentificacaoParlamentar.CodigoParlamentar,
          nome: p.IdentificacaoParlamentar.NomeParlamentar,
          partido: p.IdentificacaoParlamentar.SiglaPartidoParlamentar,
          uf: p.IdentificacaoParlamentar.UfParlamentar,
          periodo: `${p.Mandato.PrimeiraLegislaturaDoMandato.NumeroLegislatura} - ${p.Mandato.SegundaLegislaturaDoMandato.NumeroLegislatura}`,
          telefones: p.Telefones?.Telefone.find((t:any) => t.TipoTelefone === 'Gabinete')?.NumeroTelefone || 'Não informado',
          email: p.IdentificacaoParlamentar.EmailParlamentar,
          foto: p.IdentificacaoParlamentar.UrlFotoParlamentar,
      }
    } catch (error) {
      console.error(`Falha ao buscar dados do senador ${id}:`, error);
      return null;
    }
  }
