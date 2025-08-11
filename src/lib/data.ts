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
    { id: 'EMD001', autor: 'Senador Silva', funcao: 'Saúde', valor: 'R$ 500.000,00', status: 'Aprovada' },
    { id: 'EMD002', autor: 'Deputado Costa', funcao: 'Educação', valor: 'R$ 1.200.000,00', status: 'Em Análise' },
    { id: 'EMD003', autor: 'Senadora Oliveira', funcao: 'Infraestrutura', valor: 'R$ 3.000.000,00', status: 'Aprovada' },
    { id: 'EMD004', autor: 'Deputada Santos', funcao: 'Segurança', valor: 'R$ 750.000,00', status: 'Rejeitada' },
    { id: 'EMD005', autor: 'Senador Pereira', funcao: 'Cultura', valor: 'R$ 250.000,00', status: 'Pendente' },
];
