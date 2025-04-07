import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

/**
 * Faculty table
 * Based on CSV attributes: Name, Affiliation, Homepage, Email_Domain, Scholar_ID, 
 * Interests, Citedby, Citedby5y, hindex, hindex5y, i10index, i10index5y
 */
export const faculty = pgTable("faculty", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  affiliation: varchar("affiliation", { length: 255 }),
  homepage: text("homepage"),
  emailDomain: varchar("email_domain", { length: 100 }),
  scholarId: varchar("scholar_id", { length: 50 }).unique(),
  interests: text("interests"),
  // Citation metrics
  citedby: integer("citedby"),
  citedby5y: integer("citedby5y"),
  hindex: integer("hindex"),
  hindex5y: integer("hindex5y"),
  i10index: integer("i10index"),
  i10index5y: integer("i10index5y"),
  // Additional metadata
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Research papers table
 * Based on CSV attributes: Author, Title, Year, URL, Abstract
 */
export const papers = pgTable("papers", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  year: integer("year"),
  url: text("url"),
  abstract: text("abstract"),
  // Additional metadata
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Join table for many-to-many relationship between papers and faculty
 */
export const paperAuthors = pgTable(
  "paper_authors",
  {
    paperId: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    facultyId: integer("faculty_id")
      .notNull()
      .references(() => faculty.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.paperId, t.facultyId] }),
  })
);

/**
 * Research areas/interests table for categorization
 */
export const researchAreas = pgTable("research_areas", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
});

/**
 * Join table for many-to-many relationship between papers and research areas
 */
export const paperResearchAreas = pgTable(
  "paper_research_areas",
  {
    paperId: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    areaId: integer("area_id")
      .notNull()
      .references(() => researchAreas.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.paperId, t.areaId] }),
  })
);

/**
 * Relations setup
 */
export const facultyRelations = relations(faculty, ({ many }) => ({
  papers: many(paperAuthors),
}));

export const papersRelations = relations(papers, ({ many }) => ({
  authors: many(paperAuthors),
  researchAreas: many(paperResearchAreas),
}));

export const paperAuthorsRelations = relations(paperAuthors, ({ one }) => ({
  paper: one(papers, {
    fields: [paperAuthors.paperId],
    references: [papers.id],
  }),
  faculty: one(faculty, {
    fields: [paperAuthors.facultyId],
    references: [faculty.id],
  }),
}));

export const researchAreasRelations = relations(researchAreas, ({ many }) => ({
  papers: many(paperResearchAreas),
}));

export const paperResearchAreasRelations = relations(
  paperResearchAreas,
  ({ one }) => ({
    paper: one(papers, {
      fields: [paperResearchAreas.paperId],
      references: [papers.id],
    }),
    researchArea: one(researchAreas, {
      fields: [paperResearchAreas.areaId],
      references: [researchAreas.id],
    }),
  })
); 