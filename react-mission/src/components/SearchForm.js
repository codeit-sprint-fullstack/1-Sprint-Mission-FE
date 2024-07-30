function SearchForm({ value, onChange, onKeyPress }) {

    const onSubMit = (e) => e.preventDefault()

    return (
        <form onSubmit={onSubMit}>
            <input className="searchProduct" value={value} onChange={onChange} onKeyPress={onKeyPress} placeholder="검색할 상품을 입력해주세요" />
        </form>
    );
}

export default SearchForm;