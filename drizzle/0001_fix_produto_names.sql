-- Atualizar produtos com nome menor que 4 caracteres para cumprir a restrição
UPDATE "produtos" SET "name" = "name" || ' produto' WHERE length("name") < 4;
--> statement-breakpoint
