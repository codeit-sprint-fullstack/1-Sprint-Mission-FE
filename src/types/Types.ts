// BoardComponent | BoardDetail
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

export interface ArticleDropDownProps {
  articleId: number;
}

// BoardDetail(CommentDropDown) | CommentComponent
export interface CommentWriter {
  id: number;
  nickname: string;
  image: string | null;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  writer: CommentWriter;
}

export interface CommentDropDownProps {
  onDelete: () => Promise<void>;
}

export interface CommentListProps {
  commentList: Comment[];
  setCommentList: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export interface PostCommentProps {
  addComment: (comment: string) => Promise<void>;
  title: string;
  placeholder: string;
}

export interface ProductCommentsResponse {
  list: Comment[];
}

// authContext
export interface User {
  id: number;
  nickname: string;
  image: string;
  createdAt: string;
  updateAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// useFormValidation
export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type ValidateFunction<T extends FormValues> = (
  fileName: keyof T,
  value: string,
  values: T
) => string;

export interface UseFormValidationReturn {
  initialState: FormValues;
  values: FormValues;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    onSubmit: () => void
  ) => (e: React.FormEvent<HTMLFormElement>) => void;
}

// ItemDetail
export interface ProductCommentDropDownProps {
  writerId: number;
  commentId: number;
  setEditCommentId: (id: number | null) => void;
}

export interface ProductDeleteModalProps {
  isDeleteModalClose: () => void;
  handleDelete: () => void;
}

export interface ProductPatchCommentProps {
  comment: Comment;
  setEditCommentId: (id: number | null) => void;
}

// SignCommon
export interface LoginFormValues extends FormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues extends LoginFormValues {
  nickname: string;
  passwordConfirmation: string;
}

export interface ModalProps {
  message: string;
  onClick: () => void;
}

export interface LoginResponse {
  status: number;
  data: {
    accessToken: string;
    user: User;
  };
}

export interface SignUpResponse {
  status: number;
  data: {
    message: string;
  };
}

// lib - Api
export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  passwordConfirmation: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface Product {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: User;
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

// pages
export interface BoardDetailProps {
  article: Article & {
    content: string;
    comment?: Comment[];
  };
}

export interface ItemDetailData extends Product {
  name: string;
  price: number;
  description: string;
  tags: string[];
  images: string[];
  favoriteCount: number;
}

export interface FormData {
  title: string;
  content: string;
}

export interface PostResponse {
  id: number;
}