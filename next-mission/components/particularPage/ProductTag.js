export default function ProductTag() {
  const tags = [];
  return (
    <div>
      <div>상품 태그</div>
      <ui>
        {tags.map((tag) => (
          <li>
            <div>{`#${"태그 내용"}`}</div>
          </li>
        ))}
      </ui>
    </div>
  );
}
