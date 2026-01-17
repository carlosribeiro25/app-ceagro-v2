import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 100 }).notNull().unique(),
    telefone: varchar({ length: 100}).notNull(),
    password: varchar({ length: 300 }).notNull(),
})

export const produtos = pgTable("produtos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length: 30}).notNull(),
    qnt: varchar({length: 30}).notNull(),
    D1: varchar({length:10}).notNull(),
    D2: varchar({length:10}).notNull()
})