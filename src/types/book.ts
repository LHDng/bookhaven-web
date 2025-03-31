
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  rating: number;
  category: BookCategory;
  tags: string[];
  description: string;
  pages: number;
  publisher: string;
  publishedDate: string;
  language: string;
  isbn: string;
  featured?: boolean;
}

export type BookCategory = 
  | "fiction" 
  | "non-fiction" 
  | "science" 
  | "history" 
  | "biography" 
  | "fantasy" 
  | "mystery" 
  | "romance" 
  | "science-fiction" 
  | "self-help"
  | "children";
