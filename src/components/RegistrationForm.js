import { useState, useEffect } from 'react';
import { createProductItem } from '../api/ProductItem.js';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './RegistrationHeader.js';
import RegistrationTags from './RegistrationTags.js';

import useValidation from '../hooks/registrationHook.js';

import styles from './RegistrationForm.module.css';

const INITIAL_VALUES = {
  name: '',
  description: '',
  price: '',
  tags: [],
  images: [],
};

function RegistrationForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [submittingError, setSubmittingError] = useState(null);
  const [blurred, setBlurred] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });

  const errors = useValidation(values);

  const hasError = (name) => {
    return blurred[name] && errors[name];
  };

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setBlurred((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: values.name,
      description: values.description,
      price: values.price,
      tags: values.tags,
    };

    console.log(productData);

    try {
      setSubmittingError(null);
      await createProductItem(productData);
      navigate('/pro');
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(true);
    }

    setValues(productData);
  };

  useEffect(() => {
    if (
      values.name.trim() &&
      values.description.trim() &&
      values.price.trim() &&
      values.tags.length > 0 &&
      Object.keys(errors).length === 0
    ) {
      setIsSubmitting(false);
    } else {
      setIsSubmitting(true);
    }
  }, [values, errors]);

  // const priceChangeHandler = (event) => {
  //   let price = event.target.value;
  //   price = Number(price.replaceAll(',', ''));
  //   console.log(typeof price);
  //   if (isNaN(price)) {
  //     setPrice(0);
  //   } else {
  //     setPrice(price.toLocaleString('ko-KR'));
  //   }
  // };

  return (
    <div>
      <div>
        <RegistrationHeader
          isSubmitting={isSubmitting}
          submittingError={submittingError}
          handleSubmit={handleSubmit}
        />
        <p className={styles.font}>상품명</p>
        <input
          className={hasError('name') ? styles.errorInput : styles.input}
          onBlur={handleBlur}
          onChange={handleInputChange}
          name='name'
          placeholder='상품명을 입력해 주세요'
        />
        {hasError('name') && <p className={styles.error}>{errors.name}</p>}
      </div>
      <div>
        <p className={styles.font}>상품 소개</p>
        <textarea
          className={
            hasError('description') ? styles.errorTextarea : styles.textarea
          }
          onBlur={handleBlur}
          onChange={handleInputChange}
          minLength={10}
          name='description'
          placeholder='상품 소개를 입력해 주세요'
        />
        {hasError('description') && (
          <p className={styles.error}>{errors.description}</p>
        )}
      </div>
      {/* <FileInput name='images' value={values.images} onChange={handleChange} /> */}
      <div>
        <p className={styles.font}>판매가격</p>
        <input
          className={hasError('price') ? styles.errorInput : styles.input}
          onBlur={handleBlur}
          onChange={handleInputChange}
          name='price'
          type='text'
          placeholder='판매 가격을 입력해 주세요'
        />
        {hasError('price') && <p className={styles.error}>{errors.price}</p>}
      </div>
      <RegistrationTags
        handleInputChange={handleInputChange}
        initialValues={INITIAL_VALUES}
        errors={errors}
      />
    </div>
  );
}

export default RegistrationForm;
