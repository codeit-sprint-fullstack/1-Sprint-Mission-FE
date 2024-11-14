export interface Article {
  id: number;
  title: string;
  createdAt: string;
}

export interface ArticleProps {
  articles: Article[];
}

export interface SearchProps {
  onSearch: (keyword: string) => void;
}
