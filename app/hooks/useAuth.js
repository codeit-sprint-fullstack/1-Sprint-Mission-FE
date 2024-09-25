import { create } from "zustand";

const useAuth = create((set) => ({
  isSignedIn: false,
  userId: "",
  userNickname: "",
  userProfileUrl: null,
  login: (user) =>
    set({
      isSignedIn: true,
      userId: user.id,
      userNickname: user.nickname,
      userProfileUrl: user.image,
    }),
  logout: () =>
    set({
      isSignedIn: false,
      userId: "",
      userNickname: "",
      userProfileUrl: null,
    }),
}));

export default useAuth;
