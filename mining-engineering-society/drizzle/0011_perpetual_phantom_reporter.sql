CREATE TABLE "minare_registrations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "minare_registrations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone_number" varchar NOT NULL,
	"college_name" varchar NOT NULL,
	"branch" varchar NOT NULL,
	"graduation_year" varchar NOT NULL,
	"photo_url" varchar,
	"payment_proof_url" varchar NOT NULL,
	"transaction_id" varchar,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"created_at" varchar NOT NULL,
	"updated_at" varchar
);
