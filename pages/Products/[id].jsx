import { useRouter } from "next/router";

function DetailProduct() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main>
      <div>상세페이지</div>
      <p>{id}</p>
    </main>
  );
}

export default DetailProduct;
