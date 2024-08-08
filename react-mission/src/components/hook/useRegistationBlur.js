import { useState } from "react";

function useRegistationBlur(eventName) {
  const [conditionError, setConditionError] = useState({
    name: false,
    introduction: false,
    price: false,
    tag: false,
  });
  const [inputClassName, setInputClassName] = useState({
    name: "productInput borderNone",
    introduction: "productInput borderNone",
    price: "productInput borderNone",
    tag: "productInput borderNone",
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
      eventName: false,
    }));
    setInputClassName((preInputClassName) => ({
      ...preInputClassName,
      eventName: "productInput borderNone",
    }));
  };

  return [conditionError, inputClassName, handleBlurTrue, handleBlurFalse]
}

export default useRegistationBlur;
