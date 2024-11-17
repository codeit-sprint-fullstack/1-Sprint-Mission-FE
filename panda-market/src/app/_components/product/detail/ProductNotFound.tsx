export function ProductNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-secondary-900">
          상품을 찾을 수 없습니다
        </h1>
        <p className="text-secondary-600">
          삭제되었거나 존재하지 않는 상품입니다
        </p>
      </div>
    </div>
  );
}
