import { sql } from 'drizzle-orm';
import { check, integer, pgTable, varchar, pgEnum, index, timestamp, } from 'drizzle-orm/pg-core';
export const userRole = pgEnum('user_role', ['Client', 'Manager']);
export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    telefone: varchar().notNull(),
    password: varchar().notNull(),
    role: userRole().notNull().default('Client'),
    createdAt: timestamp({ withTimezone: true })
        .notNull()
        .defaultNow(),
}, (table) => [
    check('users_name_length_check', sql `length(${table.name}) >= 4`),
    index('idx_users_email').on(table.email),
    index('idx_users_role').on(table.role),
]);
export const produtos = pgTable('produtos', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    QNT: varchar(),
    D1: varchar(),
    D2: varchar(),
    createdAt: timestamp({ withTimezone: true })
        .notNull()
        .defaultNow(),
}, (table) => [
    check('products_name_length_check', sql `length(${table.name}) >= 4`),
    index('idx_produtos_name').on(table.name),
]);
