export function validateForm(formData) {
  const errors = {};
  if (!formData.title || formData.title.trim() === "") {
    errors.title = "제목을 입력해주세요";
  }
  if (!formData.content || formData.content.trim() === "") {
    errors.content = "내용을 입력해주세요";
  }
  return errors;
}
