CREATE TABLE "articles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"content" varchar NOT NULL,
	"author" varchar NOT NULL,
	"publish_date" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "poems" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "poems_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"content" varchar NOT NULL,
	"author" varchar NOT NULL,
	"publish_date" varchar NOT NULL
);
