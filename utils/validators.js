export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateRequiredFields = (obj, requiredFields) => {
  return requiredFields.every(
    (field) =>
      obj.hasOwnProperty(field) &&
      obj[field] !== null &&
      obj[field] !== undefined &&
      obj[field] !== ""
  );
};
