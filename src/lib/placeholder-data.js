const users = [
    {
        id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        name: 'Jeferson Ishikawa',
        email: 'jeferson.ishikawa@example.com',
        password: 'password123'
    },
    {
        id: '4d4e3e3e-4d4e-4d4e-4d4e-4d4e4d4e4d4e',
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password123'
    }
];

const chatMessages = [
    {
        sender_id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        receiver_id: '4d4e3e3e-4d4e-4d4e-4d4e-4d4e4d4e4d4e',
        text: 'Olá Alice, tudo bem? Conseguiu ver a documentação da emenda parlamentar?',
        created_at: new Date('2024-01-01T10:30:00Z')
    },
    {
        sender_id: '4d4e3e3e-4d4e-4d4e-4d4e-4d4e4d4e4d4e',
        receiver_id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        text: 'Oi! Tudo bem. Sim, estou analisando agora.',
        created_at: new Date('2024-01-01T10:32:00Z')
    }
];


module.exports = {
  users,
  chatMessages,
};
