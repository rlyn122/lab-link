CREATE TABLE "faculty" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"affiliation" varchar(255),
	"homepage" text,
	"email_domain" varchar(100),
	"scholar_id" varchar(50),
	"interests" text,
	"citedby" integer,
	"citedby5y" integer,
	"hindex" integer,
	"hindex5y" integer,
	"i10index" integer,
	"i10index5y" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "faculty_scholar_id_unique" UNIQUE("scholar_id")
);
--> statement-breakpoint
CREATE TABLE "paper_authors" (
	"paper_id" integer NOT NULL,
	"faculty_id" integer NOT NULL,
	CONSTRAINT "paper_authors_paper_id_faculty_id_pk" PRIMARY KEY("paper_id","faculty_id")
);
--> statement-breakpoint
CREATE TABLE "paper_research_areas" (
	"paper_id" integer NOT NULL,
	"area_id" integer NOT NULL,
	CONSTRAINT "paper_research_areas_paper_id_area_id_pk" PRIMARY KEY("paper_id","area_id")
);
--> statement-breakpoint
CREATE TABLE "papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"year" integer,
	"url" text,
	"abstract" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "research_areas" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	CONSTRAINT "research_areas_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "paper_authors" ADD CONSTRAINT "paper_authors_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "paper_authors" ADD CONSTRAINT "paper_authors_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "paper_research_areas" ADD CONSTRAINT "paper_research_areas_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "paper_research_areas" ADD CONSTRAINT "paper_research_areas_area_id_research_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."research_areas"("id") ON DELETE cascade ON UPDATE no action;