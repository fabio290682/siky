
import { fetchWithRetry } from "../utils/fetchData";

const BASE_URL = "https://legis.senado.leg.br/dadosabertos";

class SenadoService {
  private getHeaders() {
    return { 'Accept': 'application/json' };
  }

  async getSenadores() {
    const url = `${BASE_URL}/senador/lista/atual`;
    const data = await fetchWithRetry(url, { headers: this.getHeaders() });
    
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
  }

  async getSenador(id: string) {
    const url = `${BASE_URL}/senador/${id}`;
    const data = await fetchWithRetry(url, { headers: this.getHeaders() });

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
    };
  }
}

export const senadoService = new SenadoService();
