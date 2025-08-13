

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
