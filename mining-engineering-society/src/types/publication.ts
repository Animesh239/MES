export interface Publication {
  id: number;
  title: string;
  content: string;
  type: "poem" | "article";
  author: string;
  publishDate: string;
}
