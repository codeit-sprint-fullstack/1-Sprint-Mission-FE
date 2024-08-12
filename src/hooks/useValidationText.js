import { useState, useEffect } from 'react';

const useValidationText = (name, price, description, tag) => {

  const [nameValidation, setNameValidation] = useState(false);
  const [priceValidation, setPriceValidation] = useState(false);
  const [discriptionValidation, setDiscriptionValidation] = useState(false);
  const [tagValidation, setTagValidation] = useState(false);

  useEffect(() => {
    if (name.lengh > 10) {
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
    if (description.lengh < 10) {
      setDiscriptionValidation(true);
    } else {
      setDiscriptionValidation(false);
    }
  }, [description]);

  useEffect(() => {
    if (tag.lengh > 5) {
      setTagValidation(true);
    } else {
      setTagValidation(false);
    }
  }, [tag]);

  return { nameValidation, priceValidation, discriptionValidation, tagValidation };
};

export default useValidationText;
