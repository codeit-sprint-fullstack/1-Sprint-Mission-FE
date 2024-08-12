import { useState, useEffect } from "react";

const useValidationText = (name, price, description, tag) => {
  const [nameValidation, setNameValidation] = useState(false);
  const [priceValidation, setPriceValidation] = useState(false);
  const [discriptionValidation, setDiscriptionValidation] = useState(false);
  const [tagValidation, setTagValidation] = useState(false);
  const [validationForm, setValidationForm] = useState(false);

  useEffect(() => {
    if (name.length > 10) {
      setNameValidation(true);
    } else {
      setNameValidation(false);
    }
  }, [name]);

  useEffect(() => {
    if (price && !/^\d+$/.test(price)) {
      setPriceValidation(true);
    } else {
      setPriceValidation(false);
    }
  }, [price]);

  useEffect(() => {
    if (description && description.length < 10) {
      setDiscriptionValidation(true);
    } else {
      setDiscriptionValidation(false);
    }
  }, [description]);

  useEffect(() => {
    if (tag.length > 5) {
      setTagValidation(true);
    } else {
      setTagValidation(false);
    }
  }, [tag]);

  useEffect(() => {
    if (
      name &&
      price &&
      description &&
      !nameValidation &&
      !priceValidation &&
      !discriptionValidation
    ) {
      setValidationForm(true);
    } else {
      setValidationForm(false);
    }
  }, [name, price, description, tag]);

  return {
    nameValidation,
    priceValidation,
    discriptionValidation,
    tagValidation,
    validationForm,
  };
};

export default useValidationText;
