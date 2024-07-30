function Sortlist({onClick}) {
  const handleSort = (e) => {
    onClick(e.target.innerHTML);
  }

  return (
    <>
      <li className="recent list" onClick={handleSort}>최신순</li>
      <li className="best list" onClick={handleSort}>좋아요순</li>
    </>
  )
}

export default function Dropdown({onClick}) {
  return (
    <>
      <Sortlist onClick={onClick}></Sortlist>
    </>
  );
} 