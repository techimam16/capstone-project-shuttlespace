CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "admins_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"lapangan_id" integer NOT NULL,
	"nama_penyewa" varchar(100) NOT NULL,
	"no_hp" varchar(20) NOT NULL,
	"tanggal" date NOT NULL,
	"jam_mulai" time NOT NULL,
	"jam_selesai" time NOT NULL,
	"status" varchar(20) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "unique_slot_booking" UNIQUE("lapangan_id","tanggal","jam_mulai")
);
--> statement-breakpoint
CREATE TABLE "lapangan" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama" varchar(100) NOT NULL,
	"harga_per_jam" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_lapangan_id_lapangan_id_fk" FOREIGN KEY ("lapangan_id") REFERENCES "public"."lapangan"("id") ON DELETE no action ON UPDATE no action;