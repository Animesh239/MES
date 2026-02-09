ALTER TABLE "minare_registrations" ADD COLUMN "gender" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender" varchar DEFAULT 'Male';