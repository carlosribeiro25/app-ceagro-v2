import { db } from './cliente.js'
import { produtos, users } from './schema.js'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { hash } from 'argon2'

async function seed() {
   const passwordHash = await hash('147852')
    
const insertUser =  await db.insert(users).values([
    { name: faker.person.fullName(), email: faker.internet.email(), telefone: faker.phone.imei(), password: passwordHash},
    { name: faker.person.fullName(), email: faker.internet.email(), telefone: faker.phone.imei(), password: passwordHash},
    ]).returning()

const insetProduct = await db.insert(produtos).values([
    { name: faker.food.fruit(), QNT: faker.lorem.word(1), D1: faker.lorem.word(1), D2: faker.lorem.word(1)},
    { name: faker.food.fruit(), QNT: faker.lorem.word(1), D1: faker.lorem.word(1), D2: faker.lorem.word(1)},
    { name: faker.food.fruit(), QNT: faker.lorem.word(1), D1: faker.lorem.word(1), D2: faker.lorem.word(1)},
    
    ]).returning()
}

seed()