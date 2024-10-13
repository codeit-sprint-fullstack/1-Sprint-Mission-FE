'use client';
import Input from '@shared/components/inputs/Input';
import Image from 'next/image';
import styles from '@shared/components/product/createProduct.module.css';
import { useCreateProductValidation } from '@hooks/useValidation/useCreateProductValidation';
import InputErrorText from '../inputs/InputErrorText';
import { useState } from 'react';
import { postImages } from '@utils/api/images';
import { postProduct } from '@utils/api/product';

export default function CreateProduct() {
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const {
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
  } = useCreateProductValidation();

  const EnterKeyDown = (e) => {
    if (e.key === 'Enter' && productTagValue.trim()) {
      e.preventDefault();
      setTags((prev) => [...prev, productTagValue.trim()]);
      onProductTagChange({ target: { value: '' } });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 3) {
      alert('이미지는 최대 3개까지 첨부할 수 있습니다.');
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

    setImages((prevImages) => [...prevImages, ...files]);

    if (files) {
      modalToggle(!isModalOpen);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert('최소 1개의 이미지를 업로드해야 합니다.');
      return;
    }

    try {
      const uploadedImageUrls = await postImages(images);
      setImageUrls(uploadedImageUrls); // URL 배열로 저장

      const productData = {
        name: productNameValue,
        description: productDescriptionValue,
        price: Number(productPriceValue),
        tags: tags,
        imageUrls: uploadedImageUrls,
      };

      console.log(productNameValue);

      const response = await postProduct(productData);

      if (response.status === 200) {
        alert('상품이 성공적으로 등록되었습니다.');
      }
    } catch (error) {
      console.error('상품 등록 중 오류 발생:', error);
    }
  };

  return (
    <form>
      <div>상품 이미지</div>
      <button onClick={handleSubmit}>등록</button>
      <div className={styles['images-container']}>
        <div className={styles['add-product-image']} onClick={modalToggle}>
          <Image src={'/add-img.svg'} fill />
        </div>
        {previews.map((url) => (
          <div className={styles['add-product-image']}>
            <Image src={url} fill />
          </div>
        ))}
      </div>
      <div>상품명</div>
      <Input
        option={'normal'}
        page={'create-product'}
        placeholder={'상품명을 입력해주세요'}
        name={'productName'}
        onChange={onProductNameChange}
      />
      {errors.productName && (
        <InputErrorText
          content={errors.productName.message}
          page={'create-product'}
        />
      )}
      <div>상품소개</div>
      <Input
        option={'textarea'}
        page={'create-product-content'}
        placeholder={'상품 소개를 입력해주세요'}
        name={'productDescription'}
        onChange={onProductDescriptionChange}
      />
      {errors.productDescription && (
        <InputErrorText
          content={errors.productDescription.message}
          page={'create-product'}
        />
      )}
      <div>판매가격</div>
      <Input
        option={'normal'}
        page={'create-product'}
        placeholder={'판매 가격을 입력해주세요'}
        name={'productPrice'}
        onChange={onProductPriceChange}
      />
      {errors.productPrice && (
        <InputErrorText
          content={errors.productPrice.message}
          page={'create-product'}
        />
      )}
      <div>태그</div>
      <Input
        option={'normal'}
        page={'create-product'}
        placeholder={'태그를 입력해주세요'}
        name={'productTag'}
        onChange={onProductTagChange}
        onKeyDown={EnterKeyDown}
      />
      {errors.productTag && (
        <InputErrorText
          content={errors.productTag.message}
          page={'create-product'}
        />
      )}
      <div>
        {tags.map((tag, index) => (
          <div key={index}>#{tag}</div>
        ))}
      </div>

      {isModalOpen && (
        <div>
          <div>
            <h2>이미지 첨부</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={modalToggle}>취소</button>
          </div>
        </div>
      )}
    </form>
  );
}
