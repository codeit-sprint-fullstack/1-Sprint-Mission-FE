import { useState, useEffect } from "react";

const useValidationText = (name, price, description, tag) => {
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [discriptionError, setDiscriptionError] = useState(false);
  const [tagError, setTagError] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (name.length > 10) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  useEffect(() => {
    if (price && !/^\d+$/.test(price)) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  }, [price]);

  useEffect(() => {
    if (description && description.length < 10) {
      setDiscriptionError(true);
    } else {
      setDiscriptionError(false);
    }
  }, [description]);

  useEffect(() => {
    if (tag.length > 5) {
      setTagError(true);
    } else {
      setTagError(false);
    }
  }, [tag]);

  useEffect(() => {
    if (
      !name &&
      !price &&
      !description &&
      !nameError &&
      !priceError &&
      !discriptionError
    ) {
      setSubmitError(true);
    } else {
      setSubmitError(false);
    }
  }, [name, price, description, tag]);

  return {
    nameError,
    priceError,
    discriptionError,
    tagError,
    submitError,
  };
};

export default useValidationText;
