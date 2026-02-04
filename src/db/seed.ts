import { db } from './cliente.js'
import { produtos, users } from './schema.js'
import { fakerPT_BR as faker} from '@faker-js/faker'

async function seed() {
const insertUser =  await db.insert(users).values([
    { name: faker.person.fullName(), email: faker.internet.email(), telefone: faker.phone.imei(), password: faker.lorem.words(2)  },
    { name: faker.person.fullName(), email: faker.internet.email(), telefone: faker.phone.imei(), password: faker.lorem.words(2)  },
    { name: faker.person.fullName(), email: faker.internet.email(), telefone: faker.phone.imei(), password: faker.lorem.words(2)  },
    { name: faker.person.fullName(), email: faker.internet.email(), telefone: faker.phone.imei(), password: faker.lorem.words(2)  },
    ]).returning()

const insetProduct = await db.insert(produtos).values([
    { name: faker.food.fruit(), QNT: faker.lorem.word(5), D1: faker.number.int(1), D2: faker.number.int(1) },
    { name: faker.food.vegetable(), QNT: faker.lorem.word(5), D1: faker.number.int(1), D2: faker.number.int(1) },
    { name: faker.food.fruit(), QNT: faker.lorem.word(5), D1: faker.number.int(1), D2: faker.number.int(1) },
    { name: faker.food.vegetable(), QNT: faker.lorem.word(5), D1: faker.number.int(1), D2: faker.number.int(1) },
    ]).returning()
}

seed()