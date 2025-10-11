"use server";

import { articlesTable } from "@/db/schema";
import { DB_Connection } from "@/lib/db_connection";
import { eq } from "drizzle-orm";

// CRUD Operations for Articles

export const addArticle = async (articleData: {
  title: string;
  content: string; // MDX content
  author: string;
  publishDate: string;
}) => {
  const newArticle = await DB_Connection.insert(articlesTable)
    .values(articleData)
    .returning();

  if (!newArticle) {
    return {
      success: false,
      message: "Failed to add article.",
    };
  }
  return {
    success: true,
    message: "Article added successfully.",
    data: newArticle,
  };
};

export const getAllArticles = async () => {
  const articlesList = await DB_Connection.select().from(articlesTable);
  if (!articlesList) {
    return {
      success: false,
      message: "No articles found.",
    };
  }
  return {
    success: true,
    message: "Articles retrieved successfully.",
    data: articlesList,
  };
};

export const getArticleById = async (id: number) => {
  const article = await DB_Connection.select()
    .from(articlesTable)
    .where(eq(articlesTable.id, id));

  if (!article || article.length === 0) {
    return {
      success: false,
      message: "Article not found.",
    };
  }
  return {
    success: true,
    message: "Article retrieved successfully.",
    data: article[0],
  };
};

export const updateArticle = async (
  id: number,
  updatedData: {
    title?: string;
    content?: string;
    author?: string;
    publishDate?: string;
  }
) => {
  const updatedArticle = await DB_Connection.update(articlesTable)
    .set(updatedData)
    .where(eq(articlesTable.id, id))
    .returning();

  if (!updatedArticle) {
    return {
      success: false,
      message: "Failed to update article.",
    };
  }
  return {
    success: true,
    message: "Article updated successfully.",
    data: updatedArticle,
  };
};

export const deleteArticle = async (id: number) => {
  const deletedArticle = await DB_Connection.delete(articlesTable).where(
    eq(articlesTable.id, id)
  );
  if (!deletedArticle) {
    return {
      success: false,
      message: "Failed to delete article.",
    };
  }
  return {
    success: true,
    message: "Article deleted successfully.",
  };
};
