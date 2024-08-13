import { useState } from "react";

function useRegistationBlur() {

  const [conditionError, setConditionError] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });
  const [inputClassName, setInputClassName] = useState({
    name: "productInput borderNone",
    description: "productInput borderNone",
    price: "productInput borderNone",
    tags: "productInput borderNone",
  });

  const handleBlurFalse = (eventName) => {
    setConditionError((preConditionError) => ({
      ...preConditionError,
      [eventName]: true,
    }));
    setInputClassName((preInputClassName) => ({
      ...preInputClassName,
      [eventName]: "productInput borderError",
    }));
  };

  const handleBlurTrue = (eventName) => {
    setConditionError((preConditionError) => ({
      ...preConditionError,
      [eventName]: false,
    }));
    setInputClassName((preInputClassName) => ({
      ...preInputClassName,
      [eventName]: "productInput borderNone",
    }));
  };

  return [conditionError, inputClassName, handleBlurTrue, handleBlurFalse]
}

export default useRegistationBlur;
