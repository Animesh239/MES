"use server";

import { getAllPoems } from "@/actions/mes/poems/action";
import { getAllArticles } from "@/actions/mes/articles/action";
import { Publication } from "@/types/publication";

export type { Publication };

export const getAllPublications = async () => {
  try {
    const [poemsResult, articlesResult] = await Promise.all([
      getAllPoems(),
      getAllArticles(),
    ]);

    const allPublications: Publication[] = [];

    if (poemsResult.success && poemsResult.data) {
      const poems = poemsResult.data.map(
        (poem: {
          id: number;
          title: string;
          content: string;
          author: string;
          publishDate: string;
        }) => ({
          ...poem,
          type: "poem" as const,
        })
      );
      allPublications.push(...poems);
    }

    if (articlesResult.success && articlesResult.data) {
      const articles = articlesResult.data.map(
        (article: {
          id: number;
          title: string;
          content: string;
          author: string;
          publishDate: string;
        }) => ({
          ...article,
          type: "article" as const,
        })
      );
      allPublications.push(...articles);
    }

    // Sort by publish date (newest first)
    allPublications.sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

    return {
      success: true,
      message: "Publications retrieved successfully.",
      data: allPublications,
    };
  } catch (error) {
    console.error("Error fetching publications:", error);
    return {
      success: false,
      message: "Failed to fetch publications.",
      data: [],
    };
  }
};

export const getPublicationsByType = async (type: "poem" | "article") => {
  try {
    if (type === "poem") {
      const result = await getAllPoems();
      if (result.success && result.data) {
        const poems = result.data.map(
          (poem: {
            id: number;
            title: string;
            content: string;
            author: string;
            publishDate: string;
          }) => ({
            ...poem,
            type: "poem" as const,
          })
        );
        return {
          success: true,
          message: "Poems retrieved successfully.",
          data: poems,
        };
      }
    } else {
      const result = await getAllArticles();
      if (result.success && result.data) {
        const articles = result.data.map(
          (article: {
            id: number;
            title: string;
            content: string;
            author: string;
            publishDate: string;
          }) => ({
            ...article,
            type: "article" as const,
          })
        );
        return {
          success: true,
          message: "Articles retrieved successfully.",
          data: articles,
        };
      }
    }

    return {
      success: false,
      message: `No ${type}s found.`,
      data: [],
    };
  } catch (error) {
    console.error(`Error fetching ${type}s:`, error);
    return {
      success: false,
      message: `Failed to fetch ${type}s.`,
      data: [],
    };
  }
};

export const searchPublications = async (query: string) => {
  try {
    const result = await getAllPublications();

    if (!result.success || !result.data) {
      return {
        success: false,
        message: "Failed to search publications.",
        data: [],
      };
    }

    const filteredPublications = result.data.filter(
      (pub: Publication) =>
        pub.title.toLowerCase().includes(query.toLowerCase()) ||
        pub.author.toLowerCase().includes(query.toLowerCase()) ||
        pub.content.toLowerCase().includes(query.toLowerCase())
    );

    return {
      success: true,
      message: "Search completed successfully.",
      data: filteredPublications,
    };
  } catch (error) {
    console.error("Error searching publications:", error);
    return {
      success: false,
      message: "Failed to search publications.",
      data: [],
    };
  }
};
