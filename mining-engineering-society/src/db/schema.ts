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
  linkedInProfile: varchar("linkedin_profile"),
});

// Events Table
export const eventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title").notNull(),
  imageLinks: varchar("image_links").array().notNull(),
  type: varchar("type").notNull(),
  year: varchar("year"),
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
  username: varchar("username").notNull().unique(), // Acts as unique handle
  password: varchar("password").notNull(),
  name: varchar("name"),
  email: varchar("email").unique(),
  phoneNumber: varchar("phone_number"),
  collegeName: varchar("college_name"),
  branch: varchar("branch"),
  graduationYear: varchar("graduation_year"),
  degree: varchar("degree"), // B.Tech, M.Tech, etc.
  role: varchar("role").default("user").notNull(), // 'user', 'admin'
  gender: varchar("gender").default("Male"),
  createdAt: varchar("created_at").notNull(),
});

// MINARE Database Schema

// Gallary Table
export const galleryTable = pgTable("gallary", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  imageUrl: varchar("image_url").notNull(),
  year: varchar("year"),
});

// Members Table
export const membersTable = pgTable("members", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  role: varchar("role").notNull(),
  photoUrl: varchar("photo_url").notNull(),
  linkedInProfile: varchar("linkedin_profile"),
  year: varchar("year"),
  type: varchar("type").default("current"), // 'current' or 'past'
});

// Minare Events Table
export const minareEventsTable = pgTable("minare_events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title").notNull(),
  imageLinks: varchar("image_links").array().notNull(),
  type: varchar("type").notNull(),
  year: varchar("year"),
});

// Achievement Table (Students Corner)
export const achievementsTable = pgTable("achievements", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  year: varchar("year").notNull(),
  achievement: varchar("achievement").notNull(),
  photoUrl: varchar("photo_url").notNull(),
});

// Past Stakeholders Table
export const pastStakeholdersTable = pgTable("past_stakeholders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  role: varchar("role").notNull(),
  year: varchar("year").notNull(), // tenure year (e.g., "2023-24")
  numericYear: integer("numeric_year"),
  photoUrl: varchar("photo_url").notNull(),
  linkedInProfile: varchar("linkedin_profile"),
});

// Class Representatives Table
export const classRepresentativesTable = pgTable("class_representatives", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  batch: varchar("batch").notNull(), // e.g., "2025" or "Final Year"
  class: varchar("class"), // e.g., "B.Tech" or "M.Tech"
  photoUrl: varchar("photo_url").notNull(),
  linkedInProfile: varchar("linkedin_profile"),
});

// Minare Registrations Table
export const minareRegistrationsTable = pgTable("minare_registrations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  collegeName: varchar("college_name").notNull(),
  branch: varchar("branch").notNull(),
  graduationYear: varchar("graduation_year").notNull(),
  gender: varchar("gender"),
  photoUrl: varchar("photo_url"),
  paymentProofUrl: varchar("payment_proof_url").notNull(),
  transactionId: varchar("transaction_id"),
  uid: varchar("uid"), // Legacy Firebase UID (kept for reference if needed)
  userId: integer("user_id"), // Foreign Key to usersTable
  status: varchar("status").default("pending").notNull(), // 'pending', 'approved', 'rejected'
  createdAt: varchar("created_at").notNull(),
  updatedAt: varchar("updated_at"),
});
