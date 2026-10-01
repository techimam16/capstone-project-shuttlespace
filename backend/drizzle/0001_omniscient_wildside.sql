CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(20) DEFAULT 'penyewa' NOT NULL,
	"nama_lengkap" varchar(100),
	"no_hp" varchar(20),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "admins" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "admins" CASCADE;--> statement-breakpoint
ALTER TABLE "bookings" DROP CONSTRAINT "unique_slot_booking";--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_slot_booking" ON "bookings" USING btree ("lapangan_id","tanggal","jam_mulai") WHERE "bookings"."status" != 'cancelled';--> statement-breakpoint
ALTER TABLE "bookings" DROP COLUMN "nama_penyewa";--> statement-breakpoint
ALTER TABLE "bookings" DROP COLUMN "no_hp";