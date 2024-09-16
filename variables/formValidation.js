export const ARTICLE = {
  TITLE: {
    required: "제목을 입력해 주세요",
    maxLength: { value: 50, message: "최대 50자까지 입력 할 수 있습니다" },
    minLength: { value: 1, message: "최소 1자 이상 입력해주세요" },
  },
  CONTENT: {
    required: "내용을 입력해 주세요",
    maxLength: { value: 500, message: "최대 500자까지 입력 할 수 있습니다" },
    minLength: { value: 10, message: "최소 10자 이상 입력해주세요" },
  },
};
