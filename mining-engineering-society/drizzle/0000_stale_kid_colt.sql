CREATE TABLE "alumni" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "alumni_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"graduation_year" varchar NOT NULL,
	"current_position" varchar NOT NULL,
	"company" varchar NOT NULL,
	"linkedin_profile" varchar
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"image_links" varchar[] NOT NULL,
	"type" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallary" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gallary_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"image_url" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "members_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"role" varchar NOT NULL,
	"photo_url" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "minerva" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "minerva_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"issue_date" varchar NOT NULL,
	"pdf_link" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stakeholders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stakeholders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"role" varchar NOT NULL,
	"tenure" varchar NOT NULL
);
