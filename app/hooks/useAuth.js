import { create } from "zustand";

const useAuth = create((set) => ({
  isSignedIn: false,
  userId: "",
  userNickname: "",
  userProfileUrl: null,
  prePath: "/items",
  // login: (user) =>
  //   set({
  //     isSignedIn: true,
  //     userId: user.id,
  //     userNickname: user.nickname,
  //     userProfileUrl: user.image,
  //   }),
  login: (user) =>
    set((state) => {
      if (!user || !user.id || !user.nickname) {
        console.error("Invalid user data", user);
        return state;
      }
      return {
        isSignedIn: true,
        userId: user.id,
        userNickname: user.nickname,
        userProfileUrl: user.image,
      };
    }),
  logout: () =>
    set({
      isSignedIn: false,
      userId: "",
      userNickname: "",
      userProfileUrl: null,
    }),
  setPrePath: (path) => set({ prePath: path }),
}));

export default useAuth;
