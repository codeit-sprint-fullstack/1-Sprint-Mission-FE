import * as productsApi from "@/pages/api/products";
import * as commentApi from "@/pages/api/comment";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Comment from "@/components/Comment";
import AlertModal from "@/components/Modals/AlertModal";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import styles from "@/styles/detailProduct.module.css";
import ic_back from "@/public/images/ic_back.png";
import ic_profile from "@/public/images/ic_profile.png";
import ic_heart from "@/public/images/ic_heart.png";
import ic_heart_liked from "@/public/images/ic_heart_liked.png";
import ic_kebab from "@/public/images/ic_kebab.png";
import Img_inquiry_empty from "@/public/images/Img_inquiry_empty.png";
import { dateFormatYYYYMMDD } from "@/utils/dateFormat";

export async function getServerSideProps(context) {
  const { id } = context.params;

  let product = {};
  let comments = [];
  try {
    const data = await productsApi.getProduct(id);
    product = data;
  } catch (error) {
    console.log(error);
  }
  try {
    const { list } = await commentApi.getProductComments(id);
    comments = list;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      product,
      comments,
    },
  };
}

function DetailProduct({ product, comments }) {
  const router = useRouter();
  const {
    name,
    description,
    price,
    tags,
    ownerId,
    favoriteCount,
    createdAt,
    isFavorite,
  } = product;
  //날짜 포멧
  const productsImage = product.images[0];
  const date = dateFormatYYYYMMDD(createdAt);
  const numFormat = price.toLocaleString();
  const defaultUser = {
    //유저관리를 안하고 있음 기본 유저를 설정 추후 유저관리의 로그인계정으로 변경해야 함
    userId: ownerId,
    productId: product.id,
  };
  const [values, setValues] = useState(defaultUser);
  const [Alert, setAlert] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  // 모달 오픈상태 값
  const openAlertModal = () => setAlert(true);
  const closeAlertModal = () => setAlert(false);
  const openConfirmModal = () => setConfirm(true);
  const closeConfirmModal = () => setConfirm(false);

  const handleChangeValues = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChangeValues(name, value);
  };

  const deleteProduct = () => {
    try {
      const res = articleApi.deleteArticle(article.id);
      if (res) {
        router.push("/Articles");
      } else {
        setAlertMessage("게시글 삭제에 실패했습니다.");
        openAlertModal();
        closeConfirmModal();
      }
    } catch (error) {
      setAlertMessage("게시글 삭제에 실패했습니다." + error.name);
      openAlertModal();
      closeConfirmModal();
      console.log(error);
    }
  };

  const createComment = () => {
    try {
      const data = commentApi.createProductComment(values, product.id);
      if (data) {
        router.reload();
      } else {
        //모달 오픈
        setAlertMessage("댓글생성에 실패했습니다.");
        openAlertModal();
      }
    } catch (error) {
      setAlertMessage("댓글생성에 실패했습니다." + error.name);
      openAlertModal();
      console.log(error);
    }
  };

  return (
    <>
      {/* 모달을 콘텐츠의 최상위에 위치하기 위함 */}
      <AlertModal
        onClose={closeAlertModal}
        isOpen={Alert}
        message={alertMessage}
      />
      <ConfirmModal
        onConfirm={deleteProduct}
        onClose={closeConfirmModal}
        isOpen={Confirm}
        message={confirmMessage}
      />
      <main>
        <div className={styles.product_box}>
          <Image
            className={styles.product_image}
            width={486}
            height={486}
            src={productsImage}
            alt="상품이미지"
            priority
            unoptimized={true}
          />
          <div className={styles.product_values_box}>
            <div className={styles.product_values_top_box}>
              <span>{name}</span>
              <Image
                className={styles.product_kebab_image}
                src={ic_kebab}
                width={24}
                height={24}
                alt="상품 수정/삭제이미지"
              />
              <span className={styles.product_price}>{numFormat}원</span>
            </div>
            <div className={styles.product_values_mid_box}>
              <span>상품 소개</span>
              <p className={styles.product_description}>{description}</p>
              <span>삼품 태그</span>
              <div className={styles.chips_box}>
                {tags.map((el, index) => (
                  <div key={index} className={styles.chip}>
                    #{el}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.product_row_box}>
              <Image
                src={ic_profile}
                width={40}
                height={40}
                alt="작성자이미지"
              />
              <div className={styles.product_row_sub_box}>
                <span>{ownerId}</span>
                <span className={styles.product_createdAt}>{date}</span>
              </div>
              <div>
                <button className={styles.product_favorite_btn}>
                  <Image
                    className={styles.product_ic_heart}
                    src={isFavorite ? ic_heart_liked : ic_heart}
                    alt="좋아요이미지"
                  />
                  {favoriteCount}
                </button>
              </div>
            </div>
          </div>
        </div>
        <p></p>
        <div className={styles.products_comment_box}>
          <h3>문의하기</h3>
          <textarea
            name="content"
            onChange={handleChange}
            className={styles.products_comment_textarea}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <button
            onClick={createComment}
            className={`${styles.products_create_comment_btn} ${
              !values.content && styles.disabled
            }`}
            disabled={!values.content}
          >
            등록
          </button>
        </div>
        <div className={styles.products_comments_box}>
          <div className={styles.products_comments}>
            {comments.map((item) => (
              <Comment
                key={item.id}
                item={item}
                openAlert={openAlertModal}
                setAlertMessage={setAlertMessage}
              />
            ))}
            {/* 게시글의 등록된 댓글이 없다면 아래의 내용을 렌더링한다. */}
            {comments.length < 1 && (
              <>
                <Image
                  src={Img_inquiry_empty}
                  width={140}
                  height={140}
                  alt="댓글이없습니다"
                  priority
                />
                <p>아직 문의가 없어요</p>
              </>
            )}
          </div>
          <Link href={"/Articles"}>
            <button className={styles.return_products_page_btn}>
              목록으로 돌아가기
              <Image src={ic_back} width={24} height={24} alt="돌아가기" />
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default DetailProduct;
