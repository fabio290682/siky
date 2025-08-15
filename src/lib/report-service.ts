
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getEmendas, type Emenda } from '@/services/transparencia-api';
import { getDeputados } from '@/services/camara-api';
import { getSenadores, type Senator } from '@/services/senado-api';
import { getPartidos } from '@/services/camara-api';
// Acessando os dados estáticos diretamente para os convênios
import { staticConventions } from '@/app/dashboard/conventions/page'; 

type Convention = {
    ano: number;
    numero: string;
    situacao: string;
    uf: string;
    municipio: string;
    proponente: string;
    convenente: string;
    objeto: string;
    valorConvenio: string;
    valorLiberado: string;
    saldoALiberar: string;
    inicioVigencia: string;
    fimVigencia: string;
    diasRestantes: string;
    percentualLiberado: number;
};

// Função auxiliar para adicionar cabeçalho e rodapé
const addHeaderFooter = (doc: jsPDF, title: string, year: number) => {
    const pageCount = doc.internal.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`Relatório Gerencial Consolidado - ${year}`, pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(title, pageWidth / 2, 22, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Página ${i} de ${pageCount}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
        doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, pageHeight - 10);
    }
};

export async function generateConsolidatedReport(year: number, modules: string[]) {
    const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4' });
    let finalY = 25; // Posição inicial após o cabeçalho

    if (modules.includes('amendments')) {
        const emendas = await getEmendas(year);
        if (emendas.length > 0) {
            autoTable(doc, {
                head: [['#', 'Autor', 'Tipo', 'Função', 'Localidade', 'Valor Empenhado', 'Valor Pago']],
                body: emendas.map(e => [e.numeroEmenda, e.autor, e.tipoEmenda, e.funcao, e.localidadeGasto, e.valorEmpenhado, e.valorPago]),
                startY: finalY + 5,
                didDrawPage: (data) => addHeaderFooter(doc, 'Módulo de Emendas Parlamentares', year)
            });
            finalY = (doc as any).lastAutoTable.finalY;
        }
    }

    if (modules.includes('conventions')) {
        const convenios = staticConventions.filter(c => c.ano === year);
         if (convenios.length > 0) {
            doc.addPage();
            finalY = 25;
            autoTable(doc, {
                head: [['#', 'Situação', 'Proponente', 'Objeto', 'Valor Convênio', 'Valor Liberado']],
                body: convenios.map(c => [c.numero, c.situacao, c.proponente, c.objeto, c.valorConvenio, c.valorLiberado]),
                startY: finalY + 5,
                didDrawPage: (data) => addHeaderFooter(doc, 'Módulo de Convênios', year)
            });
            finalY = (doc as any).lastAutoTable.finalY;
        }
    }
    
    if (modules.includes('parliamentarians')) {
        const { dados: deputados } = await getDeputados();
         if (deputados.length > 0) {
            doc.addPage();
            finalY = 25;
            autoTable(doc, {
                head: [['Nome', 'Partido', 'UF', 'Email']],
                body: deputados.map(d => [d.nome, d.siglaPartido, d.siglaUf, d.email]),
                startY: finalY + 5,
                didDrawPage: (data) => addHeaderFooter(doc, 'Módulo de Parlamentares (Deputados)', year)
            });
            finalY = (doc as any).lastAutoTable.finalY;
        }
    }

    if (modules.includes('senators')) {
        const senadores = await getSenadores();
        if (senadores.length > 0) {
            doc.addPage();
            finalY = 25;
            autoTable(doc, {
                head: [['Nome', 'Partido', 'UF', 'Email']],
                body: senadores.map(s => [s.nome, s.partido, s.uf, s.email]),
                startY: finalY + 5,
                didDrawPage: (data) => addHeaderFooter(doc, 'Módulo de Senadores', year)
            });
            finalY = (doc as any).lastAutoTable.finalY;
        }
    }
    
    if (modules.includes('parties')) {
        const { dados: partidos } = await getPartidos();
        if (partidos.length > 0) {
            doc.addPage();
            finalY = 25;
            autoTable(doc, {
                head: [['Sigla', 'Nome', 'Líder na Câmara']],
                body: partidos.map(p => [p.sigla, p.nome, p.status?.lider?.nome || 'Não informado']),
                startY: finalY + 5,
                didDrawPage: (data) => addHeaderFooter(doc, 'Módulo de Partidos', year)
            });
            finalY = (doc as any).lastAutoTable.finalY;
        }
    }
    
    // Remove a página extra se não foi usada
    const pageCount = doc.internal.getNumberOfPages();
    const lastPage = doc.internal.pages[pageCount-1];
    if (lastPage && lastPage.length === 1 && lastPage[0].type === 'page') { // Heurística para página em branco
        doc.deletePage(pageCount);
    }


    doc.save(`Relatorio_Gerencial_${year}_${new Date().toISOString().split('T')[0]}.pdf`);
}
