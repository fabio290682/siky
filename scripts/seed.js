const { db } = require('@vercel/postgres');
const { users, chatMessages } = require('../src/lib/placeholder-data.js');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedChatMessages(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS chat_messages (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                sender_id UUID NOT NULL,
                receiver_id UUID NOT NULL,
                text TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        console.log('Created "chat_messages" table');

        const insertedMessages = await Promise.all(
            chatMessages.map(
                (message) => client.sql`
                    INSERT INTO chat_messages (sender_id, receiver_id, text, created_at)
                    VALUES (${message.sender_id}, ${message.receiver_id}, ${message.text}, ${message.created_at})
                    ON CONFLICT (id) DO NOTHING;
                `
            )
        );

        console.log(`Seeded ${insertedMessages.length} chat messages`);

        return {
            createTable,
            chatMessages: insertedMessages
        };

    } catch (error) {
        console.error('Error seeding chat messages:', error);
        throw error;
    }
}


async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedChatMessages(client);
  
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
