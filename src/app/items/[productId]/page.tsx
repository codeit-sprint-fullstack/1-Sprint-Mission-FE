import Link from "next/link";
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
  const productId = params?.productId;

  if (!productId) {
    throw new Error("Product ID is missing in the route parameters.");
  }

  const product = await getProduct({ productId });

  const btnFrameClass = classNames("content", "btn-to-list-frame");
  const linkClass = classNames("my-0", "mx-auto");

  return (
    <AuthRoute>
      <div className="content main">
        <Product product={product} />
        {/* <ProductCommentSection productId={productId} /> */}
        <div className={btnFrameClass}>
          <Link href="/items" className={linkClass}>
            <button className={"btn-to-list"} />
          </Link>
        </div>
      </div>
    </AuthRoute>
  );
}
