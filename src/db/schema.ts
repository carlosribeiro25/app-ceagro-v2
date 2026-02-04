import { sql } from 'drizzle-orm';
import { check, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    telefone: varchar().notNull(),
    password: varchar().notNull(),
}, (table) => ({
    nameLengthCheck: check('users_name_length_check', sql`length(${table.name}) >= 4`),
})
)

export const produtos = pgTable("produtos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar(),
    QNT: varchar(),
    D1: integer(),
    D2: integer()
}, (table) => ({
    nameLengthCheck: check('products_name_length_check', sql`length(${table.name}) >= 4`),
}))