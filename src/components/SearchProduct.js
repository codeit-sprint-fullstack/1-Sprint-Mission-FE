export default function SearchProduct({onSubmit}) {
  const searchValue = (e) => {
    e.preventDefault();
    onSubmit(e.target['search'].value)
  }

  return (
    <form onSubmit={searchValue}>
      <input name="search" className='searchInput' placeholder='검색할 상품을 입력해주세요' />
      <button type='submit' className='searchBtn'></button>
    </form>
  )
}