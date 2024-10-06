import Image from 'next/image';
import ActionDropdown from '@shared/components/dropdowns/ActionDropdown';
import ImageActionButton from '@shared/components/Buttons/ImageActionButton';
import { getProductList, getProducts } from '@utils/api/codeit';
import styles from '@app/(nav-layout)/items/[itemId]/page.module.css';
import { ProductComments } from '@shared/components/comment/commentQuery';

export async function generateStaticParams() {
  const response = await getProductList();
  const productId = response.map((product) => ({
    productId: product.id.toString(),
  }));
  return productId;
}

export async function generateMetadata({ params }) {
  const response = await getProducts(params.itemId);
  return {
    title: response.name,
    description: response.description,
  };
}

export default async function ProductDetail({ params }) {
  const response = await getProducts(params.itemId);
  const product = response;

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['product-container']}>
          <div className={styles['product-image']}>
            <Image src={product.images} fill alt="product-image" />
          </div>
          <div>
            <div className={styles['product-name']}>
              {product.name}
              <ActionDropdown id={params.id} option={'product'} />
            </div>
            <div className={styles['product-price']}>{product.price}원</div>
            <div className={styles['horizontal-line']} />
            <div className={styles['product-description-title']}>상품 소개</div>
            <div className={styles['product-description']}>
              {product.description}
            </div>
            <div className={styles['product-tags-title']}>상품 태그</div>
            {product.tags.map((tag) => (
              <div>#{tag}</div>
            ))}
            <div className={styles['product-info']}>
              <div className={styles['product-meta']}>
                <div className={styles['product-user-image']}>
                  {product.ownerNickname.image ? (
                    <Image
                      src={product.ownerNickname.image}
                      fill
                      alt="user-image"
                    />
                  ) : null}
                </div>
                {product.ownerNickname ? (
                  <div className={styles['product-user']}>
                    {product.ownerNickname}
                  </div>
                ) : null}
                <div className={styles['product-updated']}></div>
              </div>
              <div className={styles['favorite-count']}>
                <div className={styles['favorite-image']}>
                  <Image src="/favorite.svg" alt="favorite-count" fill />
                </div>
                {product.favoriteCount}
              </div>
            </div>
          </div>
        </div>
        <ProductComments id={params.itemId} />
        <ImageActionButton content={'목록으로 돌아가기'} type={'return'} />
      </div>
    </>
  );
}
