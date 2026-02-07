ALTER TABLE "minare_registrations" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "college_name" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "branch" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "graduation_year" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "degree" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");