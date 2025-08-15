
'use server';

import { getEmendas, type Emenda } from '@/services/transparencia-api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { staticConventions, type Convention } from './data';

export interface ReportFilters {
  ano?: number;
  autor?: string;
  numeroEmenda?: string;
}

export interface ConventionFilters {
  year?: string;
  status?: string;
  uf?: string;
  municipio?: string;
}

async function fetchAllAmendments(filters: ReportFilters): Promise<Emenda[]> {
  let allAmendments: Emenda[] = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    const params: any = { ano: filters.ano, pagina: currentPage };
    if (filters.autor) params.autor = filters.autor;
    if (filters.numeroEmenda) params.numeroEmenda = filters.numeroEmenda;
    
    const amendments = await getEmendas(params);

    if (amendments.length > 0) {
      allAmendments = allAmendments.concat(amendments);
      currentPage++;
    } else {
      hasMore = false;
    }
  }

  return allAmendments;
}

export async function generateConsolidatedReport(filters: ReportFilters) {
  const doc = new jsPDF({
    orientation: 'landscape',
  });

  doc.setFontSize(16);
  doc.text('Relatório Consolidado de Emendas', 14, 15);
  doc.setFontSize(10);
  doc.text(`Filtros Aplicados: ${JSON.stringify(filters)}`, 14, 22);

  const amendments = await fetchAllAmendments(filters);

  if (amendments.length === 0) {
    doc.text('Nenhuma emenda encontrada para os filtros selecionados.', 14, 30);
  } else {
    const tableData = amendments.map((e) => [
      e.ano,
      e.autor,
      e.numeroEmenda,
      e.tipoEmenda,
      e.localidadeGasto,
      e.funcao,
      e.valorEmpenhado,
      e.valorPago,
    ]);

    (doc as any).autoTable({
      head: [['Ano', 'Autor', 'Número', 'Tipo', 'Localidade', 'Função', 'Valor Empenhado', 'Valor Pago']],
      body: tableData,
      startY: 28,
      theme: 'striped',
      headStyles: { fillColor: [22, 163, 74] },
    });
  }
  
  return doc.output('arraybuffer');
}

export async function generateConventionsReport(filters: ConventionFilters) {
  const doc = new jsPDF({
    orientation: 'landscape',
  });

  doc.setFontSize(16);
  doc.text('Relatório Consolidado de Convênios', 14, 15);
  doc.setFontSize(10);
  doc.text(`Filtros Aplicados: ${JSON.stringify(filters)}`, 14, 22);

  let filteredConventions = [...staticConventions];

  if(filters.year) {
    filteredConventions = filteredConventions.filter(c => c.ano.toString() === filters.year);
  }
  if(filters.status) {
    filteredConventions = filteredConventions.filter(c => c.situacao.toLowerCase().includes(filters.status!.toLowerCase()));
  }
  if(filters.uf) {
    filteredConventions = filteredConventions.filter(c => c.uf.toLowerCase().includes(filters.uf!.toLowerCase()));
  }
  if(filters.municipio) {
    filteredConventions = filteredConventions.filter(c => c.municipio.toLowerCase().includes(filters.municipio!.toLowerCase()));
  }

  if (filteredConventions.length === 0) {
    doc.text('Nenhum convênio encontrado para os filtros selecionados.', 14, 30);
  } else {
    const tableData = filteredConventions.map((c) => [
      c.ano,
      c.numero,
      c.situacao,
      c.uf,
      c.municipio,
      c.proponente,
      c.valorConvenio,
      c.valorLiberado,
    ]);

    (doc as any).autoTable({
      head: [['Ano', 'Número', 'Situação', 'UF', 'Município', 'Proponente', 'Valor do Convênio', 'Valor Liberado']],
      body: tableData,
      startY: 28,
      theme: 'striped',
      headStyles: { fillColor: [22, 163, 74] },
    });
  }
  
  return doc.output('arraybuffer');
}
