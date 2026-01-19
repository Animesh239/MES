CREATE TABLE "achievements" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "achievements_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"year" varchar NOT NULL,
	"achievement" varchar NOT NULL,
	"photo_url" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "class_representatives" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "class_representatives_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"batch" varchar NOT NULL,
	"photo_url" varchar NOT NULL,
	"linkedin_profile" varchar
);
--> statement-breakpoint
CREATE TABLE "past_stakeholders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "past_stakeholders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"role" varchar NOT NULL,
	"year" varchar NOT NULL,
	"numeric_year" integer,
	"photo_url" varchar NOT NULL,
	"linkedin_profile" varchar
);
