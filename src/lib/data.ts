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

export const conventions = [
    { id: 'CVN001', proponente: 'Prefeitura de São Paulo', valor: 'R$ 5.000.000,00', situacao: 'Ativo', uf: 'SP' },
    { id: 'CVN002', proponente: 'Governo do Rio de Janeiro', valor: 'R$ 2.500.000,00', situacao: 'Ativo', uf: 'RJ' },
    { id: 'CVN003', proponente: 'Estado da Bahia', valor: 'R$ 7.800.000,00', situacao: 'Pendente', uf: 'BA' },
    { id: 'CVN004', proponente: 'Município de Belo Horizonte', valor: 'R$ 1.200.000,00', situacao: 'Concluído', uf: 'MG' },
    { id: 'CVN005', proponente: 'Governo do Paraná', valor: 'R$ 3.000.000,00', situacao: 'Ativo', uf: 'PR' },
    { id: 'CVN006', proponente: 'Prefeitura de Manaus', valor: 'R$ 4.500.000,00', situacao: 'Cancelado', uf: 'AM' },
];

export const amendments = [
  { 
    id: 'EMD001',
    ano: 2018,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0006',
    localidade: 'Nacional',
    funcao: 'Saúde',
    subfuncao: 'Assistência hospitalar e ambulatorial',
    valorEmpenhado: 'R$ 100.000,00',
    valorPago: 'R$ 100.000,00',
    valorLiberar: 'R$ 0,00',
    porcentagem: 100
  },
  { 
    id: 'EMD002',
    ano: 2018,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0004',
    localidade: 'RORAIMA (UF)',
    funcao: 'Saúde',
    subfuncao: 'Administração geral',
    valorEmpenhado: 'R$ 6.486.136,00',
    valorPago: 'R$ 0,00',
    valorLiberar: 'R$ 6.486.136,00',
    porcentagem: 0
  },
  { 
    id: 'EMD003',
    ano: 2019,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0003',
    localidade: 'RORAIMA (UF)',
    funcao: 'Saúde',
    subfuncao: 'Assistência hospitalar e ambulatorial',
    valorEmpenhado: 'R$ 7.610.387,00',
    valorPago: 'R$ 7.610.387,00',
    valorLiberar: 'R$ 0,00',
    porcentagem: 100
  },
  { 
    id: 'EMD004',
    ano: 2016,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0002',
    localidade: 'MÚLTIPLO',
    funcao: 'Urbanismo',
    subfuncao: 'Assistência comunitária',
    valorEmpenhado: 'R$ 342.143,00',
    valorPago: 'R$ 171.071,00',
    valorLiberar: 'R$ 171.072,00',
    porcentagem: 50
  },
  { 
    id: 'EMD005',
    ano: 2017,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0002',
    localidade: 'MÚLTIPLO',
    funcao: 'Saúde',
    subfuncao: 'Saneamento básico urbano',
    valorEmpenhado: 'R$ 2.343.887,00',
    valorPago: 'R$ 0,00',
    valorLiberar: 'R$ 2.343.887,00',
    porcentagem: 0
  },
  {
    id: 'EMD006',
    ano: 2018,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0005',
    localidade: 'RORAIMA (UF)',
    funcao: 'Saúde',
    subfuncao: 'Atenção básica',
    valorEmpenhado: 'R$ 799.942,00',
    valorPago: 'R$ 196.000,00',
    valorLiberar: 'R$ 603.942,00',
    porcentagem: 24.5
  },
  {
    id: 'EMD007',
    ano: 2019,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0001',
    localidade: 'RORAIMA (UF)',
    funcao: 'Defesa nacional',
    subfuncao: 'Assistência comunitária',
    valorEmpenhado: 'R$ 7.610.387,00',
    valorPago: 'R$ 0,00',
    valorLiberar: 'R$ 7.610.387,00',
    porcentagem: 0
  },
  {
    id: 'EMD008',
    ano: 2017,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0003',
    localidade: 'Nacional',
    funcao: 'Saúde',
    subfuncao: 'Assistência hospitalar e ambulatorial',
    valorEmpenhado: 'R$ 100.000,00',
    valorPago: 'R$ 100.000,00',
    valorLiberar: 'R$ 0,00',
    porcentagem: 100
  },
  {
    id: 'EMD009',
    ano: 2017,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0004',
    localidade: 'MÚLTIPLO',
    funcao: 'Saúde',
    subfuncao: 'Saneamento básico rural',
    valorEmpenhado: 'R$ 4.092.563,00',
    valorPago: 'R$ 0,00',
    valorLiberar: 'R$ 4.092.563,00',
    porcentagem: 0
  },
  {
    id: 'EMD010',
    ano: 2016,
    tipo: 'Emenda Individual - Transferências com Finalidade Definida',
    autor: 'ABEL MESQUITA JR.',
    numero: '0001',
    localidade: 'RORAIMA (UF)',
    funcao: 'Defesa nacional',
    subfuncao: 'Assistência comunitária',
    valorEmpenhado: 'R$ 6.471.218,00',
    valorPago: 'R$ 0,00',
    valorLiberar: 'R$ 6.471.218,00',
    porcentagem: 0
  }
];
