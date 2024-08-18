import { useState, useEffect } from 'react';

export default function useValidateText(formValues) {
  const [errText, setErrText] = useState({
    name: '',
    description: '',
    price: '',
    tags: '',
  });

  useEffect(() => {
    const validateText = (values) => {
      return {
        name:
          values.name.length > 1 && values.name.length <= 10
            ? ''
            : '10자 이내로 입력해주세요',

        description:
          values.description.length > 10 && values.description.length <= 100
            ? ''
            : '10자 이상, 100자 이내로 입력해주세요',

        price: /^[0-9]+(\.[0-9]{1,2})?$/.test(values.price)
          ? ''
          : '숫자로 입력해주세요',

        tags: values.tags.length <= 5 ? '' : '5글자 이내로 입력해주세요',
      };
    };
    setErrText(validateText(formValues));
  }, [formValues]);
  return errText;
}
