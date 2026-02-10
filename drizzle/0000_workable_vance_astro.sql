CREATE TYPE "public"."user_role" AS ENUM('Client', 'Manager');--> statement-breakpoint
CREATE TABLE "produtos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "produtos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"QNT" varchar,
	"D1" varchar,
	"D2" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_name_length_check" CHECK (length("produtos"."name") >= 4)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"telefone" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "user_role" DEFAULT 'Client' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_name_length_check" CHECK (length("users"."name") >= 4)
);
--> statement-breakpoint
CREATE INDEX "idx_produtos_name" ON "produtos" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_role" ON "users" USING btree ("role");