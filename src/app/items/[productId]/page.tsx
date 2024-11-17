import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import Product from "./Product";
import ProductCommentSection from "./ProductCommentSection";
import AuthRoute from "src/app/components/AuthRoute";
import { getProduct } from "src/lib/api-product";

export const dynamicParams = true;

interface ProductPageProps {
  params: { productId: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await Promise.resolve(params);

  const product = await getProduct({ productId });

  const btnFrameClass = classNames(
    "content",
    "flex",
    "h-[4.8rem]",
    "mt-[6.4rem]",
    "mb-[32.5rem]"
  );
  const linkClass = classNames("my-0", "mx-auto");
  const linkImageFrameClass = classNames("w-[24rem]", "h-[4.8rem]", "relative");

  return (
    <AuthRoute>
      <div className="content main">
        <Product product={product} />
        <ProductCommentSection
          productId={productId}
          commentList={product.comments}
        />
        <div className={btnFrameClass}>
          <Link href="/items" className={linkClass}>
            <div className={linkImageFrameClass}>
              <Image
                src="/buttons/btn_medium.svg"
                alt="목록 페이지로 돌아가기"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </Link>
        </div>
      </div>
    </AuthRoute>
  );
}
