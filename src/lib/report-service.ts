
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getEmendas, type Emenda } from '@/services/transparencia-api';
import { getDeputados } from '@/services/camara-api';
import { getSenadores, type Senator } from '@/services/senado-api';
import { getPartidos } from '@/services/camara-api';
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
    let isFirstPage = true;

    const addModuleSection = async (title: string, addContent: () => Promise<boolean>) => {
        if (!isFirstPage) {
            doc.addPage();
        } else {
            isFirstPage = false;
        }
        const hasContent = await addContent();
        if (hasContent) {
           addHeaderFooter(doc, title, year);
        } else {
            if(!isFirstPage) doc.deletePage(doc.internal.getNumberOfPages());
        }
    };

    if (modules.includes('amendments')) {
        await addModuleSection('Módulo de Emendas Parlamentares', async () => {
            const emendas = await getEmendas(year);
            if (emendas.length > 0) {
                autoTable(doc, {
                    head: [['#', 'Autor', 'Tipo', 'Função', 'Localidade', 'Valor Empenhado', 'Valor Pago']],
                    body: emendas.map(e => [e.numeroEmenda, e.autor, e.tipoEmenda, e.funcao, e.localidadeGasto, e.valorEmpenhado, e.valorPago]),
                    startY: 25,
                });
                return true;
            }
            return false;
        });
    }

    if (modules.includes('conventions')) {
        await addModuleSection('Módulo de Convênios', async () => {
            const convenios = staticConventions.filter(c => c.ano === year);
            if (convenios.length > 0) {
                autoTable(doc, {
                    head: [['#', 'Situação', 'Proponente', 'Objeto', 'Valor Convênio', 'Valor Liberado']],
                    body: convenios.map(c => [c.numero, c.situacao, c.proponente, c.objeto, c.valorConvenio, c.valorLiberado]),
                    startY: 25,
                });
                return true;
            }
            return false;
        });
    }

    if (modules.includes('parliamentarians')) {
        await addModuleSection('Módulo de Parlamentares (Deputados)', async () => {
            const { dados: deputados } = await getDeputados();
            if (deputados.length > 0) {
                autoTable(doc, {
                    head: [['Nome', 'Partido', 'UF', 'Email']],
                    body: deputados.map(d => [d.nome, d.siglaPartido, d.siglaUf, d.email]),
                    startY: 25,
                });
                return true;
            }
            return false;
        });
    }

    if (modules.includes('senators')) {
        await addModuleSection('Módulo de Senadores', async () => {
            const senadores = await getSenadores();
            if (senadores.length > 0) {
                autoTable(doc, {
                    head: [['Nome', 'Partido', 'UF', 'Email']],
                    body: senadores.map(s => [s.nome, s.partido, s.uf, s.email]),
                    startY: 25,
                });
                return true;
            }
            return false;
        });
    }

    if (modules.includes('parties')) {
        await addModuleSection('Módulo de Partidos', async () => {
            const { dados: partidos } = await getPartidos();
            if (partidos.length > 0) {
                autoTable(doc, {
                    head: [['Sigla', 'Nome', 'Líder na Câmara']],
                    body: partidos.map(p => [p.sigla, p.nome, p.status?.lider?.nome || 'Não informado']),
                    startY: 25,
                });
                return true;
            }
            return false;
        });
    }
    
    doc.save(`Relatorio_Gerencial_${year}_${new Date().toISOString().split('T')[0]}.pdf`);
}
