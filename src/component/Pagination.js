import './Pagination.css';

function Pagination() {
  return (
    <div className='page-container'>
      <div className='page'>
        <button>&lt;</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>&gt;</button>
      </div>
    </div>
  );
}

export default Pagination;