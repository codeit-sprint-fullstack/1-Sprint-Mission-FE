import styles from './create.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { postArticle } from '../api/articles';
export default function create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [btnState, setbtnState] = useState('addpostBtnfalse');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);

  const router = useRouter();

  const generateUUID = () => {
    return Math.random().toString(36).substring(2, 9);
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    if (selectedImages.length + files.length > 3) {
      alert('이미지는 최대 3개까지 등록할 수 있습니다.');
      return;
    }

    const newImagesPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve({ id: generateUUID(), url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagesPromises).then((loadedImages) => {
      setSelectedImages((prevImages) => {
        const updatedImages = [...prevImages, ...loadedImages].slice(0, 3);
        // console.log("업데이트된 이미지 리스트:", updatedImages);

        const imageUrls = updatedImages.map((image) => image.url);
        // images 값을 포함한 values 업데이트
        setImagesUrl(imageUrls);

        return updatedImages;
      });
    });
  };
  const handleRemoveImage = (id) => {
    setSelectedImages((prevImages) => {
      // console.log(id);
      const updatedImages = prevImages.filter((image) => image.id !== id);
      return updatedImages;
    });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    if (title.length > 0 && content.length > 0) {
      setbtnState('addpostBtntrue');
    } else {
      setbtnState('addpostBtnfalse');
    }
  }, [title, content]);

  const postClick = async (e) => {
    e.preventDefault();

    const data = {
      name: title,
      content: content,
      images: imagesUrl,
    };
    console.log(data);
    try {
      await postArticle(data);
      // router.push(`/`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={styles.addpostContainer}>
        <form className={styles.addpostporm} onSubmit={postClick}>
          <div className={styles.addposttitle}>
            <p>게시글 쓰기</p>
            {btnState === 'addpostBtnfalse' ? (
              <button
                className={styles[btnState]}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                등록
              </button>
            ) : (
              <button type="submit" className={styles[btnState]}>
                등록
              </button>
            )}
          </div>
          <div className={styles.addpostContent}>
            <p>상품 이미지</p>
            <div className={styles.fromTitle}>
              <div className={styles.uploadContainer}>
                <label className={styles.imageUpload}>
                  <span className={styles.uploadText}>+</span>
                  <span className={styles.uploadDescription}>이미지 등록</span>
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={handleImageChange}
                    multiple
                  />
                </label>

                {selectedImages.length > 0 && (
                  <div className={styles.imageList}>
                    {selectedImages.map((image) => (
                      <div key={image.id} className={styles.imagePreview}>
                        <img
                          src={image.url}
                          alt="미리보기"
                          className={styles.previewImage}
                        />
                        <button
                          className={styles.removeButton}
                          onClick={() => handleRemoveImage(image.id)}
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.formtitle}>
              <p>* 제목</p>
              <input
                onChange={handleTitleChange}
                className={styles.InputTitle}
                type="text"
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div className={styles.formContent}>
              <p>* 내용</p>
              <textarea
                onChange={handleContentChange}
                className={styles.InputContent}
                type="text"
                placeholder="내용을 입력해주세요"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
