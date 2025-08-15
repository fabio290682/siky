

export const users = [
  { id: 1, name: 'Alice', avatar: 'https://placehold.co/40x40.png', online: true, lastMessage: 'Ok, vou verificar.', lastMessageTime: '10:40 AM', unread: 2 },
  { id: 2, name: 'Carlos', avatar: 'https://placehold.co/40x40.png', online: false, lastMessage: 'O relatório está pronto.', lastMessageTime: '9:30 AM', unread: 0 },
  { id: 3, name: 'Beatriz', avatar: 'https://placehold.co/40x40.png', online: true, lastMessage: 'Podemos marcar uma reunião?', lastMessageTime: 'Ontem', unread: 0 },
  { id: 4, name: 'Daniel', avatar: 'https://placehold.co/40x40.png', online: true, lastMessage: 'Anexei os documentos.', lastMessageTime: 'Ontem', unread: 1 },
  { id: 5, name: 'Fernanda', avatar: 'https://placehold.co/40x40.png', online: false, lastMessage: 'Qual o prazo final?', lastMessageTime: '2 dias atrás', unread: 0 },
  { id: 6, name: 'Gustavo', avatar: 'https://placehold.co/40x40.png', online: false, lastMessage: 'Entendido.', lastMessageTime: '2 dias atrás', unread: 0 },
];

export const messages = {
  '1': [
    { sender: 'me', text: 'Olá Alice, tudo bem? Conseguiu ver a documentação da emenda parlamentar?', timestamp: '10:30 AM' },
    { sender: 'Alice', text: 'Oi! Tudo bem. Sim, estou analisando agora.', timestamp: '10:32 AM' },
    { sender: 'Alice', text: 'Parece que falta a assinatura do gestor. Você pode confirmar?', timestamp: '10:35 AM' },
    { sender: 'me', text: 'Claro, vou checar com ele e te retorno.', timestamp: '10:36 AM' },
    { sender: 'Alice', text: 'Ok, vou verificar.', timestamp: '10:40 AM' },
  ],
  '2': [
    { sender: 'Carlos', text: 'O relatório está pronto.', timestamp: '9:30 AM' },
  ],
  '3': [
      { sender: 'Beatriz', text: 'Podemos marcar uma reunião?', timestamp: 'Ontem' },
  ]
};

export type Convention = {
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

export const staticConventions: Convention[] = [
    {
        ano: 2023,
        numero: "947852",
        situacao: "Em execução",
        uf: "SP",
        municipio: "São Paulo",
        proponente: "PREFEITURA MUNICIPAL DE SAO PAULO",
        convenente: "Ministério da Saúde",
        objeto: "Construção de Unidade Básica de Saúde no bairro Jardim das Flores.",
        valorConvenio: "R$ 1.500.000,00",
        valorLiberado: "R$ 750.000,00",
        saldoALiberar: "R$ 750.000,00",
        inicioVigencia: "01/01/2023",
        fimVigencia: "31/12/2024",
        diasRestantes: "580",
        percentualLiberado: 50
    },
    {
        ano: 2022,
        numero: "935641",
        situacao: "Adimplente",
        uf: "RJ",
        municipio: "Rio de Janeiro",
        proponente: "GOVERNO DO ESTADO DO RIO DE JANEIRO",
        convenente: "Ministério da Educação",
        objeto: "Aquisição de equipamentos de informática para escolas da rede estadual.",
        valorConvenio: "R$ 2.000.000,00",
        valorLiberado: "R$ 2.000.000,00",
        saldoALiberar: "R$ 0,00",
        inicioVigencia: "15/03/2022",
        fimVigencia: "14/03/2023",
        diasRestantes: "0",
        percentualLiberado: 100
    },
    {
        ano: 2023,
        numero: "951234",
        situacao: "Aguardando Prestação de Contas",
        uf: "MG",
        municipio: "Belo Horizonte",
        proponente: "PREFEITURA MUNICIPAL DE BELO HORIZONTE",
        convenente: "Ministério da Cultura",
        objeto: "Realização do Festival de Inverno de Belo Horizonte.",
        valorConvenio: "R$ 500.000,00",
        valorLiberado: "R$ 500.000,00",
        saldoALiberar: "R$ 0,00",
        inicioVigencia: "01/06/2023",
        fimVigencia: "31/08/2023",
        diasRestantes: "0",
        percentualLiberado: 100
    },
    {
        ano: 2024,
        numero: "963321",
        situacao: "Prestação de Contas em Análise",
        uf: "BA",
        municipio: "Salvador",
        proponente: "SECRETARIA DE TURISMO DA BAHIA",
        convenente: "Ministério do Turismo",
        objeto: "Apoio a projetos de desenvolvimento do turismo local.",
        valorConvenio: "R$ 800.000,00",
        valorLiberado: "R$ 400.000,00",
        saldoALiberar: "R$ 400.000,00",
        inicioVigencia: "01/02/2024",
        fimVigencia: "31/01/2025",
        diasRestantes: "215",
        percentualLiberado: 50
    },
     {
        ano: 2021,
        numero: "921122",
        situacao: "Cancelado",
        uf: "AM",
        municipio: "Manaus",
        proponente: "PREFEITURA MUNICIPAL DE MANAUS",
        convenente: "Ministério do Meio Ambiente",
        objeto: "Projeto de preservação de nascentes na área urbana de Manaus.",
        valorConvenio: "R$ 300.000,00",
        valorLiberado: "R$ 0,00",
        saldoALiberar: "R$ 300.000,00",
        inicioVigencia: "10/05/2021",
        fimVigencia: "09/05/2022",
        diasRestantes: "0",
        percentualLiberado: 0
    },
];
