import { User } from "./user";

export interface AuthState {
  isSignedIn: boolean;
  userId: string;
  userNickname: string;
  userProfileUrl: string | null;
  prePath: string;
  login: (user: User) => void;
  logout: () => void;
  setPrePath: (path: string) => void;
}

export interface CurrentPostInfoState {
  id: string;
  name: string;
  content: string;
  modifyPostId: (newPostId: string) => void;
  setName: (newPostName: string) => void;
  setContent: (newPostContent: string) => void;
}
