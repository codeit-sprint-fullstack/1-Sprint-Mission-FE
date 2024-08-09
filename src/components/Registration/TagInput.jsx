import './TagInput.css';
import closeIcon from '../../assets/ic_X.svg';

export default function TagInput({
  tags,
  setTags,
  tagInputValue,
  setTagInputValue,
  handleTagInputChange,
  className,
}) {
  const addTag = () => {
    const newTag = tagInputValue.trim();
    if (newTag !== '') {
      if (!tags.includes(newTag)) {
        setTags((prevTags) => [...prevTags, newTag]);
        setTagInputValue('');
      } else {
        console.log('이미 입력한 태그임');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      addTag();
    }
  };

  const handleClick = (tagToDelete) => {
    deleteTag(tagToDelete);
  };

  const deleteTag = (tagToDelete) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag !== tagToDelete);
    });
  };

  return (
    <div className={className}>
      <label htmlFor='tags'>태그</label>
      <input
        id='tags'
        name='tags'
        type='text'
        value={tagInputValue}
        onChange={handleTagInputChange}
        onKeyDown={handleKeyDown}
        placeholder='태그를 입력해주세요'
      />
      <ul>
        {tags.map((tag, index) => {
          return (
            <li key={index}>
              <span>{`#${tag}`}</span>
              <button type='button' onClick={() => handleClick(tag)}>
                <img src={closeIcon} alt='close icon' />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
