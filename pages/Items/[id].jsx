import * as productsApi from "@/pages/api/products";
import * as commentApi from "@/pages/api/comment";
import { useRouter } from "next/router";
import { useState } from "react";
import useAuth from "@/contexts/authContext";
import Link from "next/link";
import Image from "next/image";
import Comment from "@/components/Comment";
import AlertModal from "@/components/Modals/AlertModal";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import styles from "@/styles/detailProduct.module.css";
import ic_back from "@/public/images/ic_back.png";
import imgDefault from "@/public/images/img_default.png";
import ic_profile from "@/public/images/ic_profile.png";
import ic_heart from "@/public/images/ic_heart.png";
import ic_heart_liked from "@/public/images/ic_heart_liked.png";
import ic_kebab from "@/public/images/ic_kebab.png";
import Img_inquiry_empty from "@/public/images/Img_inquiry_empty.png";
import { dateFormatYYYYMMDD } from "@/utils/dateFormat";
import DropdownData from "@/components/DropdownList/DropdownData";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import instance from "../api/httpClient";

export async function getServerSideProps(context) {
  //다이나믹 라우팅인 관계로 SSG의 방식으로 react-query를 사용하지 않고 SSR 방식을 사용
  const { id } = context.params;

  let product = {};
  let comments = [];

  try {
    // const data = await productsApi.getProduct(id);
    const data = await instance.get(`/products/${id}`, {
      headers: {
        Authorization: context.req.cookies["access-token"],
      },
    });
    product = data.data;
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
      id,
    },
  };
}

function DetailProduct({ product, comments, id }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getProduct(id),
    initialData: product,
  });

  const { data: commentsData } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => commentApi.getProductComments(id),
    initialData: comments,
  });

  const {
    createdAt,
    favoriteCount,
    ownerId,
    owner,
    tags = [],
    price,
    description,
    name,
    isFavorite,
  } = productData;

  //날짜 포멧
  const productsImage =
    product.images.length > 0 ? productData.image[0] : imgDefault;
  const date = dateFormatYYYYMMDD(createdAt);
  const numFormat = price.toLocaleString();
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  // 모달 오픈상태 값
  const openAlertModal = () => setAlert(true);
  const closeAlertModal = () => setAlert(false);
  const openConfirmModal = () => setConfirm(true);
  const closeConfirmModal = () => setConfirm(false);

  //권한인증
  const { user } = useAuth();

  //수정/삭제 드롭다운오픈 상태 값
  const [openDropdown, setOpenDropdown] = useState(false);
  const openArticleDropdown = () => setOpenDropdown(!openDropdown);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  // 상품수정을 선택시 Registration 페이지의 쿼리로 상품의 id를 전달한다.
  const updateArticle = () => {
    router.push(`/Items/Registration?id=${id}`);
  };

  const handleDeleteArticle = () => {
    //삭제의 경우 confirm 모달을 통하여 확인하여 진행한다.
    setConfirmMessage("상품이 영구적으로 삭제됩니다. 삭제하시겠습니까?");
    openConfirmModal();
  };

  const deleteProduct = () => {
    try {
      const res = productsApi.deleteProduct(id);
      if (res) {
        router.push("/Items");
      } else {
        setAlertMessage("상품 삭제에 실패했습니다.");
        openAlertModal();
        closeConfirmModal();
      }
    } catch (error) {
      setAlertMessage("상품 삭제에 실패했습니다." + error.name);
      openAlertModal();
      closeConfirmModal();
      console.log(error);
    }
  };

  const createComment = () => {
    try {
      const data = commentApi.createProductComment(content, product.id);
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

  const likeMutation = useMutation({
    mutationFn: async () => {
      //해당 상품의 사용자 좋아요상태의 따라 호출하는 API를 달리 한다.
      if (isFavorite) {
        await productsApi.unlikeProduct(id);
      } else {
        await productsApi.likeProduct(id);
      }
    },
    onMutate: async () => {
      //만약 refetch를 진행중이라면 mutation의 값을 덮어쓸수 있기 때문에 취소해준다
      await queryClient.cancelQueries({
        queryKey: ["product"],
      });

      //실패할 경유의 대비하여 이전의 상태를 저장한다
      const prevProduct = queryClient.getQueryData(["product"]);

      queryClient.setQueryData(["product"], (prev) => ({
        ...prev,
        data: {
          isFavorite: !prev.isFavorite, //isFavorite 값을 반전
          favoriteCount: prev.isFavorite
            ? prev.favoriteCount - 1 //현재 좋아요 상품이라면 취소되면서 count down
            : prev.favoriteCount + 1,
        },
      }));
      return { prevProduct }; //실패할 경우 반환되는 값은 onError의 context로 전달 된다
    },
    onError: (error, {}, context) => {
      console.log(error);
      queryClient.setQueryData(["product"], context.prevProduct);
    },
    onSettled: (data, err) => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  const handleLikeButtonClick = () => {
    if (!user) return; //로그인이 되어 있지 않으면 뮤테이션을 실행하지 않게 리턴한다.
    likeMutation.mutate();
  };

  return (
    <>
      {/* 모달을 콘텐츠의 최상위에 위치하기 위함 */}
      <AlertModal
        onClose={closeAlertModal}
        isOpen={alert}
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
              {/* 작성자와 로그인된 사용자가 같을때 수정/삭제가 가능하다. */}
              {user?.id === ownerId && (
                <>
                  <Image
                    onClick={openArticleDropdown}
                    className={styles.product_kebab_image}
                    src={ic_kebab}
                    width={24}
                    height={24}
                    alt="상품 수정/삭제이미지"
                  />
                  {openDropdown && (
                    <DropdownData
                      handleUpdate={updateArticle}
                      handleDelete={handleDeleteArticle}
                    />
                  )}
                </>
              )}
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
                <span>{owner?.nickname}</span>
                <span className={styles.product_createdAt}>{date}</span>
              </div>
              <div>
                <button
                  onClick={handleLikeButtonClick}
                  className={styles.product_favorite_btn}
                >
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
              !content && styles.disabled
            }`}
            disabled={!content}
          >
            등록
          </button>
        </div>
        <div className={styles.products_comments_box}>
          <div className={styles.products_comments}>
            {commentsData?.map((item) => (
              <Comment
                user={user}
                key={item.id}
                item={item}
                openAlert={openAlertModal}
                setAlertMessage={setAlertMessage}
              />
            ))}
            {/* 게시글의 등록된 댓글이 없다면 아래의 내용을 렌더링한다. */}
            {commentsData.length < 1 && (
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
          <Link href={"/Items"}>
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
