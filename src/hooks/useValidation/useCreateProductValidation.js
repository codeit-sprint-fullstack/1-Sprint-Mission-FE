import { useController, useForm } from 'react-hook-form';

export function useCreateProductValidation() {
  const {
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: 'onChange',
  });

  const {
    field: { value: productNameValue, onChange: onProductNameChange },
  } = useController({
    name: 'productName',
    control,
    defaultValue: '',
    rules: {
      maxLength: {
        value: 10,
        message: '10자 이내로 입력해주세요',
      },
    },
  });

  const {
    field: {
      value: productDescriptionValue,
      onChange: onProductDescriptionChange,
    },
  } = useController({
    name: 'productDescription',
    control,
    defaultValue: '',
    rules: {
      minLength: {
        value: 10,
        message: '10자 이상 입력해주세요',
      },
    },
  });

  const {
    field: { value: productPriceValue, onChange: onProductPriceChange },
  } = useController({
    name: 'productPrice',
    control,
    defaultValue: '',
    rules: {
      pattern: {
        value: /^[0-9]+$/,
        message: '숫자로 입력해주세요',
      },
    },
  });

  const {
    field: { value: productTagValue, onChange: onProductTagChange },
  } = useController({
    name: 'productTag',
    control,
    defaultValue: '',
    rules: {
      maxLength: {
        value: 5,
        message: '5글자 이내로 입력해주세요',
      },
    },
  });

  return {
    productNameValue,
    productDescriptionValue,
    productPriceValue,
    productTagValue,
    onProductNameChange,
    onProductDescriptionChange,
    onProductPriceChange,
    onProductTagChange,
    errors,
    isValid,
  };
}
