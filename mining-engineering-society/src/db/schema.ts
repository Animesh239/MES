import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

// MES Database Schema

// Alumni Table
export const alumniTable = pgTable("alumni", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  graduationYear: varchar("graduation_year").notNull(),
  currentPosition: varchar("current_position").notNull(),
  company: varchar("company").notNull(),
  photoUrl: varchar("photo_url").notNull(),
  linkedInProfile: varchar("linkedin_profile"),
});

// Stakeholders Table
export const stakeholdersTable = pgTable("stakeholders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  role: varchar("role").notNull(),
  tenure: varchar("tenure").notNull(),
  photoUrl: varchar("photo_url").notNull(),
});

// Events Table
export const eventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title").notNull(),
  imageLinks: varchar("image_links").array().notNull(),
  type: varchar("type").notNull(),
});

// Minerva Table
export const minervaTable = pgTable("minerva", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title").notNull(),
  issueDate: varchar("issue_date").notNull(),
  pdfLink: varchar("pdf_link").notNull(),
  coverImageLink: varchar("cover_image_link").notNull(),
});

// Poems Table
export const poemsTable = pgTable("poems", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title").notNull(),
  content: varchar("content").notNull(), // MDX content
  author: varchar("author").notNull(),
  publishDate: varchar("publish_date").notNull(),
});

// Articles Table
export const articlesTable = pgTable("articles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title").notNull(),
  content: varchar("content").notNull(), // MDX content
  author: varchar("author").notNull(),
  publishDate: varchar("publish_date").notNull(),
});

// Authentication Table
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username").notNull().unique(),
  password: varchar("password").notNull(),
  createdAt: varchar("created_at").notNull(),
});

// MINARE Database Schema

// Gallary Table
export const galleryTable = pgTable("gallary", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  imageUrl: varchar("image_url").notNull(),
});

// Members Table
export const membersTable = pgTable("members", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  role: varchar("role").notNull(),
  photoUrl: varchar("photo_url").notNull(),
});
