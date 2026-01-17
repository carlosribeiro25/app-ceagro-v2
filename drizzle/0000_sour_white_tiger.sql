CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"telefone" varchar(100) NOT NULL,
	"password" varchar(300) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
