import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    telefone: varchar().notNull(),
    password: varchar().notNull(),
})

export const produtos = pgTable("produtos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    QNT: varchar().notNull(),
    D1: integer().notNull(),
    D2: integer().notNull()
})