import { db } from './cliente.js';
import { users } from './schema.js';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { hash } from 'argon2';
async function seed() {
    const passwordHash = await hash('147852');
    const insertUser = await db.insert(users).values([
        { name: faker.person.fullName(), email: faker.internet.email(), telefone: faker.phone.imei(), password: passwordHash, role: 'Manager' },
        { name: faker.person.fullName(), email: faker.internet.email(), telefone: faker.phone.imei(), password: passwordHash, role: 'Manager' },
    ]).returning();
}
seed();
