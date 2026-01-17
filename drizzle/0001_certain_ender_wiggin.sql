CREATE TABLE "produtos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "produtos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(30) NOT NULL,
	"qnt" varchar(30) NOT NULL,
	"D1" varchar(10) NOT NULL,
	"D2" varchar(10) NOT NULL
);
